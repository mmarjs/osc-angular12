import { FormFieldGroupTypes } from '@ocean/libs/form-builder';
import { BaseFieldModel } from './BaseField.model';

export interface EditableFieldModel extends BaseFieldModel<string | number> {
  type: FormFieldGroupTypes.editable;
  value: string | number;
  isEditing: boolean;
  onStartEditing: (fieldName: string) => void;
  onDoneEditing: (value: string | null) => void;
}
