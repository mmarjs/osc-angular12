import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserFacade } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-page-login-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') cssClass = 'app-dialog';

  routes = ROUTES;

  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private user: UserFacade
  ) {
    this.user.loginSuccess$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.onLoginSuccess());
  }

  ngOnInit() {
    this.form = this.builder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnDestroy() {}

  onSubmit() {}

  onLoginSuccess() {
    this.dialogRef.close();
  }
}
