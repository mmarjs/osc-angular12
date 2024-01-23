import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { Schema } from '../schema';
import {
  cleanSwaggerDef,
  DefinitionDef,
  entList,
  readFile,
  sortObject,
  typeFromSwagger
} from '../util';

export function genDefinitions(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const file = join(options.snapshots, 'definitions.json');

    if (!tree.exists(file)) {
      _context.logger.error('✘ Entities JSON file not found');
      return;
    }

    const definitions = readFile(tree, file);
    const entities = {};

    // save the entities into the memory cache
    for (const [name, ent] of Object.entries(definitions)) {
      const entity: DefinitionDef = {};
      for (const [field, def] of Object.entries(ent['properties'])) {
        entity[field] = {
          type: typeFromSwagger(def)
        };
        // fields
        // if (def.format) {
        //   entity[field].comment = def.format;
        // }
        if (def['enum']) {
          entity[field].enum = def['enum'];
        }
        if (ent['required'] && ent['required'].includes(field)) {
          entity[field]['required'] = true;
        }
      }
      const type = cleanSwaggerDef(name);
      entList.push(type);
      entities[type] = entity;
    }

    tree.overwrite(
      join(options.snapshots, 'entities.json'),
      JSON.stringify(sortObject(entities), null, 2)
    );

    _context.logger.info('✓ Definitions processed successfully');

    return tree;
  };
}
