import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { StripeForm } from '@ocean/api/shared';
import { FormFieldGroupTypes, FormFieldListModel, FormFieldModel } from '@ocean/libs/form-builder';
import { CountryISO } from 'ngx-intl-tel-input';
import { LocalizationService } from '@ocean/internationalization';
import { supportedStripeCountries, supportedStripeISO2 } from '@ocean/api/shared/entities/stripe/stripe-countries';
import { getValidBirthDateInterval } from '@ocean/shared/utils/getValidBirthDateInterval';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { countryHasProvinces, countryHasStates, getCountryAdministrativeUnits, ISO2 } from '@ocean/shared/utils/iso-mapper';
import { nameValidator } from '@ocean/shared/utils/name-validator';
import { textValidator } from '@ocean/shared/utils/text-validator';
import { addressValidator } from '@ocean/shared/utils/address-validator';
import { webUrlValidator } from '@ocean/shared/utils/web-url-validator';

export const createFields =
  (localizationService: LocalizationService, lastSSN4Validators: ValidatorFn[]): FormFieldListModel<StripeForm, FormFieldModel> => {
    const {minDate, maxDate} = getValidBirthDateInterval();
    return {
      firstName: {
        order: 0,
        label: 'FORMS.LABELS.FIRST_NAME',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          nameValidator,
        ]
      },
      lastName: {
        order: 1,
        label: 'FORMS.LABELS.LAST_NAME',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          nameValidator,
        ]
      },
      email: {
        order: 2,
        defaultValue: '',
        label: 'FORMS.LABELS.EMAIL_ADDRESS',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          Validators.email,
        ]
      },
      businessUrl: {
        order: 3,
        defaultValue: '',
        label: 'FORMS.LABELS.BUSINESS_URL',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          webUrlValidator,
        ]
      },
      country: {
        order: 4,
        label: 'FORMS.LABELS.COUNTRY',
        placeholder: '',
        defaultValue: stringToCountryField(CountryISO.UnitedStates),
        type: FormFieldGroupTypes.country,
        countries: supportedStripeCountries,
        onCountryChange: (country, form) => {
          form?.get('phone')?.setValue({
            iso2: country.alpha2Code.toLowerCase(),
          });
        },
        validators: [
          Validators.required,
        ],
      },
      phone: {
        order: 5,
        label: 'FORMS.LABELS.PHONE',
        type: FormFieldGroupTypes.phone,
        countries: supportedStripeISO2.map(iso => iso.toLowerCase()) as Lowercase<ISO2>[],
        selectFirstCountry: false,
        validators: [
          Validators.required,
        ],
        interceptSelectedCountryISO: form => {
          return form?.get('country')?.value?.alpha2Code?.toLowerCase() ?? CountryISO.UnitedStates;
        },
        onCountryChange: (country, form) => {
          form?.get('country')?.setValue(stringToCountryField(country?.iso2));
        }
      },
      taxId: {
        order: 6,
        label: 'FORMS.LABELS.TAX_ID',
        placeholder: '',
        isCurrency: false,
        hideArrowsForNumber: true,
        type: FormFieldGroupTypes.number,
        validators: [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(11)
        ],
      },
      ssnLast4: {
        order: 7,
        label: 'FORMS.LABELS.SSN_LAST4',
        placeholder: '',
        type: FormFieldGroupTypes.number,
        isCurrency: false,
        hideArrowsForNumber: true,
        validators: lastSSN4Validators,
        shouldShow: (form: FormGroup) => form.get('country')?.value?.alpha2Code?.toLowerCase() === CountryISO.UnitedStates,
      },
      gender: {
        order: 8,
        label: 'FORMS.LABELS.GENDER',
        placeholder: '',
        type: FormFieldGroupTypes.select,
        value: '',
        options: [
          localizationService.translate('FORMS.SELECT.GENDER.MALE'),
          localizationService.translate('FORMS.SELECT.GENDER.FEMALE'),
        ],
        onValueSelected: value => value,
        getOptionTitle: value => value,
        getOptionValue: value => value,
        validators: [
          Validators.required,
        ],
      },
      dob: {
        order: 9,
        minDate,
        maxDate,
        label: 'FORMS.LABELS.DATE_OF_BIRTH',
        type: FormFieldGroupTypes.date,
        validators: [Validators.required]
      },
      state: {
        order: 10,
        label: 'FORMS.LABELS.STATE',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          textValidator,
        ],
        shouldShow: (form: FormGroup) => countryHasStates(form.get('country')?.value?.alpha2Code),
      },
      province: {
        order: 11,
        label: 'FORMS.LABELS.PROVINCE',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          textValidator,
        ],
        shouldShow: (form: FormGroup) => countryHasProvinces(form.get('country')?.value?.alpha2Code),
      },
      region: {
        order: 12,
        label: 'FORMS.LABELS.REGION',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          textValidator,
        ],
        shouldShow: (form: FormGroup) => {
          const {states, provinces} = getCountryAdministrativeUnits(form.get('country')?.value?.alpha2Code);
          return !(states || provinces);
        },
      },
      city: {
        order: 13,
        label: 'FORMS.LABELS.CITY',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          textValidator,
        ],
      },
      line1: {
        order: 14,
        label: 'FORMS.LABELS.ADDRESS',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          addressValidator
        ],
      },
      line2: {
        order: 15,
        label: 'FORMS.LABELS.ADDRESS2',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          addressValidator
        ],
      },
      postalCode: {
        order: 16,
        label: 'FORMS.LABELS.ZIP_CODE',
        placeholder: '',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required
        ],
      },
    };
  };
