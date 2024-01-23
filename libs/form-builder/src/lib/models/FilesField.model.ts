import { NgxFileDropEntry } from 'ngx-file-drop';
import { BaseFieldModel } from './BaseField.model';
import { FormFieldGroupTypes } from './FormFieldGroupTypes';

export interface FilesFieldModel extends BaseFieldModel<string> {
  type: FormFieldGroupTypes.files;
  openDocumentsDialog: (fieldName: string) => void;
  filesChange: (fieldName: string, files: NgxFileDropEntry[]) => void;
}
