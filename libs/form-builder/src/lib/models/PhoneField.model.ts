import { FormGroup } from '@angular/forms';
import { Country } from 'ngx-intl-tel-input/lib/model/country.model';
import { BaseFieldModel } from './BaseField.model';
import { FormFieldGroupTypes } from './FormFieldGroupTypes';
import { CountryISO } from 'ngx-intl-tel-input';
import { ISO2 } from '@ocean/shared/utils/iso-mapper';

export interface PhoneFieldModel extends BaseFieldModel<string> {
  type: FormFieldGroupTypes.phone;
  interceptSelectedCountryISO?: (form: FormGroup) => CountryISO;
  selectFirstCountry?: boolean;
  countries?: Lowercase<ISO2>[];
  onCountryChange?: (country: Country, form: FormGroup) => void;
}
