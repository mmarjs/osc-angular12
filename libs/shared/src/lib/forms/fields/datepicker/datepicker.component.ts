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
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { isRequired } from '@ocean/shared/utils/form';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
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
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  @ViewChild(MatInput, { static: true }) _input: MatInput;
  @Output() dateValueChanged: EventEmitter<Date> = new EventEmitter();
  @Input() formControlName: string;
  @Input() contextId: string;
  @Input() hintLabel: string;
  @Input() errorMsg: string;
  @Input() datepickerOptions: any;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() dateValue: Date;
  @Input() displayLabelSuffix = true;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this._control.disable() : this._control.enable();
  }
  _disabled = false;

  @Input()
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = coerceBooleanProperty(value);
  }
  _required: boolean;

  get value() {
    return this.dateValue;
  }

  set value(val) {
    this.dateValue = val;
    this.propagateChange(this.dateValue);
  }

  @Input()
  get readonly() {
    return this._readonly;
  }
  set readonly(value) {
    this._readonly = coerceBooleanProperty(value);
  }
  _readonly: boolean;

  startDate = new Date();
  _control: AbstractControl | undefined;

  get getErrorMsg() {
    if (this._control.hasError('matDatepickerParse')) {
      return 'FORMS.ERRORS.INVALID_DATE';
    } else if (this._control.hasError('matDatepickerMin')) {
      return 'FORMS.ERRORS.DATE_SET_AFTER_THE_CURRENT_DATE';
    } else if (this._control.hasError('required')) {
      return 'FORMS.LABELS.REQUIRED';
    } else if (this.errorMsg) {
      return this.errorMsg;
    }
  }

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private parent: ControlContainer,
  ) {}

  ngOnInit(): void {
    if (this.formControlName) {
      const parent = this.parent.control as AbstractControl;
      this._control = parent.get(this.formControlName);
      this._required = this._required || isRequired(this._control);
    }
  }

  private updateErrorState() {
    if (this._control) {
      this._input.errorState = this._control.invalid;
      this._input.stateChanges.next();
    }
  }

  propagateChange = (data: any) => {};
  propagateTouch = () => {};

  onChange(value) {
    let thisMoment: moment.Moment = moment(value);
    if (thisMoment.isValid()) {
      this.value = value;
      this.startDate = value;
      this.propagateChange(this.value);
      this.dateValueChanged.emit(this.value);
    }
  }

  /**
   * Control Value Accessor Methods
   */
  writeValue(value): void {
    if (value) {
      this.value = value ? value : this._control.value;
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

}
