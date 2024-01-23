import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './components/form-builder.component';
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { IconsModule } from '@ocean/icons';
import { SharedFormsModule } from '@ocean/shared/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxIntlTelInputModule,
    MatSelectCountryModule,
    PartialsModule,
    IconsModule,
    MatSelectModule,
    SharedFormsModule
  ],
  declarations: [FormBuilderComponent],
  exports: [FormBuilderComponent]
})
export class LibsFormBuilderModule {
}
