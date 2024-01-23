import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-page-login',
  template: ''
})
export class LoginComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.dialog
        .open(LoginDialogComponent)
        .afterClosed()
        .subscribe(() => {
          this.router.navigate([{ outlets: { open: null } }]);
        });
    }, 10);
  }
}
