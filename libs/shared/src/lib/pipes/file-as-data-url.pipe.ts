import { Pipe, PipeTransform } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { FileType, readFileAsync } from '../utils/read-file-async';

export const readFilesAsDataURL = async (files: FileType[]) => {
  try {
    return (await Promise.all(files.map(readFileAsync))).filter(
      (file) => typeof file === 'object' && file !== null
    );
  } catch (error) {
    console.warn(error);
  }
};

@Pipe({
  name: 'fileAsDataUrl',
})
export class FileAsDataUrlPipe implements PipeTransform {
  transform(file: FileType | FileType[]): Observable<unknown | unknown[]> {
    if (!file) {
      return of([]);
    }

    return Array.isArray(file)
      ? from(readFilesAsDataURL(file))
      : from(readFileAsync(file));
  }
}
