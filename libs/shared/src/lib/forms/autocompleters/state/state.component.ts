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
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { DataSourceItem } from '@ocean/material';
import { FormUtils } from '@ocean/shared/utils';
import { find, result } from 'lodash-es';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { STATES } from './state.data';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-autocompleter-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StateAutocompleterComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => StateAutocompleterComponent),
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
export class StateAutocompleterComponent
  implements ControlValueAccessor, OnInit
{
  @Input() formControlName: string;
  @Input() contextId: string;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() tooltip: string;

  @Output() change = new EventEmitter<string | null>();

  @ViewChild(MatAutocompleteTrigger, { static: true })
  trigger: MatAutocompleteTrigger;

  _control: AbstractControl | undefined;
  _input: FormControl;
  hasSelected = false;
  items: Array<DataSourceItem> = [];
  value: string | null = null;

  readonly iconType = IconType;

  /**
   * Status Controls
   */
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this._input.disable() : this._input.enable();
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

  @Input()
  set row(value: any) {
    this._row = coerceBooleanProperty(value);
  }
  @HostBinding('class.layout-row')
  _row: boolean;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private parent: ControlContainer
  ) {}

  ngOnInit() {
    this.items = STATES.map((state) => ({
      value: state.abbr,
      title: state.name,
    }));

    // setup the current control
    if (this.parent) {
      const parent = this.parent.control as AbstractControl;
      this._control = parent.get(this.formControlName);
      this._required = this._required || FormUtils.isRequired(this._control);
    }

    // setup the autocompleter input
    this._input = new FormControl();
    this._input.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query) => {
        typeof query === 'string' && query !== ''
          ? this.fetch(query)
          : this.trigger.closePanel();
      });
  }

  propagateChange = (data: any) => {};
  propagateTouch = () => {};

  onChange(value: string | null) {
    this.value = value;
    this.hasSelected = !!value;
    this.propagateChange(this.value);
    this.change.emit(this.value);
  }

  /**
   * Control Value Accessor Methods
   */
  writeValue(value: string): void {
    if (value === null || value === '') {
      this.reset();
    } else if (typeof value === 'string' && this.value !== value) {
      this.value = value;
      this.hasSelected = true;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: FormControl) {
    if (!this._disabled) {
      if (this._required && !c.value) {
        return { required: true };
      }
    }
    return null;
  }

  /**
   * Custom Methods
   */
  onFocusOut() {
    // if (this._input.value === '') {
    //   this.onChange(this.value);
    // }
  }

  displayFn(value: any): string {
    return value
      ? value.title
        ? value.title
        : result(find(this.items, { value }), 'title', '')
      : this.value
      ? result(find(this.items, { value: this.value }), 'title', '')
      : '';
  }

  reset(query?: string) {
    this.value = null;
    this.hasSelected = false;
    this._input.setValue('');
    this.items = [];
    if (query) {
      this.fetch(query);
    }
  }

  fetch(query: string): void {
    this.items = STATES.filter((state) =>
      state.name.toLowerCase().includes(query.toLowerCase())
    ).map((state) => ({
      value: state.abbr,
      title: state.name,
    }));

    if (this.items.length) {
      this.trigger.openPanel();
    } else {
      this.trigger.closePanel();
    }
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    const item: DataSourceItem = event.option.value;
    this.onChange(item.value);
  }

  onRemove() {
    this._input.setValue('');
    this.onChange(null);
  }
}
