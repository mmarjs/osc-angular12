import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getProject } from '@schematics/angular/utility/project';
import { join } from 'path';
import { Schema } from '../schema';

export function setupOptions(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);

    const project = getProject(workspace, 'api');

    options.output = join(
      project.root,
      'src/lib/' + (options.output || 'services')
    );
    options.entities = join(project.root, 'src/lib/shared/entities');
    options.snapshots = 'tools/schematics/backend/snapshots';
    options.input = options.input || join(options.snapshots, 'swagger.json');

    return tree;
  };
}
