import {
  FormFieldGroupTypes,
  FormFieldListModel,
  FormFieldModel,
  SelectFieldModel,
  TextFieldModel,
} from '@ocean/libs/form-builder';
import { Validators } from '@angular/forms';
import { textValidator } from '@ocean/shared/utils/text-validator';
import {
  currencyISO3,
  getCurrencyList,
} from '@ocean/shared/utils/get-currency-by-iso';
import { expireCardDateValidator } from '@ocean/shared/utils/expire-card-date-validator';

export interface StripeCardFormFields {
  cardHolderName: TextFieldModel;
  number: TextFieldModel;
  expireDate: TextFieldModel;
  cvc: TextFieldModel;
  currency: SelectFieldModel;
}

export const stripeInputCardMask = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const stripeInputCardExpireMask = [/\d/, /\d/, '/', /\d/, /\d/];

export const stripeInputCardCvcMask = [/\d/, /\d/, /\d/];

export const stripeCardFields: FormFieldListModel<
  StripeCardFormFields,
  FormFieldModel
> = {
  cardHolderName: {
    order: 0,
    label: 'STRIPE.CARDS.HOLDER_NAME',
    placeholder: 'FORMS.PLACEHOLDERS.ACCOUNT_HOLDER_NAME',
    type: FormFieldGroupTypes.text,
    cssClassName: 'full',
    validators: [Validators.required, textValidator],
  },
  number: {
    order: 1,
    label: 'FORMS.LABELS.CARD_NUMBER',
    placeholder: 'FORMS.PLACEHOLDERS.CARD_NUMBER',
    type: FormFieldGroupTypes.text,
    cssClassName: 'full',
    mask: stripeInputCardMask,
    validators: [Validators.required],
  },
  expireDate: {
    order: 2,
    label: 'FORMS.LABELS.CARD_EXPIRE_DATE',
    placeholder: 'FORMS.PLACEHOLDERS.CARD_EXPIRE_DATE',
    type: FormFieldGroupTypes.text,
    cssClassName: 'half',
    mask: stripeInputCardExpireMask,
    validators: [Validators.required, expireCardDateValidator],
  },
  cvc: {
    order: 3,
    label: 'FORMS.LABELS.CARD_CVC',
    placeholder: 'FORMS.PLACEHOLDERS.CARD_CVC',
    type: FormFieldGroupTypes.text,
    cssClassName: 'half',
    mask: stripeInputCardCvcMask,
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
};
