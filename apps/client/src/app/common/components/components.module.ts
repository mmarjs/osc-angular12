import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '@ocean/carousel';
import { SharedDirectivesModule, SharedFormsModule, SharedPipesModule } from '@ocean/shared';
import { AppComponents } from './components.barrel';
import { AppComponentsImports } from './components.imports';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedDirectivesModule,
    ...AppComponentsImports,
    FormsModule,
    SharedFormsModule,
    MatMenuModule,
    SharedPipesModule,
    CarouselModule,
  ],
  declarations: AppComponents,
  exports: AppComponents
})
export class AppComponentsModule { }
