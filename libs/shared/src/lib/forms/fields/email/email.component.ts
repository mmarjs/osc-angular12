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
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { FormUtils } from '@ocean/shared/utils';

@Component({
  selector: 'app-field-email',
  templateUrl: './email.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailFieldComponent),
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
export class EmailFieldComponent implements ControlValueAccessor, OnInit {
  @Input() formControlName: string;
  @Input() contextId: string;
  @Input() errorMsg: string;
  @Input() hintLabel: string;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() maxLength = 100;

  @Output() change = new EventEmitter<string>();

  @ViewChild(MatInput, { static: true }) _input: MatInput;

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
    if (this._control) {
      this._disabled ? this._control.disable() : this._control.enable();
    }
  }
  _disabled = false;

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

  get getErrorMsg() {
    if (this._control.hasError('required')) {
      return 'This field is required';
    } else if (this._control.hasError('maxLength')) {
      return `Must have a maximum of ${this.maxLength} characters.`;
    } else if (this._control.hasError('invalid')) {
      return 'Please provide a valid email address';
    } else if (this.errorMsg) {
      return this.errorMsg;
    } else if (this._control.errors.message) {
      return this._control.errors.message;
    }
  }

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private parent: ControlContainer
  ) {}

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

  propagateChange = (data: any) => {};
  propagateTouch = () => {};

  onChange(value: string) {
    this.value = value;
    this.propagateChange(this.value);
    this.change.emit(this.value);
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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: FormControl) {
    if (!this._disabled) {
      if (this._required && !c.value) {
        return { required: true };
      }
      if (c.value) {
        if (this.maxLength && c.value.length > this.maxLength) {
          return { maxLength: true };
        }

        const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        return regex.test(String(c.value)) ? null : { invalid: true };
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
