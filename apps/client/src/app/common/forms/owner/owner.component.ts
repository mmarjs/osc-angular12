import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BINDFORM_TOKEN } from '@ocean/shared';

@Component({
  selector: 'app-form-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
  providers: [
    {
      provide: BINDFORM_TOKEN,
      useExisting: forwardRef(() => FormOwnerComponent)
    }
  ]
})
export class FormOwnerComponent implements OnInit {
  form: FormGroup;

  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.builder.group({
      name: ['', Validators.required],
      makeModelYear: ['', Validators.required],
      address: '',
      address2: '',
      city: '',
      state: 'FL',
      zipCode: '',
      about: ''
    });
  }
}
