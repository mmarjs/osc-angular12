import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Image } from '@ocean/carousel';

@Pipe({
  name: 'fileAsDataUrl'
})
export class FileAsDataUrlPipe implements PipeTransform {

  constructor() { }

  transform(file: File[] | File, ...args: unknown[]): Observable<Image[]> | Observable<string | ArrayBuffer> | [] {
    if (file) {
      if (Array.isArray(file)) {
        return this.readFilesAsDataURL(file);
      }
      return this.readFileAsDataURL(file);
    }

    return [];
  }

  private readFilesAsDataURL(files) {
    return new Observable((observer: Observer<Image[]>) => {
      const paths = [];
      files.forEach(({ file }) => {
        var ext = file.name.split('.').pop()
        const fileReader = new FileReader();
        fileReader.onload = () => {
          paths.push({ path: fileReader.result, fileTitle: file.name, fileURL: fileReader.result, format: ext, originalFilename: file.name });
          observer.next(paths);
          observer.complete();
        };
        fileReader.readAsDataURL(file);
      });
    });
  }

  private readFileAsDataURL(file) {
    return new Observable((observer: Observer<string | ArrayBuffer>) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        observer.next(fileReader.result);
        observer.complete();
      };  
      fileReader.readAsDataURL(file);
    });
  }
}
