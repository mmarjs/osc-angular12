import { BaseFieldModel } from './BaseField.model';
import { FormFieldGroupTypes } from './FormFieldGroupTypes';

export interface NumberFieldModel extends BaseFieldModel<number> {
  type: FormFieldGroupTypes.number;
  hideArrowsForNumber: boolean;
  isCurrency?: boolean;
  contextId?: string;
  min?: number;
  onlyIntegers?: boolean;
  numberValidate?: boolean;
}
