import { FormGroup, ValidatorFn } from '@angular/forms';
import { FormFieldGroupTypes } from './FormFieldGroupTypes';

export interface BaseFieldModel<T extends any> {
  order: number;
  defaultValue?: T;
  type: FormFieldGroupTypes;
  validators?: ValidatorFn[];
  label: string;
  placeholder?: string;
  cssClassName?: string;
  shouldShow?: (form: FormGroup) => boolean;
}
