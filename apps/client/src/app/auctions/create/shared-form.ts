import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedCreateBoatForm {
  private _form: FormGroup | undefined;

  set form(value) {
    this._form = value;
  }

  get form(): FormGroup | undefined {
    return this._form;
  }
}
