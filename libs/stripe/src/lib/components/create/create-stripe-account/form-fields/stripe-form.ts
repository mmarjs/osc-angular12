import { FormGroup, Validators } from '@angular/forms';
import { StripeForm } from '@ocean/api/shared';
import {
  FormFieldGroupTypes,
  FormFieldListModel,
  FormFieldModel,
} from '@ocean/libs/form-builder';
import { CountryISO } from 'ngx-intl-tel-input';
import { LocalizationService } from '@ocean/internationalization';
import {
  supportedStripeCountries,
  supportedStripeISO2,
} from '@ocean/api/shared/entities/stripe/stripe-countries';
import { getValidBirthDateInterval } from '@ocean/shared/utils/getValidBirthDateInterval';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import {
  countryHasProvinces,
  countryHasStates,
  getCountryAdministrativeUnits,
  ISO2,
} from '@ocean/shared/utils/iso-mapper';
import { textValidator } from '@ocean/shared/utils/text-validator';
import { addressValidator } from '@ocean/shared/utils/address-validator';
import { conditionalValidator } from '@ocean/shared/utils/conditional-validator';

export const TAX_ID_MASK = [
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
];

export const TAX_ID_PATTERN = /\d{3} \d{3} \d{3}/;

export const SSN_MASK = [/\d/, /\d/, /\d/, /\d/];
export const SSN_PATTERN = /\d{4}/;

export const createFields = (
  localizationService: LocalizationService
): FormFieldListModel<StripeForm, FormFieldModel> => {
  const { minDate, maxDate } = getValidBirthDateInterval();
  return {
    firstName: {
      order: 0,
      label: 'FORMS.LABELS.FIRST_NAME',
      placeholder: 'FORMS.PLACEHOLDERS.USER_NAME',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required, textValidator],
    },
    lastName: {
      order: 1,
      label: 'FORMS.LABELS.LAST_NAME',
      placeholder: 'FORMS.PLACEHOLDERS.USER_SURNAME',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required, textValidator],
    },
    email: {
      order: 2,
      defaultValue: '',
      label: 'FORMS.LABELS.EMAIL_ADDRESS',
      placeholder: 'FORMS.PLACEHOLDERS.EMAIL',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required, Validators.email],
    },
    businessUrl: {
      order: 3,
      defaultValue: '',
      label: 'FORMS.LABELS.BUSINESS_URL',
      placeholder: 'FORMS.PLACEHOLDERS.BUSINESS_URL',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required],
    },
    country: {
      order: 4,
      label: 'FORMS.LABELS.COUNTRY',
      placeholder: '',
      cssClassName: 'full',
      defaultValue: stringToCountryField(CountryISO.UnitedStates),
      type: FormFieldGroupTypes.country,
      countries: supportedStripeCountries,
      onCountryChange: (country, form) => {
        form?.get('phone')?.setValue({
          iso2: country.alpha2Code.toLowerCase(),
        });
      },
      validators: [Validators.required],
    },
    phone: {
      order: 5,
      label: 'FORMS.LABELS.PHONE',
      type: FormFieldGroupTypes.phone,
      cssClassName: 'full',
      countries: supportedStripeISO2.map((iso) =>
        iso.toLowerCase()
      ) as Lowercase<ISO2>[],
      selectFirstCountry: false,
      validators: [Validators.required],
      interceptSelectedCountryISO: (form) => {
        return (
          form?.get('country')?.value?.alpha2Code?.toLowerCase() ??
          CountryISO.UnitedStates
        );
      },
      onCountryChange: (country, form) => {
        form?.get('country')?.setValue(stringToCountryField(country?.iso2));
      },
    },
    taxIdOrSSN: {
      order: 6,
      label: 'FORMS.LABELS.SSN_OR_TAXID',
      placeholder: 'FORMS.PLACEHOLDERS.SSN_OR_TAXID',
      defaultValue: false,
      type: FormFieldGroupTypes.checkbox,
    },
    taxId: {
      order: 6,
      label: 'FORMS.LABELS.TAX_ID',
      placeholder: 'FORMS.PLACEHOLDERS.NUMBER',
      cssClassName: 'full',
      type: FormFieldGroupTypes.text,
      shouldShow: (form: FormGroup) => form.get('taxIdOrSSN')?.value === false,
      mask: TAX_ID_MASK,
      validators: [Validators.required, Validators.pattern(TAX_ID_PATTERN)],
    },
    ssnLast4: {
      order: 7,
      label: 'FORMS.LABELS.SSN_LAST4',
      placeholder: 'FORMS.PLACEHOLDERS.NUMBER',
      cssClassName: 'full',
      type: FormFieldGroupTypes.text,
      shouldShow: (form: FormGroup) => form.get('taxIdOrSSN')?.value === true,
      mask: SSN_MASK,
      validators: [Validators.required, Validators.pattern(SSN_PATTERN)],
    },
    gender: {
      order: 8,
      label: 'FORMS.LABELS.GENDER',
      placeholder: '',
      cssClassName: 'full',
      type: FormFieldGroupTypes.select,
      value: '',
      options: [
        localizationService.translate('FORMS.SELECT.GENDER.MALE'),
        localizationService.translate('FORMS.SELECT.GENDER.FEMALE'),
      ],
      onValueSelected: (value) => value,
      getOptionTitle: (value) => value,
      getOptionValue: (value) => value?.toLowerCase(),
      validators: [Validators.required],
    },
    dob: {
      order: 9,
      minDate,
      maxDate,
      label: 'FORMS.LABELS.DATE_OF_BIRTH',
      cssClassName: 'full',
      type: FormFieldGroupTypes.date,
      validators: [Validators.required],
    },
    state: {
      order: 10,
      label: 'FORMS.LABELS.STATE',
      placeholder: 'FORMS.PLACEHOLDERS.STATE',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required, textValidator],
      shouldShow: (form: FormGroup) =>
        countryHasStates(form.get('country')?.value?.alpha2Code),
    },
    province: {
      order: 11,
      label: 'FORMS.LABELS.PROVINCE',
      placeholder: 'FORMS.PLACEHOLDERS.PROVINCE',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required, textValidator],
      shouldShow: (form: FormGroup) =>
        countryHasProvinces(form.get('country')?.value?.alpha2Code),
    },
    region: {
      order: 12,
      label: 'FORMS.LABELS.REGION',
      placeholder: 'FORMS.PLACEHOLDERS.REGION',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required, textValidator],
      shouldShow: (form: FormGroup) => {
        const { states, provinces } = getCountryAdministrativeUnits(
          form.get('country')?.value?.alpha2Code
        );
        return !(states || provinces);
      },
    },
    city: {
      order: 13,
      label: 'FORMS.LABELS.CITY',
      placeholder: 'FORMS.PLACEHOLDERS.CITY',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required, textValidator],
    },
    line1: {
      order: 14,
      label: 'FORMS.LABELS.ADDRESS',
      placeholder: 'FORMS.PLACEHOLDERS.ADDRESS',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required, addressValidator(false)],
    },
    line2: {
      order: 15,
      label: 'FORMS.LABELS.ADDRESS2',
      placeholder: 'FORMS.PLACEHOLDERS.ADDRESS2',
      cssClassName: 'half',
      type: FormFieldGroupTypes.text,
      validators: [
        conditionalValidator(
          addressValidator(false),
          (form) => form?.get('line2')?.value?.length > 0
        ),
      ],
    },
    postalCode: {
      order: 16,
      label: 'FORMS.LABELS.ZIP_CODE',
      placeholder: 'FORMS.PLACEHOLDERS.ZIP_CODE',
      cssClassName: 'full',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required],
    },
  };
};
