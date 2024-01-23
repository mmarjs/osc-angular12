import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import {
  fetchAPI,
  genDefinitions,
  genEntities,
  genProviders,
  genRequests,
  parseAPI,
  setupOptions
} from './rules';
import { Schema } from './schema';

// tslint:disable-next-line:no-default-export
export default function(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // TODO avoid creation/overwrite problems with MergeStrategy
    // https://github.com/angular/angular-cli/issues/11337
    return chain([
      setupOptions(options),
      options.fetch ? fetchAPI(options) : noop(),
      parseAPI(options),
      genDefinitions(options),
      genProviders(options),
      genRequests(options),
      genEntities(options)
    ]);
  };
}
