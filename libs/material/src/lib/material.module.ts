import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDataSourceModule } from './datasource';

@NgModule({
  imports: [CommonModule, MatDataSourceModule],
  exports: [MatDataSourceModule]
})
export class MaterialModule {}
