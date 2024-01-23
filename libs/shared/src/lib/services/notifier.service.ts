import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '@ocean/shared/dialogs';

export enum NotifierStatus {
  success = 'app-notification-success',
  info = 'app-notification-info',
  warning = 'app-notification-warning',
  error = 'app-notification-error'
}

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  duration = 4500;

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar) {}

  done(message: string) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Done',
        content: this.extractMessage(message)
      }
    });
  }

  confirm(message: string) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Error',
        content: this.extractMessage(message)
      }
    });
  }

  success(message: any, action = '', duration?: number | undefined): void {
    this.snack(message, action, duration, NotifierStatus.success);
  }

  info(message: any, action = '', duration?: number | undefined): void {
    this.snack(message, action, duration, NotifierStatus.info);
  }

  warning(message: any, action = '', duration?: number | undefined): void {
    this.snack(message, action, duration, NotifierStatus.warning);
  }

  error(message: any, action = '', duration?: number | undefined): void {
    this.snack(message, action, duration, NotifierStatus.error);
  }

  log(err: any, trace?: any) {
    // TODO any desired logging here
    console.error(err);
  }

  private snack(
    message: any,
    action = '',
    duration: number | undefined,
    status: NotifierStatus
  ): void {
    if (!message) {
      return;
    }

    this.snackbar.open(this.extractMessage(message), action, {
      duration: duration ? duration : this.duration,
      panelClass: [status]
    });
  }

  private extractMessage(content: any): string {
    function cleanMsg(msg: string) {
      // check for a complicated exception message
      const ex = msg.match(/: /g);
      if (ex && ex.length >= 2) {
        return msg.substr(msg.lastIndexOf(': ') + 2);
      }
      return msg;
    }

    if (typeof content !== 'string') {
      // ApiError response
      if (content.message) {
        return cleanMsg(content.message);
      }

      // Error list
      if (content.errors && content.errors.length) {
        return content.errors[0];
      }

      console.error('Could not extract the error from:', content);
      return 'An error ocurred.';
    }

    return cleanMsg(content);
  }
}
