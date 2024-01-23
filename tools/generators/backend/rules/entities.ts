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
import {
  addImports,
  EntityDef,
  entUsed,
  getEntityClass,
  readFile
} from '../util';
import * as generator from '../util/generator';
import { applyWithOverwrite } from './applyWIthOverwrite';

export function genEntities(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const file = join(options.snapshots, 'entities.json');

    if (!tree.exists(file)) {
      _context.logger.error('✘ Entities JSON file not found');
      return;
    }

    tree.delete(options.entities);

    const entities = readFile(tree, file);
    const rules: Array<Rule> = [];

    // 1. analyze the used entities and collect all the required ones
    for (const entity of entUsed) {
      const def = entities[entity];

      if (!def) {
        _context.logger.error(`✘ Missing entity for used '${entity}'`);
        continue;
      }

      for (const props of Object.values(def)) {
        // collects the entities used in the field types
        const type = getEntityClass(props['type']);
        if (type && !entUsed.includes(type)) {
          entUsed.push(type);
        }
      }
    }

    // 2. generate the files of the used entities
    for (const name of entUsed) {
      const entity: EntityDef = {
        imports: {},
        fields: {},
        required: []
      };

      for (const [field, props] of Object.entries(entities[name])) {
        entity.fields[field] = props['type'];
        if (props['required']) {
          entity.required.push(field);
        }
        addImports(props['type'], entity.imports, true);
      }

      rules.push(
        applyWithOverwrite(options.entities, url('./files/entity'), [
          template({
            ...strings,
            ...generator,
            ...entity,
            suffix: '',
            name
          })
        ])
      );
    }

    // 3. create the providers barrel
    rules.push(
      applyWithOverwrite(options.entities, url('./files/barrel'), [
        template({
          ...strings,
          exports: entUsed
        })
      ])
    );

    // 4. format the files
    rules.push(formatFiles());

    _context.logger.info('✓ Entities generated');

    return chain(rules)(tree, _context);
  };
}
