import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CountryFieldModel,
  FormFieldGroupTypes,
  FormFieldListModel,
  FormFieldsService,
  NumberFieldModel,
  TextFieldModel
} from '@ocean/libs/form-builder';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { CountryISO } from 'ngx-intl-tel-input';
import { TestScheduler } from 'rxjs/testing';
import { textValidator } from '@ocean/shared/utils/text-validator';

interface Fields {
  name: TextFieldModel;
  length: NumberFieldModel;
  year: NumberFieldModel;
  country: CountryFieldModel;
  zipCode: TextFieldModel;
}

const mockedFields: FormFieldListModel<Fields, FormFieldListModel> = {
  name: {
    order: 0,
    type: FormFieldGroupTypes.text,
    label: 'FORMS.LABELS.NAME',
    value: '',
    isEditing: false,
  },
  length: {
    order: 1,
    type: FormFieldGroupTypes.number,
    label: 'FORMS.LABELS.LENGTH',
    value: '',
    validators: [
      Validators.required,
    ],
    hideArrowsForNumber: true
  },
  year: {
    order: 2,
    type: FormFieldGroupTypes.number,
    label: 'FORMS.LABELS.LENGTH',
    value: '',
    validators: [
      Validators.required,
    ],
    hideArrowsForNumber: true
  },
  country: {
    order: 3,
    label: 'FORMS.LABELS.COUNTRY',
    placeholder: 'FORMS.PLACEHOLDERS.COUNTRY',
    type: FormFieldGroupTypes.country,
    onCountryChange: value => value,
  },
  zipCode: {
    order: 4,
    label: 'FORMS.LABELS.ZIP_CODE',
    placeholder: 'FORMS.PLACEHOLDERS.ZIP_CODE',
    type: FormFieldGroupTypes.text,
    defaultValue: '',
    cssClassName: 'half',
    validators: [
      textValidator
    ]
  },
};

describe('FormFieldsService', () => {
  let service: FormFieldsService<typeof mockedFields>;

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
    service = TestBed.inject(FormFieldsService);
    service.init(mockedFields);
  });

  it('getRequired', () => {
    const required = service.getRequired();
    expect(required).toEqual({length: 1, year: 2});
  });

  it('getOptional', () => {
    const optional = service.getOptional();
    expect(optional).toEqual({name: 0, country: 3, zipCode: 4});
  });

  it('grabs values', () => {
    const copy = {
      name: {
        ...mockedFields.name,
        ...service.grab('length', ['label', 'validators'])
      }
    };

    expect(copy).toEqual({
      name: {
        ...mockedFields.name,
        label: mockedFields.length.label,
        validators: mockedFields.length.validators,
      }
    });
  });

  it('rewrite values', () => {
    const copy = service.rewrite({
      name: {
        label: 'test'
      },
      length: {
        label: 'test'
      }
    });

    expect(copy).toEqual({
      name: {
        ...mockedFields.name,
        label: 'test',
      },
      length: {
        ...mockedFields.length,
        label: 'test',
      }
    });
  });

  it('getOrders', () => {
    const orders = service.getOrders(['length', 'year', 'name']);
    expect(orders).toEqual({
      length: 0,
      year: 1,
      name: 2
    });
  });

  it('pick', () => {
    const fields = service.pick(['length', 'year']);

    expect(fields).toEqual({
      length: {
        ...mockedFields.length,
        order: 0,
      },
      year: {
        ...mockedFields.year,
        order: 1
      }
    });
  });

  it('entries', () => {
    const entries = service.entries(['length', 'year']);

    expect(entries).toEqual({
      form: entries.form,
      fields: entries.fields
    });
  });

  it('FormFieldsService - validateWhenCountryChanged (undefined)', () => {
    const fn = jest.fn(() => service.validateWhenCountryChanged(undefined));
    fn();

    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveReturnedWith(undefined);
  });

  it('validateWhenCountryChanged', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable, flush} = helpers;

      const entries = service.entries(['country', 'zipCode']);
      service.validateWhenCountryChanged(
        // @ts-ignore
        entries.form.get('country'),
        entries.form.get('zipCode'),
      )?.subscribe();

      entries.form.controls['country'].setValue(stringToCountryField(CountryISO.Afghanistan));

      const action$ = hot('a', {a: entries.form.controls['zipCode'].disabled});
      const expected = cold('b', {b: true});

      expectObservable(action$).toEqual(expected);
      flush();
    });
  });
});
