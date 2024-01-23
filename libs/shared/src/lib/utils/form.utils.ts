import { Country } from '@angular-material-extensions/select-country';
import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, } from '@angular/forms';
import { isValidPostcode, postcodeExist } from '@ocean/shared/utils/postcode-validator';
import { cloneDeep, forOwn, get, isArray, isEmpty, isNaN, isNull, isObject, isString, isUndefined, pull, } from 'lodash-es';
import { countryHasProvinces, countryHasRegions, countryHasStates, ISO2 } from '@ocean/shared/utils/iso-mapper';
import { textValidator } from '@ocean/shared/utils/text-validator';

@Injectable({
  providedIn: 'root',
})
export class FormUtils {
  private _errors = {};

  constructor() {
  }

  // FIXME: do not use static fields in injectable services
  /**
   * Date range fn validator
   */
  static dateRangeValidator = (dateFrom: string, dateTo: string) => {
    return (group: FormGroup): { [key: string]: any } => {
      const fromDate = group.controls[dateFrom];
      const toDate = group.controls[dateTo];
      if (fromDate.value && toDate.value) {
        if (fromDate.value > toDate.value) {
          toDate.setErrors({incorrect: true});
          fromDate.setErrors({incorrect: true});
          return {
            dates: `${dateFrom} should be less than ${dateTo}`,
          };
        }
        toDate.setErrors(null);
        fromDate.setErrors(null);
      }
      return {};
    };
  };

  static endDateValidator = (dateTo: string, fromDate: Date = new Date()) => {
    return (group: FormGroup): { [key: string]: any } => {
      const toDate = group.controls[dateTo];
      if (toDate.value) {
        if (fromDate === toDate.value || fromDate > new Date(toDate.value)) {
          toDate.setErrors({incorrect: true});
          return {
            dates: `${dateTo} should be greater than ${fromDate}`
          };
        }
        toDate.setErrors(null);
      }
      return {};
    };
  };

  /**
   * Prune empty fields from objects
   */
  static pruneEmpty(obj: any) {
    return (function prune(current) {
      forOwn(current, function (value, key) {
        if (
          isUndefined(value) ||
          isNaN(value) ||
          isNull(value) ||
          (isString(value) && isEmpty(value)) ||
          (isObject(value) && isEmpty(prune(value)))
        ) {
          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete
      // operation on an array
      if (isArray(current)) {
        pull(current, undefined);
      }

      return current;
    })(cloneDeep(obj)); // do not modify the original object, create a clone instead
  }

  /**
   * Check if a Field is Required
   * @param field FormControl to check
   */
  static isRequired(field: AbstractControl) {
    if (field.validator) {
      const validator = field.validator(field);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  /**
   * Update the validity of a group and its childs
   * @param group Form to update validity
   */
  static updateValidity(group: FormGroup | FormArray): void {
    Object.keys(group.controls).map((field) => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.updateValueAndValidity({onlySelf: true});
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        FormUtils.updateValidity(control);
      }
    });
  }

  static zipCodeValidator(alpha2Code: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      isValidPostcode(control.value, alpha2Code)
        ? null
        : {
          invalidCountryZip: alpha2Code,
        };
  }

  /**
   * Makes visible the invalid fields of a form
   * @param group Form to mark as touched
   */
  static markAsTouched(group: FormGroup | FormArray): void {
    Object.keys(group.controls).map((field) => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        FormUtils.markAsTouched(control);
      }
    });
  }

  /**
   * Returns an object with the validation errors
   * @param group Form to mark as touched
   */
  static getErrors(group: FormGroup | FormArray, errors = {}): any {
    Object.assign(errors, group.errors ? group.errors : {});
    Object.keys(group.controls).map((field) => {
      const control = group.get(field) as FormControl;
      Object.assign(errors, control.errors ? control.errors : {});
      if (control instanceof FormGroup || control instanceof FormArray) {
        FormUtils.getErrors(control, errors);
      }
    });

    return errors;
  }

  static validateZipCtrlByCountry(
    change: Country,
    zipCodeCtrl: AbstractControl | null
  ): void {
    if (!(zipCodeCtrl instanceof AbstractControl)) {
      return;
    }

    if (change) {
      const hasPostcode = postcodeExist(change.alpha2Code);
      if (!hasPostcode) {
        zipCodeCtrl.disable();
        zipCodeCtrl.clearValidators();
        zipCodeCtrl.setValue('');
      } else {
        zipCodeCtrl.enable();
        zipCodeCtrl.setValidators([
          Validators.required,
          FormUtils.zipCodeValidator(change.alpha2Code),
        ]);
      }
      zipCodeCtrl.updateValueAndValidity();
    }
  }

  static disableFieldOnCondition(field: AbstractControl | null, validators: ValidatorFn[], condition: boolean) {
    if (!(field instanceof AbstractControl)) {
      return;
    }

    if (condition) {
      field.disable();
      field.setValue('');
      field.clearValidators();
    } else {
      field.enable();
      field.setValidators(validators);
    }
    field.updateValueAndValidity();
  }

  static administrativeUnitsValidator(
    country: Country,
    field: AbstractControl | null,
    handler: (iso: Uppercase<ISO2>) => boolean,
    onlyForISO2Countries: Uppercase<ISO2>[] = [],
    validators: ValidatorFn[],
    isDisabled: boolean,
  ) {
    const iso = country?.alpha2Code;
    this.disableFieldOnCondition(
      field,
      validators,
      isDisabled || (onlyForISO2Countries.length && !onlyForISO2Countries.includes(iso as ISO2)) || !handler(iso as ISO2)
    );
  }

  static validateStateByCountry(
    country: Country,
    field: AbstractControl | null,
    onlyForISO2Countries: Uppercase<ISO2>[] = [],
    isDisabled = false
  ) {
    this.administrativeUnitsValidator(
      country, field, countryHasStates, onlyForISO2Countries, [Validators.required, textValidator], isDisabled);
  }

  static validateProvinceByCountry(
    country: Country,
    field: AbstractControl | null,
    onlyForISO2Countries: Uppercase<ISO2>[] = [],
    isDisabled = false
  ) {
    this.administrativeUnitsValidator(
      country, field, countryHasProvinces, onlyForISO2Countries, [Validators.required, textValidator], isDisabled);
  }

  static validateRegionByCountry(
    country: Country,
    field: AbstractControl | null,
    onlyForISO2Countries: Uppercase<ISO2>[] = [],
    isDisabled = false
  ) {
    this.administrativeUnitsValidator(
      country, field, countryHasRegions, onlyForISO2Countries, [Validators.required, textValidator], isDisabled);
  }

  /**
   * View utils
   */
  hasErrors(group: FormGroup | FormArray) {
    this._errors = FormUtils.getErrors(group);
    return !isEmpty(this._errors);
  }

  getError(errorCode: string) {
    return get(this._errors, errorCode, null);
  }
}
