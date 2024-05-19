import {
  COUNTRIES_DB,
  Country,
} from '@angular-material-extensions/select-country';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { isRequired } from '@ocean/shared/utils/form';
import { CountryCode, getCountriesForTimezone } from 'countries-and-timezones';

const DEFAULT_COUNTRY: CountryCode = 'US';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryComponent),
      multi: true,
    },
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'mat-form-field form-group',
    '[class.mat-input-invalid]': '_control?.invalid && _control?.touched',
    '[class.mat-form-field-invalid]': '_control?.invalid && _control?.touched',
    '[class.mat-form-field-disabled]': '_control?.disabled',
    '[class.mat-form-field-autofilled]': '_control?.autofilled',
    '[class.mat-form-field-readonly]': '_readonly',
  },
})
export class CountryComponent implements ControlValueAccessor, OnInit {
  @Output() onCountrySelected = new EventEmitter<Country>();
  @Input() name: string;
  @Input() placeholder = '';
  @Input() formControlName: string;
  @Input() contextId: string;
  @Input() label: string;

  @Input()
  get countries() {
    return this._countries;
  }

  set countries(value) {
    if (!value || value.length === 0) {
      this._countries = this.sortCountries(COUNTRIES_DB);
    } else {
      this._countries = this.sortCountries(value);
    }
  }

  _countries: Country[] = this.sortCountries(COUNTRIES_DB);

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

  onChange: any = () => {};

  onTouch: any = () => {};

  get prioriyCountries(): CountryCode[] {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countries = getCountriesForTimezone(timezone);
    const preselection = countries.map((c) => c.id);
    if (preselection.length === 0) {
      return [DEFAULT_COUNTRY];
    }
    return preselection;
  }

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private parent: ControlContainer
  ) {}

  onInputChanged(value: string) {
    if (!value?.trim()?.length) {
      this.onCountrySelectedHandler(undefined);
    }
  }

  ngOnInit(): void {
    if (this.formControlName) {
      const parent = this.parent.control as AbstractControl;
      this._control = parent.get(this.formControlName);
      this._required = this._required || isRequired(this._control);
    } else {
      this._control = new FormControl(this.countries[0]);
    }

    if (!this._control?.value) {
      // run it in next cycle to avoid ExpressionChangedAfterItHasBeenCheckedError
      requestAnimationFrame(() => {
        this._control?.setValue(this.countries[0]);
      });
    }
  }

  onCountrySelectedHandler(country: Country) {
    this.onChange(country);
    this.onTouch(country);
  }

  writeValue(country: Country): void {
    if (country) {
      this.value = country;
      this.onCountrySelectedHandler(country);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private sortCountries(countries: Country[]): Country[] {
    const countriesList = countries.slice();
    const countriesPriority = this.prioriyCountries;

    countriesList.sort((a, b) => {
      const aPriority = countriesPriority.indexOf(a.alpha2Code as CountryCode);
      const bPriority = countriesPriority.indexOf(b.alpha2Code as CountryCode);
      // both in the list, lower index wins
      if (aPriority !== -1 && bPriority !== -1) {
        return aPriority - bPriority;
      }
      // only a is in the list, a wins
      if (aPriority !== -1) {
        return -1;
      }
      // only b is in the list, b wins
      if (bPriority !== -1) {
        return 1;
      }

      // both not in the list, sort by name
      return a.name.localeCompare(b.name);
    });
    return countriesList;
  }
}
