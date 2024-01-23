import { BaseFieldModel } from './BaseField.model';
import { FormFieldGroupTypes } from './FormFieldGroupTypes';

export interface TextareaFieldModel extends BaseFieldModel<string> {
  type: FormFieldGroupTypes.textarea;
  rows?: number;
  noTailingSpace?: boolean;
  contextId?: string;
}
