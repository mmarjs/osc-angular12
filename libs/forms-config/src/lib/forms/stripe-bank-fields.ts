import {
  CountryFieldModel,
  FormFieldGroupTypes,
  FormFieldListModel,
  FormFieldModel,
  SelectFieldModel,
  TextFieldModel,
} from '@ocean/libs/form-builder';
import { Validators } from '@angular/forms';
import {
  currencyISO3,
  getCurrencyByCountry,
  getCurrencyList,
} from '@ocean/shared/utils/get-currency-by-iso';
import { ISO } from '@ocean/shared/utils/iso-mapper';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { CountryISO } from 'ngx-intl-tel-input';
import { supportedStripeCountries } from '@ocean/api/shared/entities/stripe/stripe-countries';
import { textValidator } from '@ocean/shared/utils/text-validator';

export interface StripeBankFormFields {
  bankName: TextFieldModel;
  accountHolderName: TextFieldModel;
  accountNumber: TextFieldModel;
  routingNumber: TextFieldModel;
  country: CountryFieldModel;
  currency: SelectFieldModel;
}

export const stripeBankFields: FormFieldListModel<
  StripeBankFormFields,
  FormFieldModel
> = {
  bankName: {
    order: 0,
    label: 'FORMS.LABELS.BANK_NAME',
    placeholder: 'FORMS.PLACEHOLDERS.BANK_NAME',
    type: FormFieldGroupTypes.text,
    cssClassName: 'full',
    validators: [Validators.required, textValidator],
  },
  accountHolderName: {
    order: 1,
    label: 'FORMS.LABELS.ACCOUNT_HOLDER_NAME',
    placeholder: 'FORMS.PLACEHOLDERS.ACCOUNT_HOLDER_NAME',
    type: FormFieldGroupTypes.text,
    cssClassName: 'full',
    validators: [Validators.required, textValidator],
  },
  accountNumber: {
    order: 2,
    label: 'FORMS.LABELS.ACCOUNT_NUMBER',
    placeholder: 'FORMS.PLACEHOLDERS.ACCOUNT_NUMBER',
    type: FormFieldGroupTypes.text,
    isCurrency: false,
    cssClassName: 'full',
    validators: [Validators.required, Validators.pattern(/^[0-9]{5,}$/)],
  },
  country: {
    order: 3,
    label: 'FORMS.LABELS.COUNTRY',
    defaultValue: stringToCountryField(CountryISO.UnitedStates),
    type: FormFieldGroupTypes.country,
    countries: supportedStripeCountries,
    onCountryChange: (value, form) => {
      form
        ?.get('currency')
        ?.setValue(getCurrencyByCountry(value.alpha2Code as ISO));
    },
    cssClassName: 'full',
    validators: [Validators.required],
  },
  currency: {
    order: 4,
    label: 'FORMS.LABELS.CURRENCY',
    cssClassName: 'full',
    type: FormFieldGroupTypes.select,
    defaultValue: currencyISO3.USA,
    value: currencyISO3.USA,
    options: getCurrencyList(),
    onValueSelected: (value) => value,
    getOptionTitle: (value) => value,
    getOptionValue: (value) => value,
    validators: [Validators.required],
  },
  routingNumber: {
    order: 5,
    label: 'FORMS.LABELS.ROUTING_NUMBER',
    placeholder: 'FORMS.PLACEHOLDERS.ROUTING_NUMBER',
    type: FormFieldGroupTypes.text,
    cssClassName: 'full',
    validators: [Validators.required, Validators.pattern(/^[0-9]{9}$/)],
  },
};
