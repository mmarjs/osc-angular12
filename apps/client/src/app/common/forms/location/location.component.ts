import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '@ocean/shared';

@Component({
  selector: 'app-form-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'form-group',
    '[class.mat-form-field-readonly]': '_readonly'
  }
})
export class FormLocationComponent implements OnInit {
  @Input() form: FormGroup;

  @Input()
  get readonly() {
    return this._readonly;
  }
  set readonly(value) {
    this._readonly = coerceBooleanProperty(value);
  }
  _readonly: boolean;

  @Input()
  set row(value: any) {
    this._row = coerceBooleanProperty(value);
  }
  @HostBinding('class.layout-row')
  _row: boolean;

  get zipCodeCtrl(): AbstractControl {
    return this.form.get('zipCode');
  }
  get stateCtrl(): AbstractControl {
    return this.form.get('state');
  }
  get cityCtrl(): AbstractControl {
    return this.form.get('city');
  }

  // get showZipCode(): boolean {
  //   const countryCtrlValue = this.form.get('country').value;
  //   return FormUtils.validateZipCtrlByCountry(countryCtrlValue, this.form.get('zipCode'));
  // }

  constructor() { }

  ngOnInit() {
    this.zipCodeCtrl.setValidators([Validators.pattern("^[0-9]*$"),Validators.required]);
    this._readonly && this.zipCodeCtrl.disable();
   }
}
