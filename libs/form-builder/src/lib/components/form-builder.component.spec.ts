import { TestBed } from '@angular/core/testing';
import { FormBuilderComponent } from './form-builder.component';
import { FormFieldListModel } from '../models/FormFieldList.model';
import { FormFieldGroupTypes } from '../models/FormFieldGroupTypes';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { FormBuilderService } from '../services/form-builder.service';
import { NumberOnlyDirective, TrimInputDirective, } from '@ocean/shared/directives';
import { TextFieldComponent } from '@ocean/shared/forms';
import { MockModule, MockPipe, MockProvider } from 'ng-mocks';
import { LocalizationService } from '@ocean/internationalization';
import { TranslatePipe } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatepickerComponent } from '@ocean/shared/forms/fields/datepicker/datepicker.component';
import { MatSelectCountryLangToken, MatSelectCountryModule, } from '@angular-material-extensions/select-country';
import { CountryISO, NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '@ocean/material';
import { JobDialogs } from '@ocean/api/data';
import userEvent from '@testing-library/user-event';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxComponent } from '@ocean/shared/forms/fields/checkbox/checkbox.component';
import { SelectFieldModel } from '@ocean/libs/form-builder';
import { MatSelectModule } from '@angular/material/select';

describe('FormBuilderComponent', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create text field', async () => {
    const formBlock: FormFieldListModel = {
      name: {
        order: 0,
        contextId: 'shipyard',
        defaultValue: '',
        label: 'FORMS.LABELS.WHAT_IS_THE_SHIPYARD_NAME',
        placeholder: 'FORMS.PLACEHOLDERS.WHAT_IS_THE_SHIPYARD_NAME',
        type: FormFieldGroupTypes.text,
        validators: [
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      },
    };

    const cmp = await render(FormBuilderComponent, {
      ...{
        imports: [
          ReactiveFormsModule,
          FormsModule,
          MatFormFieldModule,
          MatInputModule,
        ],
        declarations: [
          TextFieldComponent,
          MockPipe(TranslatePipe, (v) => v),
          TrimInputDirective,
          NumberOnlyDirective,
        ],
        providers: [
          FormBuilderService,
          MockProvider(LocalizationService),
          MockProvider(JobDialogs),
        ],
      },
    });
    const formBuilder = TestBed.inject(FormBuilder);

    cmp.rerender({
      form: formBuilder.group({
        name: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
        ],
      }),
      fields: formBlock,
    });

    const inputName = screen.getByLabelText(
      /FORMS.LABELS.WHAT_IS_THE_SHIPYARD_NAME */i
    );
    expect(inputName).toMatchInlineSnapshot(`
      <input
        aria-required="true"
        class="mat-input-element mat-form-field-autofill-control ng-untouched ng-pristine ng-invalid cdk-text-field-autofill-monitored"
        data-placeholder="FORMS.PLACEHOLDERS.WHAT_IS_THE_SHIPYARD_NAME"
        id="shipyard-name"
        matinput=""
        min="undefined"
        required=""
        type="text"
      />
    `);
  });

  it('should create number field', async () => {
    const formBlock: FormFieldListModel = {
      age: {
        order: 0,
        contextId: 'shipyard',
        label: 'age.label',
        placeholder: 'age.placeholder',
        hideArrowsForNumber: true,
        type: FormFieldGroupTypes.number,
        validators: [
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      },
    };

    const cmp = await render(FormBuilderComponent, {
      ...{
        imports: [
          ReactiveFormsModule,
          FormsModule,
          MatFormFieldModule,
          MatInputModule,
        ],
        declarations: [
          TextFieldComponent,
          MockPipe(TranslatePipe, (v) => v),
          TrimInputDirective,
          NumberOnlyDirective,
        ],
        providers: [
          FormBuilderService,
          MockProvider(LocalizationService),
          MockProvider(JobDialogs),
        ],
      },
    });
    const formBuilder = TestBed.inject(FormBuilder);

    cmp.rerender({
      form: formBuilder.group({
        age: ['', [Validators.required]],
      }),
      fields: formBlock,
    });

    const inputName = screen.getByLabelText(/age.label */i);
    expect(inputName).toMatchInlineSnapshot(`
      <input
        aria-required="true"
        class="mat-input-element mat-form-field-autofill-control ng-untouched ng-pristine ng-invalid cdk-text-field-autofill-monitored"
        data-placeholder="age.placeholder"
        id="-age"
        matinput=""
        min="undefined"
        required=""
        type="number"
      />
    `);
  });

  it('should create date field', async () => {
    const formBlock: FormFieldListModel = {
      date: {
        order: 0,
        contextId: 'shipyard',
        label: 'date.label',
        placeholder: 'date.placeholder',
        defaultValue: '',
        type: FormFieldGroupTypes.date,
        validators: [Validators.required],
      },
    };

    const cmp = await render(FormBuilderComponent, {
      ...{
        imports: [
          ReactiveFormsModule,
          FormsModule,
          MatFormFieldModule,
          MatInputModule,
          MaterialModule,
          MatDatepickerModule,
          MatNativeDateModule,
        ],
        declarations: [
          FormBuilderComponent,
          MockPipe(TranslatePipe, (v) => v),
          TrimInputDirective,
          NumberOnlyDirective,
          DatepickerComponent,
        ],
        providers: [
          FormBuilderService,
          MockProvider(LocalizationService),
          MockProvider(JobDialogs),
        ],
      },
    });
    const formBuilder = TestBed.inject(FormBuilder);

    cmp.rerender({
      form: formBuilder.group({
        date: ['', [Validators.required]],
      }),
      fields: formBlock,
    });

    const inputName = screen.getByLabelText(/date.label */i);
    expect(inputName).toMatchInlineSnapshot(`
      <input
        aria-haspopup="dialog"
        aria-invalid="false"
        aria-required="false"
        class="mat-input-element mat-form-field-autofill-control mat-datepicker-input ng-untouched ng-pristine ng-invalid cdk-text-field-autofill-monitored"
        data-mat-calendar="mat-datepicker-0"
        data-placeholder="date.placeholder"
        id="shipyard-date"
        matinput=""
        readonly="true"
      />
    `);
  });

  it('should create country field', async () => {
    const formBlock: FormFieldListModel = {
      country: {
        order: 0,
        label: 'country.label',
        placeholder: 'country.placeholder',
        defaultValue: '',
        type: FormFieldGroupTypes.country,
        validators: [Validators.required],
      },
    };

    const cmp = await render(FormBuilderComponent, {
      ...{
        imports: [
          ReactiveFormsModule,
          FormsModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectCountryModule,
        ],
        declarations: [
          FormBuilderComponent,
          MockPipe(TranslatePipe, (v) => v),
          TrimInputDirective,
          NumberOnlyDirective,
        ],
        providers: [
          FormBuilderService,
          MockProvider(MatSelectCountryLangToken),
          MockProvider(LocalizationService),
          MockProvider(JobDialogs),
        ],
      },
    });
    const formBuilder = TestBed.inject(FormBuilder);

    cmp.rerender({
      form: formBuilder.group({
        country: ['', [Validators.required]],
      }),
      fields: formBlock,
    });

    const inputName = screen.getByRole('combobox');
    expect(inputName).toMatchInlineSnapshot(`
      <input
        aria-autocomplete="list"
        aria-expanded="false"
        aria-haspopup="true"
        aria-invalid="false"
        aria-label="country"
        aria-required="false"
        class="mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger cdk-text-field-autofill-monitored"
        data-placeholder="country.placeholder"
        disabled=""
        matinput=""
        name="country"
        role="combobox"
        tabindex="0"
        type="text"
      />
    `);
  });

  it('should create phone field', async () => {
    const formBlock: FormFieldListModel = {
      phone: {
        order: 0,
        label: 'phone.label',
        defaultValue: '',
        type: FormFieldGroupTypes.phone,
        validators: [Validators.required],
        interceptSelectedCountryISO: (form: any) => {
          return CountryISO.UnitedStates;
        },
      },
    };

    const cmp = await render(FormBuilderComponent, {
      ...{
        imports: [
          ReactiveFormsModule,
          FormsModule,
          MatFormFieldModule,
          MatInputModule,
          MockModule(NgxIntlTelInputModule),
        ],
        declarations: [
          FormBuilderComponent,
          MockPipe(TranslatePipe, (v) => v),
          TrimInputDirective,
          NumberOnlyDirective,
        ],
        providers: [
          FormBuilderService,
          MockProvider(LocalizationService),
          MockProvider(JobDialogs),
        ],
      },
    });
    const formBuilder = TestBed.inject(FormBuilder);

    cmp.rerender({
      form: formBuilder.group({
        phone: ['', [Validators.required]],
      }),
      fields: formBlock,
    });

    const inputName = screen.getByTestId('phone');
    expect(inputName).toMatchInlineSnapshot(`
      <ngx-intl-tel-input
        class="ng-untouched ng-pristine ng-invalid"
        data-testid="phone"
        id="phonephone"
      />
    `);
  });

  it('should create checkbox field', async () => {
    const formBlock: FormFieldListModel = {
      checkbox: {
        order: 0,
        label: 'checkbox.label',
        placeholder: 'checkbox.placeholder',
        defaultValue: false,
        type: FormFieldGroupTypes.checkbox,
      },
    };

    const cmp = await render(FormBuilderComponent, {
      imports: [ReactiveFormsModule, MatCheckboxModule],
      declarations: [
        CheckboxComponent,
        MockPipe(TranslatePipe, (v) => v),
        TrimInputDirective,
        NumberOnlyDirective,
      ],
      providers: [FormBuilderService, MockProvider(JobDialogs)],
    });
    const formBuilder = TestBed.inject(FormBuilderService);

    const form = formBuilder.buildReactiveForm(formBlock);
    cmp.rerender({
      form,
      fields: formBlock,
    });

    expect(screen.queryByLabelText('checkbox.label')).toBeInTheDocument();
    expect(screen.queryByLabelText('checkbox.label')).not.toBeChecked();
    expect(form.value.checkbox).toBe(false);

    await userEvent.click(screen.getByLabelText('checkbox.label'));

    expect(screen.queryByLabelText('checkbox.label')).toBeChecked();
    expect(form.value.checkbox).toBe(true);
  });

  it('should show and hide field by condition', async () => {
    const formBlock: FormFieldListModel = {
      name: {
        order: 0,
        label: 'name.label',
        placeholder: 'name.placeholder',
        defaultValue: '',
        type: FormFieldGroupTypes.text,
      },
      age: {
        order: 1,
        label: 'age.label',
        placeholder: 'age.placeholder',
        defaultValue: '',
        type: FormFieldGroupTypes.text,
        shouldShow: (fm: FormGroup) => {
          return fm.value.name === 'test';
        },
      },
    };

    const cmp = await render(FormBuilderComponent, {
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
      declarations: [
        TextFieldComponent,
        MockPipe(TranslatePipe, (v) => v),
        TrimInputDirective,
        NumberOnlyDirective,
      ],
      providers: [
        FormBuilderService,
        MockProvider(LocalizationService),
        MockProvider(JobDialogs),
      ],
    });

    const formBuilder = TestBed.inject(FormBuilderService);
    const form = formBuilder.buildReactiveForm(formBlock);
    cmp.rerender({
      form,
      fields: formBlock,
    });

    expect(screen.queryByLabelText(/name.placeholder/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/age.placeholder/i)).not.toBeInTheDocument();
    
    await userEvent.type(screen.getByLabelText(/name.placeholder/i), 'test');
    cmp.detectChanges();
  });

  it('should create select field', async () => {
    const selectedValueFn = jest.fn(option => option);

    const fields: FormFieldListModel<{ gender: SelectFieldModel }, SelectFieldModel> = {
      gender: {
        order: 0,
        label: 'select.label',
        placeholder: 'select.placeholder',
        defaultValue: '',
        value: '',
        options: [
          'male',
          'female',
          'other'
        ],
        type: FormFieldGroupTypes.select,
        getOptionTitle: value => value,
        getOptionValue: value => value,
        onValueSelected: selectedValueFn
      },
    };

    const cmp = await render(FormBuilderComponent, {
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      declarations: [
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        FormBuilderService,
        MockProvider(LocalizationService),
        MockProvider(JobDialogs),
      ],
    });

    const fb = TestBed.inject(FormBuilderService);
    const form = fb.buildReactiveForm(fields);

    cmp.rerender({
      form, fields,
    });

    expect(screen.getByLabelText(/select.placeholder/i)).toBeInTheDocument();

    const dropdown = screen.getByRole('combobox');
    await userEvent.click(dropdown);
    await userEvent.click(screen.getByText(/female/i));
    expect(selectedValueFn).toBeCalledWith('female');
  });
});
