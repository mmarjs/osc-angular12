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
  QueryList,
  SkipSelf,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { FormUtils } from '@ocean/shared/utils';
import { filter } from 'rxjs/operators';
import { IconType } from '@ocean/icons';
import { TipProperties } from '@ocean/shared/forms/directives/app-tip/shared';

@Component({
  selector: 'app-field-password-confirm',
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordConfirmFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordConfirmFieldComponent),
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
  },
})
export class PasswordConfirmFieldComponent
  implements ControlValueAccessor, OnInit
{
  form: FormGroup;
  hidePassword1 = true;
  hidePassword2 = true;

  @Input() formControlName: string;
  @Input() contextId: string;
  @Input() label: string;
  @Input() minLength = 8;
  @Input() maxLength = 30;

  @Output() change = new EventEmitter<string>();

  @ViewChildren(MatInput) _inputs: QueryList<MatInput>;

  _control: AbstractControl | undefined;

  readonly iconType = IconType;

  readonly passwordTips: TipProperties = {
    title: 'TOOLTIP.PASSWORD.TITLE',
    tip: 'TOOLTIP.PASSWORD.CONDITIONS',
  };

  /**
   * Status Controls
   */
  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.form.disable() : this.form.enable();
  }

  _disabled = false;

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

  get getErrorMsg() {
    if (this._control.hasError('required')) {
      return 'This field is required';
    } else if (this._control.hasError('minLength')) {
      return `Password needs at least ${this.minLength} characters.`;
    } else if (this._control.hasError('maxLength')) {
      return `Password must have a maximum of ${this.maxLength} characters.`;
    } else if (this._control.hasError('mismatch')) {
      return `Please make sure your passwords match.`;
    } else if (this._control.errors.message) {
      return this._control.errors.message;
    }
  }

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private parent: ControlContainer,
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.formControlName) {
      const parent = this.parent.control as AbstractControl;
      this._control = parent.get(this.formControlName);
      this._required = this._required || FormUtils.isRequired(this._control);

      // once the control gets valid
      // this component needs to update its fields validity
      this._control.statusChanges
        .pipe(filter((status) => status === 'VALID'))
        .subscribe(() => FormUtils.updateValidity(this.form));
    }

    this.form = this.builder.group({
      password: '',
      confirm: '',
    });

    this.form.valueChanges.subscribe(() => this.onChange());

    // add the validators after the form is built
    const validators = [];
    if (this._required) {
      validators.push(Validators.required);
    }
    if (this.minLength) {
      validators.push(Validators.minLength(this.minLength));
    }
    if (this.maxLength) {
      validators.push(Validators.maxLength(this.maxLength));
    }
    // to properly bind this validator
    validators.push(this.validate.bind(this));

    this.form.get('password').setValidators(validators);
    this.form.get('confirm').setValidators(validators);
  }

  propagateChange = (data: any) => {};
  propagateTouch = () => {};

  onChange() {
    const value = (this.form.get('password') as FormControl).value;
    this.propagateChange(value);
    this.change.emit(value);
  }

  /**
   * Control Value Accessor Methods
   */
  writeValue(value: string): void {
    // do nothing
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
      const password = (this.form.get('password') as FormControl).value;
      const confirm = (this.form.get('confirm') as FormControl).value;

      if (this.minLength && password.length < this.minLength) {
        return { minLength: true };
      } else if (this.maxLength && password.length > this.maxLength) {
        return { maxLength: true };
      } else if (password && password !== confirm) {
        return { mismatch: true };
      }
    }
    return null;
  }

  private updateErrorState() {
    if (this._control) {
      this._inputs.forEach((input) => {
        input.errorState = this._control.invalid;
        input.stateChanges.next();
      });
    }
  }
}
