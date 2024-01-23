import {
  CountryFieldModel,
  FormFieldGroupTypes,
  FormFieldListModel,
  FormFieldModel, FormFieldsService,
  NumberFieldModel, SelectFieldModel,
  TextareaFieldModel,
  TextFieldModel,
} from '@ocean/libs/form-builder';
import { Validators } from '@angular/forms';
import { nameValidator } from '@ocean/shared/utils/name-validator';
import { YearValidator } from '@ocean/shared/utils/year-validator';
import { boatLengthValidator } from '@ocean/shared/utils/boat-length-validator';
import { addressValidator } from '@ocean/shared/utils/address-validator';
import { textValidator } from '@ocean/shared/utils/text-validator';
import { hullIdValidator } from '@ocean/shared/utils/hull-id-validator';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';
import { FormattedTimeZone, getFormattedTimeZones } from '@ocean/shared/utils/timeZones';
import * as moment from 'moment-timezone';

// BoatInputDTO
export interface BoatFields {
  name: TextFieldModel;
  makeModelYear: NumberFieldModel;
  type: TextFieldModel;
  length: NumberFieldModel;
  address: TextFieldModel;
  address2: TextFieldModel;
  city: TextFieldModel;
  state: TextFieldModel;
  zipCode: TextFieldModel;
  country: CountryFieldModel;
  timeZone: SelectFieldModel;
  about: TextareaFieldModel;
  hullId: TextFieldModel;
  flag: CountryFieldModel;
  model: TextFieldModel;
  officialNumber: NumberFieldModel;
  loa: NumberFieldModel;
  beam: NumberFieldModel;
  draft: TextFieldModel;
  displacement: NumberFieldModel;
  electricalRequirements: TextareaFieldModel;
  boatClass: TextFieldModel;
  insuranceNumber: NumberFieldModel;
}

type Fields = typeof boatFields;
type FieldsInArray = (keyof Fields)[];

export enum BoatFieldsType {
  SIGN_UP = 'SIGN_UP',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}

