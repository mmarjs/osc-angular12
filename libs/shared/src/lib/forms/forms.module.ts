import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutoCompleters } from './autocompleters/barrel';
import { FormFields } from './fields/barrel';
import { FormFilters } from './filters/barrel';
import { AppFormsImports } from './forms.imports';
import { FormControlUpdateOnSubmitComponent } from './form-control-update-on-submit/form-control-update-on-submit.component';
import { CountryComponent } from './autocompleters/country/country.component';
import { CheckboxComponent } from './fields/checkbox/checkbox.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AppTipDirective } from './directives/app-tip/app-tip.directive';
import { AppTipComponent } from './directives/app-tip/app-tip.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, ...AppFormsImports, TextMaskModule, MatCardModule],
  declarations: [
    ...AutoCompleters,
    ...FormFields,
    ...FormFilters,
    FormControlUpdateOnSubmitComponent,
    CountryComponent,
    CheckboxComponent,
    AppTipDirective,
    AppTipComponent,
  ],
  exports: [
    ...AutoCompleters,
    ...FormFields,
    ...FormFilters,
    FormControlUpdateOnSubmitComponent,
    CountryComponent,
    CheckboxComponent,
    AppTipDirective,
    AppTipComponent,
  ],
})
export class SharedFormsModule {}
