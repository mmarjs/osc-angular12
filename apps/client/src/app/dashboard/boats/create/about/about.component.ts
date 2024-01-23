import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-boats-create-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class BoatsCreateAboutComponent implements OnInit {
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form.get('about').setValidators([Validators.required, this.noWhitespaceValidator]);
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
