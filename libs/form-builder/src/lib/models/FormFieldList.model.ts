import { FormFieldModel } from './FormField.model';

export type FormFieldListModel<ListModel extends object = any, ExtendedModel extends object = any> = {
  [Property in keyof ListModel]: FormFieldModel & ExtendedModel;
};
