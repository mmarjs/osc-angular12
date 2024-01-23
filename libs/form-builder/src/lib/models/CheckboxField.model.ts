import { BaseFieldModel } from "./BaseField.model";
import { FormFieldGroupTypes } from "./FormFieldGroupTypes";

export interface CheckboxFieldModel extends BaseFieldModel<boolean> {
  type: FormFieldGroupTypes.checkbox;
}
