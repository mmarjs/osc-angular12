import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedFormsModule } from '@ocean/shared';

import { FormComponents } from './form.barrel';
import { AppFormsImports } from './forms.imports';
import { IconsModule } from '@ocean/icons';

@NgModule({
  imports: [CommonModule, SharedFormsModule, ...AppFormsImports, IconsModule],
  declarations: FormComponents,
  exports: FormComponents,
})
export class AppFormsModule {}
