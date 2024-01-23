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
import { get } from 'lodash-es';
import { join } from 'path';
import { Schema } from '../schema';
import {
  addImports,
  Dictionary,
  isRequired,
  MethodDef,
  ProviderDef,
  readFile,
  RoutesDefs,
  typeFromSwagger
} from '../util';
import * as generator from '../util/generator';
import { applyWithOverwrite } from './applyWIthOverwrite';

export function genProviders(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const file = join(options.snapshots, 'routes.json');

    if (!tree.exists(file)) {
      _context.logger.error('✘ Routes JSON file not found');
      return;
    }

    tree.delete(options.output);

    const providers: Dictionary<ProviderDef> = {};
    const routes = readFile(tree, file);
    const rules: Array<Rule> = [];

    // process the required info for each provider
    for (const [name, methods] of Object.entries<RoutesDefs>(routes)) {
      // 1. create the provider definition
      const provider: ProviderDef = {
        imports: {},
        methods: {},
        requests: [],
        responses: []
      };

      for (const [method, props] of Object.entries(methods)) {
        const prefix = `${name}${strings.classify(method)}`;

        const def: MethodDef = {
          docs: `Responses: ${Object.keys(props.responses).join(', ')}`,
          api: props.api,
          prefix,
          request: {
            exists: !!props.parameters,
            required: isRequired(props.parameters)
          }
        };

        // response
        if (get(props, 'responses.200.schema')) {
          def.response = typeFromSwagger(get(props, 'responses.200.schema'));
          addImports(def.response, provider.imports);
        }

        provider.methods[method] = def;

        // request interface
        if (props.parameters) {
          provider.requests.push({
            prefix,
            parameters: props.parameters.map(param => ({
              name: param.name,
              type: typeFromSwagger(param),
              in: param.in,
              required: !!param.required
            }))
          });
        }
      }
      providers[name] = provider;

      // 2. create the provider files
      rules.push(
        applyWithOverwrite(options.output, url('./files/provider'), [
          template({
            ...strings,
            ...generator,
            ...provider,
            name
          })
        ])
      );
    }

    // 3. create the providers barrel
    rules.push(
      applyWithOverwrite(options.output, url('./files/barrel'), [
        template({
          ...strings,
          exports: Object.keys(routes)
        })
      ])
    );

    // 4. format the files
    rules.push(formatFiles());

    tree.overwrite(
      join(options.snapshots, 'providers.json'),
      JSON.stringify(providers, null, 2)
    );

    _context.logger.info('✓ Providers generated');

    return chain(rules)(tree, _context);
  };
}
