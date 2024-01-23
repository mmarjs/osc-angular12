import { Component, Input } from '@angular/core';
import { FormFieldGroupTypes } from '../models/FormFieldGroupTypes';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input';
import { FormFieldListModel } from '../models/FormFieldList.model';
import { FieldMap, FormFieldModel } from '../models/FormField.model';
import { KeyValue } from '@angular/common';
import { IconType } from '@ocean/icons';
import { JobDialogs } from '@ocean/api/data';
import { CountryFieldModel } from '../models';
import { Country } from '@angular-material-extensions/select-country';

type FormFields = InstanceType<typeof FormBuilderComponent>['fields'];
type Field<T> = T extends never ? string : keyof T & string;

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent {
  readonly formFieldGroupTypes = FormFieldGroupTypes;
  readonly CountryISO = CountryISO;
  readonly iconType = IconType;
  readonly validatorsRequired = Validators.required;
  readonly entries = Object.entries;

  @Input()
  fields: FormFieldListModel | undefined;

  @Input()
  form: FormGroup | undefined;

  @Input()
  containerCssClass: string | undefined;

  @Input()
  readonly!: boolean;

  constructor(private jobDialogs: JobDialogs) {}

  checkType<T extends FormFieldGroupTypes>(
    fieldValue: FormFieldModel,
    type: T
  ): FieldMap[T] | null {
    return fieldValue?.type === type ? (fieldValue as FieldMap[T]) : null;
  }

  orderByValue = (
    a: KeyValue<Field<FormFields>, FormFieldModel>,
    b: KeyValue<Field<FormFields>, FormFieldModel>
  ): number => {
    return a.value.order - b.value.order;
  };

  onCountryChange(fieldCountry: CountryFieldModel, country: Country): void {
    fieldCountry?.onCountryChange?.(country, this.form);
  }


  shouldShow(field: FormFieldModel): boolean {
    if (
      typeof field.shouldShow === 'function' &&
      this.form instanceof AbstractControl
    ) {
      return field.shouldShow(this.form);
    }
    return true;
  }
}
