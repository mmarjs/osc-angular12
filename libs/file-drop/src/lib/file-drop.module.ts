/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileDropComponent } from './file-drop.component';
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { InternationalizationModule } from '@ocean/internationalization';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    NgxFileDropModule,
    PartialsModule,
    InternationalizationModule,
    MatListModule,
    MatButtonModule
  ],
  declarations: [
    FileDropComponent
  ],
  exports: [
    FileDropComponent
  ]
})
export class FileDropModule { }
