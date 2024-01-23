import { FormFieldGroupTypes } from '@ocean/libs/form-builder';
import { BaseFieldModel } from './BaseField.model';

export interface SelectFieldModel<T = any> extends BaseFieldModel<T> {
  type: FormFieldGroupTypes.select;
  options: T[];
  value: T;
  getOptionValue: (value: T) => unknown;
  getOptionTitle: (value: T) => string;
  onValueSelected: (value: T | null) => void;
}
