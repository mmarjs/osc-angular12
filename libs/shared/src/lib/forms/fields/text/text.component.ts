import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  forwardRef,
  Host,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { LocalizationService } from '@ocean/internationalization';
import { FormUtils } from '@ocean/shared/utils';
import { BOAT_LENGTH_ERROR_NAME } from '@ocean/shared/utils/boat-length-validator';
import { DUPLICATE_ERROR_NAME } from '@ocean/shared/utils/duplicate-validator';
import { TEXT_ERROR_NAME } from '@ocean/shared/utils/text-validator';
import { ADDRESS_ERROR_NAME } from '@ocean/shared/utils/address-validator';
import { WEB_URL_ERROR_NAME } from '@ocean/shared/utils/web-url-validator';
import { HULL_ID_ERROR_NAME } from '@ocean/shared/utils/hull-id-validator';

interface ErrorMsg {
  translation: string;
  params: Object;
}

@Component({
  selector: 'app-field-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextFieldComponent),
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
export class TextFieldComponent implements ControlValueAccessor, OnInit {
  @Input() formControlName: string;
  @Input() numberOnly = false;
  @Input() contextId: string;
  @Input() defValue: string;
  @Input() errorMsg: string;
  @Input() hintLabel: string;
  @Input() noTailingSpace: boolean;
  @Input() type = 'text';
  @Input() showDollar: boolean = false;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() min: number;
  @Output() change = new EventEmitter<string>();
  @Input() hideArrowsForNumber: boolean = true;

  @ViewChild(MatInput, {static: true}) _input: MatInput;

  _control: AbstractControl | undefined;
  value = '';

  /**
   * Status Controls
   */
  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this._control.disable() : this._control.enable();
  }

  _disabled: boolean;

  @Input()
  get focus() {
    return this._focus;
  }

  set focus(value: boolean) {
    this._focus = coerceBooleanProperty(value);
  }

  _focus = false;

  @Input()
  get readonly() {
    return this._readonly;
  }

  set readonly(value) {
    this._readonly = coerceBooleanProperty(value);
  }

  _readonly: boolean;

  @Input()
  get required() {
    return this._required;
  }

  set required(value) {
    this._required = coerceBooleanProperty(value);
  }

  _required: boolean;

  @Input()
  set row(value: any) {
    this._row = coerceBooleanProperty(value);
  }

  @HostBinding('class.layout-row')
  _row: boolean;

  get getErrorMsg(): string {
    const errorCode = Object.keys(this._control?.errors ?? {})?.[0];

    switch (errorCode) {
      case 'min':
        if (this.numberOnly) {
          return this.localizationSerice.translate('FORMS.ERRORS.SHOULD_NOT_LESS_THAN', {
            value: this._control.errors.min.min
          });
        }

        return this.localizationSerice.translate('FORMS.ERRORS.MUST_HAVE_MAXIMUM__OF', {
          value: this.minLength
        });
      case 'max':
        if (this.numberOnly) {
          return this.localizationSerice.translate('FORMS.ERRORS.SHOULD_NOT_GREATER_THAN', {
            value: this._control.errors.max.max
          });
        }

        return this.localizationSerice.translate('FORMS.ERRORS.MUST_HAVE_MAXIMUM__OF', {
          value: this.minLength
        });
      case 'maxlength':
        return this.localizationSerice.translate('FORMS.ERRORS.MUST_HAVE_MAXIMUM__OF', {
          value: this._control.errors.maxlength.requiredLength
        });
      case 'invalidCountryZip':
        return this.localizationSerice.translate('FORMS.LABELS.INVALID_ZIP_FOR_COUNTRY', {
          countryCode: this._control.errors.invalidCountryZip
        });
      case 'required':
        return this.localizationSerice.translate('FORMS.LABELS.REQUIRED');
      case 'pattern':
        return this.localizationSerice.translate('FORMS.ERRORS.INVALID_PATTERN');
      case DUPLICATE_ERROR_NAME:
        return this.localizationSerice.translate('FORMS.ERRORS.DUPLICATE');
      case BOAT_LENGTH_ERROR_NAME:
        return this.localizationSerice.translate('FORMS.ERRORS.INVALID_BOAT_LENGTH');
      case TEXT_ERROR_NAME:
        return this.localizationSerice.translate('FORMS.ERRORS.INVALID_TEXT_PATTERN');
      case ADDRESS_ERROR_NAME:
        return this.localizationSerice.translate('FORMS.ERRORS.INVALID_ADDRESS_PATTERN');
      case WEB_URL_ERROR_NAME:
        return this.localizationSerice.translate('FORMS.ERRORS.INVALID_WEB_URL_PATTERN');
      case HULL_ID_ERROR_NAME:
        return this.localizationSerice.translate('FORMS.ERRORS.INVALID_HULL_NUMBER');
      default:
        return this._control.errors?.message ?? this.errorMsg;
    }
  }

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private parent: ControlContainer,
    private localizationSerice: LocalizationService
  ) {
  }

  ngOnInit() {
    if (this.formControlName) {
      const parent = this.parent.control as AbstractControl;
      this._control = parent.get(this.formControlName);
      this._required = this._required || FormUtils.isRequired(this._control);
    }

    if (this._focus) {
      this._input.focus();
    }
  }

  propagateChange = (data: any) => {
  };
  propagateTouch = () => {
  };

  isErrorMsg(value: unknown): value is ErrorMsg {
    return typeof value === 'object';
  }

  onChange(value: string) {
    if (value === ' ') {
      return '';
    }

    this.value = value;
    this.propagateChange(this.value);
    this.change.emit(this.value);
    return value;
  }

  /**
   * Control Value Accessor Methods
   */
  writeValue(value: string): void {
    if (value) {
      this.value = value;
      this.onChange(value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = (data: any) => {
      fn(data);
      this.updateErrorState();
    };
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = () => {
      fn();
      this.updateErrorState();
    };
  }

  validate(c: FormControl) {
    if (!this._disabled) {
      if (this._required && !c.value) {
        return {required: true};
      }
      if (this.minLength && (c.value && c.value.length < this.minLength)) {
        return {min: true};
      }
      if (this.maxLength && (c.value && c.value.length > this.maxLength)) {
        return {max: true};
      }
      if (this.min && (c.value < this.min)) {
        return {minValue: true};
      }
    }
    return null;
  }

  private updateErrorState() {
    if (this._control) {
      this._input.errorState = this._control.invalid;
      this._input.stateChanges.next();
    }
  }
}
