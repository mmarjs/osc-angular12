import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-page-forgot-password',
  template: ''
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.dialog
        .open(ForgotPasswordDialogComponent)
        .afterClosed()
        .subscribe(() => {
          this.router.navigate([{ outlets: { open: null } }]);
        });
    }, 10);
  }
}
