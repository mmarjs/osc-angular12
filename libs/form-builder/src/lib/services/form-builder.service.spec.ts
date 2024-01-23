import { TestBed } from '@angular/core/testing';

import { FormBuilderService } from './form-builder.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldListModel } from '../models/FormFieldList.model';
import { FormFieldGroupTypes } from '../models/FormFieldGroupTypes';

describe('FormBuilderService', () => {
  let service: FormBuilderService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
    service = TestBed.inject(FormBuilderService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('buildReactiveForm - fields is empty', () => {
    const form = service.buildReactiveForm(null);
    expect(form.controls).toEqual({});
  });

  it('buildReactiveForm - fields is not empty', () => {
    const formBlock: FormFieldListModel = {
      name: {
        order: 0,
        contextId: 'shipyard',
        defaultValue: '',
        label: 'FORMS.LABELS.WHAT_IS_THE_SHIPYARD_NAME',
        placeholder: 'FORMS.PLACEHOLDERS.WHAT_IS_THE_SHIPYARD_NAME',
        type: FormFieldGroupTypes.text,
        validators: [Validators.required]
      }
    };
    const form = service.buildReactiveForm(formBlock);

    console.log(form.get('name'));

    expect(form.contains('name')).toBeTruthy();
    const field = form.get('name');
    expect(field.hasValidator(Validators.required)).toBeTruthy();
  });
});
