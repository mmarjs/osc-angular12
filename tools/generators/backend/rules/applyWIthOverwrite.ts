import {
  apply,
  forEach,
  mergeWith,
  Rule,
  SchematicContext,
  Source,
  Tree
} from '@angular-devkit/schematics';
import { join } from 'path';

export function applyWithOverwrite(
  movePath: string,
  source: Source,
  rules: Rule[]
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const rule = mergeWith(
      apply(source, [
        ...rules,
        forEach(fileEntry => {
          const destPath = join(movePath, fileEntry.path);
          if (tree.exists(destPath)) {
            tree.overwrite(destPath, fileEntry.content);
          } else {
            tree.create(destPath, fileEntry.content);
          }
          return null;
        })
        // move(movePath)
      ])
    );

    return rule(tree, _context);
  };
}
