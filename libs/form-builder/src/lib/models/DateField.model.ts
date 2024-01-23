import { BaseFieldModel } from './BaseField.model';
import { FormFieldGroupTypes } from './FormFieldGroupTypes';

export interface DateFieldModel extends BaseFieldModel<string> {
  type: FormFieldGroupTypes.date;
  contextId?: string;
  minDate: Date;
  maxDate?: Date;
}
