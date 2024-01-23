import { Injectable } from '@angular/core';
import { NotifierService } from '@ocean/shared/services';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private notifier: NotifierService) { }

  errorTitle: string;
  errorContent: string;

  public handleError(err: any, duration = 3000): Observable<void> {
    this.getErrorDetails(err);
    this.notifier.error(this.errorContent, this.errorTitle, duration);
    return EMPTY;
  }

  private getErrorDetails(err) {
    const message: string =
      err.error && err.error.message ? err.error.message : err.message;
    const detail: string =
      err.error && err.error.detail ? err.error.detail : err.detail;

    if (message) {
      const keywords = message.split(' ', 3).join(' ');
      switch (keywords) {
        case 'duplicate key value':
          this.handleDuplicateKeyError(detail);
          this.errorTitle = 'Record already exists';
          break;
        case 'Http failure response':
          this.errorTitle = 'Lost connection with the server';
          this.errorContent = 'Please try again later';
          break;
        default:
          this.errorTitle = 'Error';
          this.errorContent = message;
      }
    }
  }

  private handleDuplicateKeyError(detail) {
    if (detail) {
      const firstIndexKey = detail.indexOf('(') + 1;
      const lastIndexKey = detail.indexOf(')');
      const firstIndexValue = detail.lastIndexOf('(') + 1;
      const lastIndexValue = detail.lastIndexOf(')');

      const key = detail.substring(firstIndexKey, lastIndexKey);
      const value = detail.substring(firstIndexValue, lastIndexValue);

      this.errorContent = `The ${key}: ${value} already exists. Please use another one`;
    }
  }
}
