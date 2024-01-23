import { BaseFieldModel } from './BaseField.model';
import { FormFieldGroupTypes } from './FormFieldGroupTypes';

export interface TextFieldModel extends BaseFieldModel<string> {
  type: FormFieldGroupTypes.text;
  isCurrency?: boolean;
  noTailingSpace?: boolean;
  contextId?: string;
}
