import { BaseFieldModel } from './BaseField.model';
import { FormFieldGroupTypes } from './FormFieldGroupTypes';
import { Country } from '@angular-material-extensions/select-country';
import { FormGroup } from '@angular/forms';

export interface CountryFieldModel extends BaseFieldModel<Country> {
  type: FormFieldGroupTypes.country;
  countries?: Country[];
  onCountryChange?: (country: Country, form?: FormGroup) => void;
}
