import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilderEntries, FormFieldsService } from '@ocean/libs/form-builder';
import { boatFields, BoatFieldsType, getBoatFieldsForType } from '@ocean/forms-config';

type Fields = typeof boatFields;

@Component({
  selector: 'app-boat-signup',
  templateUrl: './boat-signup.component.html',
  styleUrls: ['./boat-signup.component.scss'],
})
export class BoatSignupComponent implements OnInit {
  @Input() isParentValid: boolean;

  @Output() formValue = new EventEmitter();

  readonly description: FormBuilderEntries<Fields> | undefined;
  readonly location: FormBuilderEntries<Fields> | undefined;

  constructor(private readonly fieldsService: FormFieldsService<Fields>) {
    this.fieldsService.init(boatFields);

    const [description, location] = getBoatFieldsForType(this.fieldsService, BoatFieldsType.SIGN_UP);

    this.description = this.fieldsService.entries(description);
    this.location = this.fieldsService.entries(location);
  }

  ngOnInit(): void {
    this.fieldsService.validateWhenCountryChanged(
      this.location?.form?.get('country'),
      this.location?.form?.get('zipCode'),
    )?.subscribe();
  }

  onSubmit() {
    this.formValue.emit({
      ...this.description?.form?.value,
      ...this.location?.form?.value,
    });
  }
}
