import { Validators } from '@angular/forms';
import { BidDTO } from '@ocean/api/shared';
import {
  FormFieldGroupTypes,
  FormFieldListModel,
  FormFieldModel,
} from '@ocean/libs/form-builder';
import { conditionalValidator } from '@ocean/shared/utils';
import { addressValidator } from '@ocean/shared/utils/address-validator';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';
import { NumberValidator } from '@ocean/shared/utils/number-validator';
import { textValidator } from '@ocean/shared/utils/text-validator';

function getBeforeTodayDate(): Date {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  return minDate;
}

type FormKeys =
  | 'approximateDuration'
  | 'workStartDate'
  | 'country'
  | 'address'
  | 'address2'
  | 'city'
  | 'state'
  | 'awayFromProvidersYard'
  | 'yardOwner'
  | 'zipCode';

export type TypedDetailFormValues = {
  [K in keyof Pick<BidDTO, FormKeys>]: null | BidDTO[K];
};

export type TypedForm = Required<
  {
    [K in keyof TypedDetailFormValues]: FormFieldModel;
  }
>;

export function getDetailFieldsConfig(): FormFieldListModel<
  TypedForm,
  FormFieldModel
> {
  return {
    approximateDuration: {
      order: 0,
      label: 'FORMS.LABELS.APPROX_TIME_TO_COMPLETE_JOB',
      placeholder: '',
      type: FormFieldGroupTypes.number,
      hideArrowsForNumber: false,
      min: 1,
      validators: [
        Validators.required,
        Validators.min(1),
        NumberValidator.onlyIntegers(),
        CustomValidator.dontAllowOnlyZeros(),
      ],
    },
    workStartDate: {
      order: 1,
      label: 'FORMS.LABELS.THE_WORK_CAN_START_ON',
      placeholder: 'FORMS.PLACEHOLDERS.CHOOSE_DATE',
      type: FormFieldGroupTypes.date,
      minDate: getBeforeTodayDate(),
      validators: [Validators.required],
    },
    awayFromProvidersYard: {
      order: 2,
      label: 'FORMS.LABELS.AWAY_FROM_PROVIDERS_YARD',
      placeholder: 'FORMS.LABELS.AWAY_FROM_PROVIDERS_YARD_DESCRIPTION',
      type: FormFieldGroupTypes.checkbox,
    },
    yardOwner: {
      order: 3,
      shouldShow: (form) => form.value.awayFromProvidersYard,
      label: 'FORMS.LABELS.YARD_OWNER',
      placeholder: '',
      type: FormFieldGroupTypes.text,
    },
    country: {
      order: 4,
      label: 'FORMS.LABELS.COUNTRY',
      placeholder: '',
      type: FormFieldGroupTypes.country,
      validators: [Validators.required],
    },
    address: {
      order: 5,
      contextId: 'location',
      defaultValue: '',
      label: 'FORMS.LABELS.ADDRESS',
      placeholder: 'FORMS.PLACEHOLDERS.ADDRESS',
      type: FormFieldGroupTypes.text,
      validators: [
        Validators.required,
        addressValidator(false),
        Validators.maxLength(100),
        CustomValidator.dontAllowOnlyZeros(),
      ],
    },
    address2: {
      order: 6,
      contextId: 'location',
      defaultValue: '',
      label: 'FORMS.LABELS.ADDRESS2',
      placeholder: 'FORMS.PLACEHOLDERS.ADDRESS2',
      type: FormFieldGroupTypes.text,
      validators: [
        conditionalValidator(
          Validators.compose([
            addressValidator(true),
            Validators.maxLength(100),
            CustomValidator.dontAllowOnlyZeros(),
          ]),
          (form) => form?.value?.address2?.length > 0
        ),
      ],
    },
    city: {
      order: 7,
      contextId: 'location',
      defaultValue: '',
      label: 'FORMS.LABELS.CITY',
      placeholder: '',
      type: FormFieldGroupTypes.text,
      noTailingSpace: true,
      validators: [
        Validators.required,
        textValidator,
        Validators.maxLength(100),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
    },
    state: {
      order: 8,
      contextId: 'location',
      defaultValue: '',
      label: 'FORMS.LABELS.STATE',
      placeholder: '',
      type: FormFieldGroupTypes.text,
      noTailingSpace: true,
      validators: [
        Validators.required,
        textValidator,
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
      cssClassName: 'state-field',
    },
    zipCode: {
      order: 9,
      label: 'FORMS.LABELS.ZIP_CODE',
      placeholder: '',
      type: FormFieldGroupTypes.text,
      validators: [Validators.required],
      shouldShow: (form) => !!form?.get('zipCode')?.enabled,
      cssClassName: 'zip-code-field',
    },
  };
}
