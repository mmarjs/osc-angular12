import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedDialogsModule } from './dialogs/dialogs.module';
import { SharedDirectivesModule } from './directives/directives.module';
import { SharedFormsModule } from './forms/forms.module';
import { PartialsModule } from './partials/partials.module';
import { SharedPipesModule } from './pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    SharedDialogsModule,
    SharedDirectivesModule,
    SharedFormsModule,
    SharedPipesModule,
    PartialsModule,
    TranslateModule,
  ],
  exports: [
    SharedDialogsModule,
    SharedDirectivesModule,
    SharedFormsModule,
    SharedPipesModule,
    PartialsModule,
    TranslateModule
  ]
})
export class SharedModule { }
