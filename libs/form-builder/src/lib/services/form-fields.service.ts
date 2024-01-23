import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Injectable, OnDestroy } from '@angular/core';
import { FieldMap, FormBuilderService, FormFieldListModel, FormFieldModel, } from '@ocean/libs/form-builder';
import { FormUtils } from '@ocean/shared/utils/form.utils';
import { distinctUntilChanged, tap } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

export interface FormBuilderEntries<T> {
  form: FormGroup;
  fields: Partial<T>;
}

type Field<T> = keyof T;

type Grab<A extends FormFieldListModel, B extends Field<A>, C extends Field<A[B]>[]> = Pick<A[B], C[number]>;

type IsAcceptableFn = (value: FormFieldModel) => boolean;

@Injectable({
  providedIn: 'root'
})
export class FormFieldsService<Fields extends FormFieldListModel> implements OnDestroy {
  private fields: Fields | undefined;

  constructor(private readonly fb: FormBuilderService) {
  }

  private getFieldsByCondition(isAcceptable: IsAcceptableFn): Record<Field<Fields>, number> {
    return Object.entries(this.fields ?? {})
      .filter(([_, value]) => isAcceptable(value))
      .reduce((acc, [key, value]) => ({
        [key]: value?.order,
        ...acc,
      }), {} as Record<Field<Fields>, number>);
  }

  private filterFields(object: Object | undefined, keys: unknown[]) {
    return Object.entries(object ?? {})
      .filter(([key]) => keys.includes(key));
  }

  init(fields: Fields): void {
    this.fields = fields;
  }

  getRequired(): Record<Field<Fields>, number> {
    return this.getFieldsByCondition(value =>
      Validators.compose(value?.validators ?? [])?.({} as AbstractControl)?.required
    );
  }

  getOptional(): Record<Field<Fields>, number> {
    return this.getFieldsByCondition(value =>
      !Validators.compose(value?.validators ?? [])?.({} as AbstractControl)?.required
    );
  }

  grab<A extends Field<Fields>, B extends (keyof Fields[A])[]>(field: A, data: B): Grab<Fields, A, B> {
    return this.filterFields(this.fields?.[field], data)
      .reduce((acc, [key, value]) => {
        return {
          [key]: value,
          ...acc
        };
      }, {} as Grab<Fields, A, B>);
  }

  rewrite<A extends Partial<Record<keyof Fields, Partial<FormFieldModel>>>, B extends Fields[keyof A]['type']>
  (fields: A): Record<keyof A, FieldMap[B]> {
    const keys = Object.keys(fields);

    return this.filterFields(this.fields, keys)
      .reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: {
            ...value,
            ...fields[key],
          },
        };
      }, {} as Record<keyof A, FieldMap[B]>);
  }

  getOrders(fields: Field<Fields>[]): Record<Field<Fields>, number> {
    return fields.reduce((acc, cur, idx) => ({
      ...acc,
      [cur]: idx
    }), {} as Record<Field<Fields>, number>);
  }

  pick(fields: Field<Fields>[]): Partial<Fields> {
    const orders = this.getOrders(fields);

    return this.filterFields(this.fields, fields)
      .reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: {
            ...value,
            order: orders[key],
          },
        };
      }, {});
  }

  entries(fields: Field<Fields>[]): FormBuilderEntries<Fields> {
    const partial = this.pick(fields);
    return {
      form: this.fb.buildReactiveForm(partial),
      fields: partial
    };
  }

  validateWhenCountryChanged(
    country?: AbstractControl,
    zip?: AbstractControl,
    state?: AbstractControl,
    province?: AbstractControl,
    region?: AbstractControl,
  ) {
    if (!(country instanceof AbstractControl)) {
      return;
    }

    return country
      .valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => {
          FormUtils.validateZipCtrlByCountry(value, zip ?? null);
          FormUtils.validateStateByCountry(value, state ?? null);
          FormUtils.validateProvinceByCountry(value, province ?? null);
          FormUtils.validateRegionByCountry(value, region ?? null);
        }),
        untilDestroyed(this)
      );
  }

  ngOnDestroy() {
  }
}
