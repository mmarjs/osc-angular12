import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ROUTES } from '@ocean/shared';
import { LoginDialogComponent } from '../../pages.barrel';

@Component({
  selector: 'app-page-forgot-password-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {
  @HostBinding('class') cssClass = 'app-dialog';

  routes = ROUTES;

  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      email: ['']
    });
  }

  onSubmit() {}
}
