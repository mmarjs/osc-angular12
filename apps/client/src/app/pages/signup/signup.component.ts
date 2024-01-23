import {
  Component,
  forwardRef,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getUserType, getUserTypes, UserType, UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { BINDFORM_TOKEN, FormUtils } from '@ocean/shared';
import { nameValidator, usernameValidator } from '@ocean/shared/utils';
import { get } from 'lodash-es';
import { passwordValidator } from '@ocean/shared/utils';

@Component({
  selector: 'app-page-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BINDFORM_TOKEN,
      useExisting: forwardRef(() => SignupComponent)
    }
  ]
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  userTypes = getUserTypes();
  userTypeTitles = UserTypeTitles;
  get roleSelected() {
    return this.form.get('userTypes').value;
  }

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserFacade,
  ) {
  }

  ngOnInit() {
    // checks the param ;role=boatowner
    const userType = getUserType(this.route.snapshot.paramMap.get('role'));

    this.form = this.builder.group({
      firstName: ['', [Validators.required, nameValidator]],
      lastName: ['', [Validators.required, nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, usernameValidator]],
      password: ['', [Validators.required, passwordValidator]],
      userTypes: [[{ "id": 1, "type": "BOAT_OWNER" }], Validators.required],
    });
  }
  onSubmit(event) {
    let formValue;
    if (this.form.valid) {
      if (this.roleSelected[0].type === this.userTypeTitles.BOAT_OWNER) {
        formValue = Object.assign({}, this.form.value, { boatDetails: { ...event, country: event.country.alpha3Code } })
      } else if (this.roleSelected[0].type === this.userTypeTitles.SHIPYARD) {
        formValue = Object.assign({}, this.form.value, { shipyardDetails: { ...event, phone: event.phone.internationalNumber } })
      } else {
        formValue = Object.assign({}, this.form.value, event)
      }
      this.user.signup(formValue);
    } else {
      FormUtils.markAsTouched(this.form);
    }
  }


  compareWith(option: UserType[], selected: UserType[]) {
    return get(option, '0.id') === get(selected, '0.id');
  }
}
