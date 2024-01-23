import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutoCompleters } from './autocompleters/barrel';
import { FormFields } from './fields/barrel';
import { FormFilters } from './filters/barrel';
import { AppFormsImports } from './forms.imports';
import { FormControlUpdateOnSubmitComponent } from './form-control-update-on-submit/form-control-update-on-submit.component';
import { CountryComponent } from './autocompleters/country/country.component';
import { CheckboxComponent } from './fields/checkbox/checkbox.component';

@NgModule({
  imports: [CommonModule, ...AppFormsImports],
  declarations: [
    ...AutoCompleters,
    ...FormFields,
    ...FormFilters,
    FormControlUpdateOnSubmitComponent,
    CountryComponent,
    CheckboxComponent,
  ],
  exports: [
    ...AutoCompleters,
    ...FormFields,
    ...FormFilters,
    FormControlUpdateOnSubmitComponent,
    CountryComponent,
    CheckboxComponent,
  ],
})
export class SharedFormsModule {}
