import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import axios from 'axios';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { Observable } from 'rxjs';
import { Schema } from '../schema';

export function fetchAPI(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const writer = createWriteStream(resolve(options.input));

    return Observable.create(observer => {
      axios
        .request({
          url: options.url,
          method: 'GET',
          responseType: 'stream'
        })
        .then(response => {
          response.data.pipe(writer);

          writer.on('finish', () => {
            _context.logger.info('✓ API fetched successfully');
            observer.next(tree);
            observer.complete();
          });

          writer.on('error', err => {
            _context.logger.error('✘ Error fetching the API');
            observer.error(err);
          });
        })
        .catch(err => {
          observer.error(err);
        });
    });
  };
}
