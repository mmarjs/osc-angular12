import { Pipe, PipeTransform } from '@angular/core';
import { MediaResponse, MediaTransform, transformMedia } from '@ocean/api/client';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {
  transform(value: MediaResponse, name: MediaTransform): any {
    return transformMedia(value, name);
  }
}
