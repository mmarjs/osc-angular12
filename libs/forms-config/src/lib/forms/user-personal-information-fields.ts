import {
  FormFieldGroupTypes,
  FormFieldListModel,
  FormFieldModel,
  PhoneFieldModel,
  TextFieldModel,
} from '@ocean/libs/form-builder';
import { CountryISO } from 'ngx-intl-tel-input';
import { nameValidator } from '@ocean/shared';
import { Validators } from '@angular/forms';

export interface UserPersonalInformationFields {
  firstName: TextFieldModel;
  lastName: TextFieldModel;
  email: TextFieldModel;
  phone: PhoneFieldModel;
}

export type UserPersonalInformationAsObject = {
  [K in keyof UserPersonalInformationFields]: string;
};

export const defaultPersonalInformationObj: UserPersonalInformationAsObject = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export const personalInformationFields: FormFieldListModel<
  UserPersonalInformationFields,
  FormFieldModel
> = {
  firstName: {
    order: 0,
    type: FormFieldGroupTypes.text,
    label: 'FORMS.LABELS.FIRST_NAME',
    cssClassName: 'half',
    validators: [nameValidator, Validators.required],
  },
  lastName: {
    order: 1,
    type: FormFieldGroupTypes.text,
    label: 'FORMS.LABELS.LAST_NAME',
    cssClassName: 'half',
    validators: [nameValidator, Validators.required],
  },
  phone: {
    order: 2,
    type: FormFieldGroupTypes.phone,
    label: 'FORMS.LABELS.PHONE',
    cssClassName: 'full',
    disableISOInterceptor: true,
    disableCountryChangeInterceptor: true,
    validators: [Validators.required],
  },
  email: {
    order: 3,
    type: FormFieldGroupTypes.text,
    label: 'FORMS.LABELS.EMAIL_ADDRESS',
    cssClassName: 'full',
    validators: [Validators.email, Validators.required],
  },
};
