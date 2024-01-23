import { strings } from '@angular-devkit/core';
import {
  chain,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { formatFiles } from '@nrwl/workspace/src/utils/rules/format-files';
import { join } from 'path';
import { Schema } from '../schema';
import { addImports, EntityDef, ProviderDef, readFile } from '../util';
import * as generator from '../util/generator';
import { applyWithOverwrite } from './applyWIthOverwrite';

export function genRequests(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const file = join(options.snapshots, 'providers.json');

    if (!tree.exists(file)) {
      _context.logger.error('✘ Providers JSON file not found');
      return;
    }

    const providers = readFile(tree, file);
    const rules: Array<Rule> = [];

    // process the requests of each provider
    for (const [name, props] of Object.entries<ProviderDef>(providers)) {
      if (props.requests.length) {
        const requests = [];

        for (const req of props.requests) {
          requests.push(req.prefix);

          // 1. create the request definition
          const request: EntityDef = {
            imports: {},
            fields: {},
            required: []
          };

          if (req.parameters) {
            req.parameters.forEach(parameter => {
              request.fields[parameter.name] = parameter.type;
              if (parameter.required) {
                request.required.push(parameter.name);
              }
              addImports(parameter.type, request.imports);
            });
          }

          // 2. create the request files
          rules.push(
            applyWithOverwrite(
              join(options.output, strings.camelize(name), 'requests'),
              url('./files/entity'),
              [
                template({
                  ...strings,
                  ...generator,
                  ...request,
                  suffix: 'Request',
                  name: req.prefix
                })
              ]
            )
          );
        }

        // 3. create the provider requests barrel
        rules.push(
          applyWithOverwrite(
            join(options.output, strings.camelize(name), 'requests'),
            url('./files/barrel'),
            [
              template({
                ...strings,
                exports: requests
              })
            ]
          )
        );
      }
    }

    // 4. format the files
    rules.push(formatFiles());

    _context.logger.info('✓ Requests generated');

    return chain(rules)(tree, _context);
  };
}
