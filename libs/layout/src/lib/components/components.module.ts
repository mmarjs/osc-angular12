import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutComponents } from './components.barrel';
import { LayoutComponentsImports } from './components.imports';

@NgModule({
  imports: [CommonModule, ...LayoutComponentsImports],
  declarations: LayoutComponents,
  exports: LayoutComponents
})
export class LayoutComponentsModule {}