// Components: Boat Owner Signup, Add Boat, Boat Info, Edit Boat
export const boatFields: FormFieldListModel<BoatFields, FormFieldModel> = {
  name: {
    order: 0,
    label: 'FORMS.LABELS.WHAT_IS_THE_NAME_OF_YOUR_BOAT',
    placeholder: 'FORMS.PLACEHOLDERS.BOAT_NAME',
    type: FormFieldGroupTypes.text,
    defaultValue: '',
    cssClassName: 'full',
    validators: [
      Validators.required,
      nameValidator,
    ],
  },
  makeModelYear: {
    order: 1,
    label: 'FORMS.LABELS.YEAR',
    placeholder: 'FORMS.PLACEHOLDERS.YEAR',
    type: FormFieldGroupTypes.number,
    hideArrowsForNumber: true,
    isCurrency: false,
    cssClassName: 'half',
    validators: [
      Validators.required,
      YearValidator.yearCheck(),
    ]
  },
  type: {
    order: 2,
    label: 'FORMS.LABELS.WHAT_IS_THE_TYPE_OF_YOUR_BOAT',
    placeholder: 'FORMS.PLACEHOLDERS.TYPE',
    type: FormFieldGroupTypes.text,
    defaultValue: '',
    cssClassName: 'full',
    validators: [
      Validators.required,
      CustomValidator.noOnlySpace,
    ],
  },
  length: {
    order: 3,
    label: 'FORMS.LABELS.LENGTH',
    placeholder: 'FORMS.PLACEHOLDERS.LENGTH',
    type: FormFieldGroupTypes.number,
    hideArrowsForNumber: true,
    isCurrency: false,
    cssClassName: 'half',
    validators: [
      Validators.required,
      boatLengthValidator,
    ]
  },
  address: {
    order: 4,
    label: 'FORMS.LABELS.ADDRESS',
    placeholder: 'FORMS.PLACEHOLDERS.ADDRESS',
    type: FormFieldGroupTypes.text,
    cssClassName: 'half',
    defaultValue: '',
    validators: [
      Validators.required,
      addressValidator,
    ]
  },
  address2: {
    order: 5,
    label: 'FORMS.LABELS.ADDRESS2',
    placeholder: 'FORMS.PLACEHOLDERS.ADDRESS2',
    type: FormFieldGroupTypes.text,
    defaultValue: '',
    cssClassName: 'half',
    validators: [
      Validators.required,
      addressValidator,
    ]
  },
  city: {
    order: 6,
    label: 'FORMS.LABELS.CITY',
    placeholder: 'FORMS.PLACEHOLDERS.CITY',
    type: FormFieldGroupTypes.text,
    defaultValue: '',
    cssClassName: 'half',
    validators: [
      Validators.required,
      textValidator,
    ]
  },
  state: {
    order: 7,
    label: 'FORMS.LABELS.STATE',
    placeholder: 'FORMS.PLACEHOLDERS.STATE',
    type: FormFieldGroupTypes.text,
    defaultValue: '',
    cssClassName: 'half',
    validators: [
      Validators.required,
      textValidator,
    ]
  },
  zipCode: {
    order: 8,
    label: 'FORMS.LABELS.ZIP_CODE',
    placeholder: 'FORMS.PLACEHOLDERS.ZIP_CODE',
    type: FormFieldGroupTypes.text,
    defaultValue: '',
    cssClassName: 'half',
    validators: [
      Validators.required,
    ],
    shouldShow: form => !!form?.get('zipCode')?.enabled
  },
  country: {
    order: 9,
    label: 'FORMS.LABELS.COUNTRY',
    type: FormFieldGroupTypes.country,
    onCountryChange: value => value,
    cssClassName: 'full',
    validators: [
      Validators.required,
    ]
  },
  timeZone: {
    order: 10,
    label: 'FORMS.LABELS.TIMEZONE',
    type: FormFieldGroupTypes.select,
    cssClassName: 'full',
    options: getFormattedTimeZones(),
    defaultValue: moment.tz.guess(),
    value: moment.tz.guess(),
    getOptionTitle: (value: FormattedTimeZone) => value.title,
    getOptionValue: (value: FormattedTimeZone) => value.value,
    onValueSelected: value => value,
    validators: [
      Validators.required,
    ]
  },
  about: {
    order: 11,
    label: 'FORMS.LABELS.CREATE_BOAT_DESCRIPTION',
    placeholder: 'FORMS.PLACEHOLDERS.BOAT_DESCRIPTION',
    type: FormFieldGroupTypes.textarea,
    rows: 10,
    defaultValue: '',
    cssClassName: 'full',
    validators: [
      Validators.required,
      CustomValidator.noOnlySpace
    ]
  },
  hullId: {
    order: 12,
    label: 'FORMS.LABELS.HULL_ID',
    placeholder: 'FORMS.PLACEHOLDERS.HULL_ID',
    type: FormFieldGroupTypes.text,
    defaultValue: '',
    cssClassName: 'half',
    validators: [
      Validators.required,
      hullIdValidator
    ]
  },
  flag: {
    order: 13,
    label: 'FORMS.LABELS.FLAG',
    type: FormFieldGroupTypes.country,
    onCountryChange: value => value,
    cssClassName: 'full',
    validators: [
      Validators.required,
    ]
  },
  model: {
    order: 14,
    label: 'FORMS.LABELS.MODEL',
    placeholder: 'FORMS.PLACEHOLDERS.BOAT_MODEL',
    type: FormFieldGroupTypes.text,
    cssClassName: 'half',
    validators: [
      CustomValidator.noOnlySpace
    ]
  },
  officialNumber: {
    order: 15,
    label: 'FORMS.LABELS.OFFICIAL_NUMBER',
    placeholder: 'FORMS.PLACEHOLDERS.NUMBER',
    type: FormFieldGroupTypes.number,
    cssClassName: 'half',
    hideArrowsForNumber: true,
    isCurrency: false,
  },
  loa: {
    order: 16,
    label: 'FORMS.LABELS.LOA',
    type: FormFieldGroupTypes.number,
    placeholder: 'FORMS.PLACEHOLDERS.NUMBER',
    cssClassName: 'half',
    hideArrowsForNumber: true,
    isCurrency: false,
  },
  beam: {
    order: 17,
    label: 'FORMS.LABELS.BEAM',
    type: FormFieldGroupTypes.number,
    placeholder: 'FORMS.PLACEHOLDERS.NUMBER',
    cssClassName: 'half',
    hideArrowsForNumber: true,
    isCurrency: false,
  },
  draft: {
    order: 18,
    label: 'FORMS.LABELS.DRAFT',
    placeholder: 'FORMS.PLACEHOLDERS.BOAT_DRAFT',
    type: FormFieldGroupTypes.text,
    cssClassName: 'half',
    validators: [
      CustomValidator.noOnlySpace
    ]
  },
  displacement: {
    order: 19,
    label: 'FORMS.LABELS.DISPLACEMENT',
    placeholder: 'FORMS.PLACEHOLDERS.NUMBER',
    type: FormFieldGroupTypes.number,
    cssClassName: 'half',
    hideArrowsForNumber: true,
    isCurrency: false,
  },
  electricalRequirements: {
    order: 20,
    label: 'FORMS.LABELS.ELECTRICAL_REQUIREMENTS',
    placeholder: 'FORMS.PLACEHOLDERS.ELECTRICAL_REQUIREMENTS',
    type: FormFieldGroupTypes.textarea,
    cssClassName: 'full',
    rows: 10,
    validators: [
      CustomValidator.noOnlySpace
    ]
  },
  boatClass: {
    order: 21,
    label: 'FORMS.LABELS.BOAT_CLASS',
    placeholder: 'FORMS.PLACEHOLDERS.BOAT_CLASS',
    type: FormFieldGroupTypes.text,
    cssClassName: 'half',
    defaultValue: '',
    validators: [
      CustomValidator.noOnlySpace
    ],
  },
  insuranceNumber: {
    order: 22,
    label: 'FORMS.LABELS.INSURANCE_NUMBER',
    placeholder: 'FORMS.PLACEHOLDERS.NUMBER',
    type: FormFieldGroupTypes.number,
    cssClassName: 'half',
    hideArrowsForNumber: true,
    isCurrency: false,
  },
};

