import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { FormFieldListModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  constructor(private builder: FormBuilder) {}

  buildReactiveForm(
    fields: FormFieldListModel,
    formValidators?: ValidatorFn[]
  ): FormGroup {
    if (!fields) {
      return this.builder.group({});
    }
    const entries = Object.entries(fields);

    const controlsConfig: { [p: string]: [string, ValidatorFn[]] } =
      entries.reduce((a, v) => {
        const defValue =
          v[1] && 'defaultValue' in v[1] ? v[1].defaultValue : null;
        const validators =
          v[1] && 'validators' in v[1] ? v[1].validators : null;
        return { ...a, [v[0]]: [defValue, validators] };
      }, {});

    return this.builder.group(controlsConfig, {
      validators: [...(formValidators ?? [])],
    });
  }
}
