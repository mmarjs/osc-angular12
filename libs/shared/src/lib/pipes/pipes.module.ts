import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AbsoluteValuePipe } from './absolute-value.pipe';
import { ApplyFnPipe } from './apply-fn.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { FormatTextPipe } from './format-text.pipe';
import { FormatTypePipe } from './format-type.pipe';
import { FileAsDataUrlPipe } from './file-as-data-url.pipe';
import { SumArrayValuesPipe } from './sum-array-values.pipe';
import { TaxPipe } from './tax.pipe';
import { TransformPipe } from './transform.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AbsoluteValuePipe,
    ApplyFnPipe,
    CapitalizePipe,
    FormatTextPipe,
    FormatTypePipe,
    FileAsDataUrlPipe,
    SumArrayValuesPipe,
    TaxPipe,
    TransformPipe,
  ],
  exports: [
    AbsoluteValuePipe,
    ApplyFnPipe,
    CapitalizePipe,
    FormatTextPipe,
    FormatTypePipe,
    FileAsDataUrlPipe,
    SumArrayValuesPipe,
    TaxPipe,
    TransformPipe,
  ]
})
export class SharedPipesModule { }
