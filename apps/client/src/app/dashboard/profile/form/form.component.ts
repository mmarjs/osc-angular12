import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserFacade } from '@ocean/api/state';
import { FormUtils } from '@ocean/shared';
import { nameValidator } from '@ocean/shared/utils';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-profile-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  readonly: boolean;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates];
  PhoneNumberFormat = PhoneNumberFormat;
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private store: UserFacade
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      firstName: ['', Validators.required, nameValidator],
      lastName: ['', Validators.required, nameValidator],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ''
    });

    this.route.data.pipe(untilDestroyed(this)).subscribe(data => {
      this.readonly = data.readonly;
    });

    this.store.user$.pipe(untilDestroyed(this)).subscribe(user =>
      this.form.patchValue({
        ...user,
        phoneNumber: user.phoneNo
      })
    );
  }

  ngOnDestroy() { }

  onSubmit() {
    if (this.form.valid) {
      this.store.update(this.form.value);
    } else {
      FormUtils.markAsTouched(this.form);
    }
  }
}
