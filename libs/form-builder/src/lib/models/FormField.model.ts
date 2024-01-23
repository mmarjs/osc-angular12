import { TextFieldModel } from './TextField.model';
import { NumberFieldModel } from './NumberField.model';
import { PhoneFieldModel } from './PhoneField.model';
import { DateFieldModel } from './DateField.model';
import { CountryFieldModel } from './CountryField.model';
import { FilesFieldModel } from './FilesField.model';
import { EditableFieldModel } from './EditableField.model';
import { CheckboxFieldModel } from './CheckboxField.model';
import { SelectFieldModel } from './SelectField.model';
import { TextareaFieldModel } from './TextareaField.model';

export type FormFieldModel =
  | TextFieldModel
  | NumberFieldModel
  | PhoneFieldModel
  | DateFieldModel
  | CountryFieldModel
  | FilesFieldModel
  | EditableFieldModel
  | CheckboxFieldModel
  | SelectFieldModel
  | TextareaFieldModel;

export type FieldMap = {
  [key in FormFieldModel['type']]: Extract<FormFieldModel, { type: key }>;
};
