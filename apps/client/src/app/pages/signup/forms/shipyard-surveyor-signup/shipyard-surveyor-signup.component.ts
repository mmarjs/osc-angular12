import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shipyard, UserTypeTitle } from '@ocean/api/shared';
import { FormUtils } from '@ocean/shared';
import { addressValidator } from '@ocean/shared/utils/address-validator';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';
import { textValidator } from '@ocean/shared/utils/text-validator';
import { map } from 'rxjs';

@Component({
  selector: 'app-shipyard-surveyor-signup',
  templateUrl: './shipyard-surveyor-signup.component.html',
  styleUrls: ['./shipyard-surveyor-signup.component.scss'],
})
export class ShipyardSurveyorSignupComponent {
  @Input() role: UserTypeTitle;
  @Input() isParentValid: boolean;
  @Output() formValue = new EventEmitter<Shipyard>();

  step1: FormGroup = this.builder.group({
    name: [
      '',
      [
        Validators.required,
        CustomValidator.startWithSpaceValidator,
        CustomValidator.dontAllowOnlyZeros(),
      ],
    ],
    country: ['', Validators.required],
    phone: [
      '',
      [
        Validators.required,
        CustomValidator.startWithSpaceValidator,
        CustomValidator.dontAllowOnlyZeros(),
      ],
    ],
    businessEmail: [
      '',
      [
        Validators.required,
        CustomValidator.noWhiteSpace,
        CustomValidator.dontAllowOnlyZeros(),
      ],
    ],
    website: [
      '',
      [
        CustomValidator.startWithSpaceValidator,
        CustomValidator.dontAllowOnlyZeros(),
        CustomValidator.noWhiteSpace,
      ],
    ],
  });

  step2: FormGroup = this.builder.group({
    address: ['', [addressValidator]],
    address2: ['', [addressValidator]],
    city: ['', [Validators.required, textValidator]],
    state: ['', [Validators.required, textValidator]],
    zipCode: ['', [Validators.required, FormUtils.zipCodeValidator]],
  });

  countryAlpha2Code$ = this.countryCtrl.valueChanges.pipe(
    map((country) => country?.alpha2Code?.toLowerCase())
  );

  get countryCtrl() {
    return this.step1.get('country');
  }
  get phoneCtrl() {
    return this.step1.get('phone');
  }

  constructor(private builder: FormBuilder) {}

  onSubmit() {
    this.formValue.emit({
      ...this.step1.value,
      ...this.step2.value,
      phone: this.step1.value.phone.internationalNumber,
    });
  }
}
