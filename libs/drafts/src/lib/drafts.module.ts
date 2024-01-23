/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts/drafts.component';
import { RouterModule } from '@angular/router';
import { routes } from './drafts.routing';
import { SharedModule } from '@ocean/shared';
import { MaterialModule } from '@ocean/material';
import { MatTableModule } from '@angular/material/table';
import { LayoutComponentsModule } from '@ocean/layout';
import { MatButtonModule } from '@angular/material/button';
import { IconsModule } from '@ocean/icons';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    MatTableModule,
    LayoutComponentsModule,
    MatButtonModule,
    IconsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    DraftsComponent
  ],
})
export class DraftsModule { }
