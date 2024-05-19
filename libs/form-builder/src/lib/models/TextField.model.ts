import { BaseFieldModel } from './BaseField.model';
import { FormFieldGroupTypes } from './FormFieldGroupTypes';
import { TextMaskConfig } from 'angular2-text-mask/src/angular2TextMask';

export interface TextFieldModel extends BaseFieldModel<string> {
  type: FormFieldGroupTypes.text;
  isCurrency?: boolean;
  noTailingSpace?: boolean;
  contextId?: string;
  mask?: TextMaskConfig['mask'];
}
