import { Component, forwardRef, Injector, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

function genereateStableAccessibilityId() {
  return Math.random().toString(36).substring(2, 9);
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() placeholder: string;

  disabled = false;
  onTouched: any = () => {};
  onChange: any = () => {};
  checked = false;

  id = genereateStableAccessibilityId();

  required: boolean;

  constructor(private injector: Injector) {}

  ngAfterViewInit() {
    const ngControl = this.injector.get(NgControl);
    requestAnimationFrame(() => {
      // is form control has required validator
      this.required = ngControl.control.validator?.({} as any)?.required ?? false;
    });
  }

  writeValue(obj: any): void {
    this.checked = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onModelChange({checked}: MatCheckboxChange) {
    this.checked = checked;
    this.onChange(checked);
  }

  propagateTouch() {
    this.onTouched();
  }
}
