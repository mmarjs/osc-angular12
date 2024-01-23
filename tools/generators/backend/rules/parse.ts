import { strings } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { intersection } from 'lodash-es';
import { join } from 'path';
import { Schema } from '../schema';
import {
  cleanSwaggerDef,
  modNames,
  readFile,
  sortObject,
  typeFromSwagger,
  typesMap
} from '../util';

export function parseAPI(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    if (!tree.exists(options.input)) {
      _context.logger.error('✘ Input JSON file not found');
      return;
    }

    const api = readFile(tree, options.input);

    // collectors
    const snapshot = {};
    const routes = {};
    const entities = {};

    // collect the controllers
    for (const mod of api.tags) {
      let name = mod.name.split('-');
      if (name.pop() === 'controller') {
        name = name.join('-');
        // discard non-desired controllers
        if (['audit', 'basic-error'].includes(name)) {
          continue;
        }
        modNames[mod.name] = strings.classify(name);
      }
    }

    // collect the endpoints
    for (const [url, entrypoints] of Object.entries(api.paths)) {
      for (const [method, entrypoint] of Object.entries(entrypoints)) {
        // check if we're gathering this controller
        const modTag = intersection(Object.keys(modNames), entrypoint.tags);
        if (!modTag.length) {
          continue;
        }

        const modName = modNames[modTag[0]];
        const fnName = entrypoint.operationId.match(/^(.*)Using/)[1];

        if (!routes[modName]) {
          snapshot[modName] = {};
          routes[modName] = {};
        }

        snapshot[modName][fnName] = `${method.toUpperCase()} ${url}`;
        routes[modName][fnName] = {
          // id: entrypoint.operationId,
          api: {
            method: method.toUpperCase(),
            url
          },
          consumes: entrypoint.consumes[0],
          produces: entrypoint.produces[0],
          parameters: entrypoint.parameters,
          responses: entrypoint.responses,
          deprecated: entrypoint.deprecated
        };
      }
    }

    // collect the entities and types
    for (const [name, def] of Object.entries(api.definitions)) {
      if (def['properties']) {
        entities[name] = def;
      } else {
        let type;
        // special exceptions
        if (name.includes('«')) {
          type = cleanSwaggerDef(name);
        } else if (def['type']) {
          type = typeFromSwagger(def);
        }
        if (type) {
          typesMap[name] = type;
        } else {
          _context.logger.warn(`- Unprocessed entity '${name}'`);
        }
      }
    }

    // save the collections
    tree.overwrite(
      join(options.snapshots, 'endpoints.json'),
      JSON.stringify(snapshot, null, 2)
    );

    tree.overwrite(
      join(options.snapshots, 'routes.json'),
      JSON.stringify(routes, null, 2)
    );

    tree.overwrite(
      join(options.snapshots, 'definitions.json'),
      JSON.stringify(sortObject(entities), null, 2)
    );

    _context.logger.info('✓ Swagger API parsed');

    return tree;
  };
}
