import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {
  /**
   * Format special texts in the app
   */
  transform(text: string): string {
    if (!text) {
      return '';
    }

    return text
      .replace(/[\_\-]/g, ' ')
      .replace(/\b[^\s]+/g, f => f[0].toLocaleUpperCase() + f.substr(1));
  }
}
