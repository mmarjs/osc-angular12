import { Country } from '@angular-material-extensions/select-country';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormUtils } from '@ocean/shared';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryComponent),
      multi: true
    }
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'mat-form-field form-group',
    '[class.mat-input-invalid]': '_control?.invalid && _control?.touched',
    '[class.mat-form-field-invalid]': '_control?.invalid && _control?.touched',
    '[class.mat-form-field-disabled]': '_control?.disabled',
    '[class.mat-form-field-autofilled]': '_control?.autofilled',
    '[class.mat-form-field-readonly]': '_readonly'
  }
})
export class CountryComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = '';
  @Input() formControlName: string;
  @Input() contextId: string;
  @Input() label: string;
  @Input()
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = coerceBooleanProperty(value);
  }
  _required: boolean;
  value: Country;
  disabled: boolean;
  _control: AbstractControl | undefined;
  onChange: any = () => { };
  onTouch: any = () => { };

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private parent: ControlContainer
  ) { }

  ngOnInit(): void {
    if (this.formControlName) {
      const parent = this.parent.control as AbstractControl;
      this._control = parent.get(this.formControlName);
      this._required = this._required || FormUtils.isRequired(this._control);
    }
  }

  onCountrySelected(country: Country) {
    this.onChange(country);
    this.onTouch(country);
  }

  writeValue(country: Country): void {
    if (country) {
      this.value = country;
      this.onCountrySelected(country);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