export const getBoatFieldsForType = (fieldsService: FormFieldsService<Fields>, form: BoatFieldsType): FieldsInArray[] => {
  const {
    name, makeModelYear, length, type, country,
    timeZone, address, address2, city, state,
    zipCode, hullId, flag, about,
    ...required
  } = fieldsService.getRequired();

  const {
    model, officialNumber, loa, beam, draft,
    displacement, electricalRequirements,
    boatClass, insuranceNumber,
    ...optional
  } = fieldsService.getOptional();

  switch (form) {
    case BoatFieldsType.CREATE:
      return [
        [
          'name', 'makeModelYear', 'length', 'type', 'country',
          'timeZone', 'address', 'address2', 'city', 'state',
          'zipCode', 'hullId', 'flag',
          ...Object.keys(required) as FieldsInArray,
          'model', 'officialNumber', 'loa', 'beam', 'draft', 'displacement',
          'electricalRequirements', 'boatClass', 'insuranceNumber',
          ...Object.keys(optional) as FieldsInArray,
        ],
        [
          'about'
        ]
      ];
    case BoatFieldsType.EDIT:
      return [
        [
          'name', 'length', 'type', 'makeModelYear', 'country',
          'timeZone', 'address', 'address2', 'city', 'state',
          'zipCode', 'hullId', 'flag', 'about',
          ...Object.keys(required) as FieldsInArray,
          'model', 'officialNumber', 'loa', 'beam', 'draft', 'displacement',
          'electricalRequirements', 'boatClass', 'insuranceNumber',
          ...Object.keys(optional) as FieldsInArray,
        ]
      ];
    case BoatFieldsType.SIGN_UP:
    default:
      return [
        [
          'name', 'makeModelYear', 'length', 'type', 'about',
          ...Object.keys(required) as FieldsInArray
        ],
        [
          'country', 'timeZone', 'state', 'city', 'address', 'zipCode'
        ]
      ];
  }
};
