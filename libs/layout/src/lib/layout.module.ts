import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasicLayoutModule } from './basic/basic.module';

@NgModule({
  imports: [CommonModule, BasicLayoutModule],
})
export class LayoutModule {}
