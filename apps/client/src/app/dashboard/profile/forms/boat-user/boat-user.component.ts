import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@ocean/api/shared';
import { LocalizationService } from '@ocean/internationalization';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { getValidBirthDateInterval } from '@ocean/shared/utils/getValidBirthDateInterval';

@Component({
  selector: 'app-boat-user',
  templateUrl: './boat-user.component.html',
  styleUrls: ['./boat-user.component.scss']
})
export class BoatUserComponent implements OnInit,OnChanges {
@Input() set user(value:User){
  this.form.patchValue(value);
}
  @Input() isDisabled: boolean = true;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates];
  searchCountryField = SearchCountryField;
  phoneNumberFormat = PhoneNumberFormat;

  readonly birthDateInterval = getValidBirthDateInterval();

  form = this.fb.group({
    address: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService), Validators.maxLength(100)]],
    cell: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    dob: ['', [CustomValidator.startWithSpaceValidator]],
    driverLicense: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    passportNumber: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    representativeName: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService),Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
    representativeContact: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
  })

  get cellCtrl() {
    return this.form.get('cell')
  }

  constructor(private fb:FormBuilder,private localizationService:LocalizationService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isDisabled ? this.form.disable() : this.form.enable();
  }

}
