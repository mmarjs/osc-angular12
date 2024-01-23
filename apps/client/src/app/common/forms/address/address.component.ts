import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'form-group',
    '[class.mat-form-field-readonly]': '_readonly'
  }
})
export class FormAddressComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() label: string;
  @Input() noTailingSpace:boolean;
  @Input() labelAddress2:string;
  @Input()
  get readonly() {
    return this._readonly;
  }
  set readonly(value) {
    this._readonly = coerceBooleanProperty(value);
  }
  _readonly: boolean;

  @Input()
  get row() {
    return this._row;
  }
  set row(value: any) {
    this._row = coerceBooleanProperty(value);
  }
  @HostBinding('class.layout-row')
  _row: boolean;

  constructor() {}

  ngOnInit() {}
}
