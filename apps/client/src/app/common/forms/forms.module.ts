import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedFormsModule } from '@ocean/shared';

import { FormComponents } from './form.barrel';
import { AppFormsImports } from './forms.imports';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    SharedFormsModule,
    ...AppFormsImports,
    MatIconModule
  ],
  declarations: FormComponents,
  exports: FormComponents
})
export class AppFormsModule {
}
