import {
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  getUserType,
  getUserTypes,
  Shipyard,
  UserInputDTO,
  UserType,
  UserTypeTitles,
} from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { BINDFORM_TOKEN, FormUtils } from '@ocean/shared';
import {
  nameValidator,
  passwordValidator,
  usernameValidator,
} from '@ocean/shared/utils';
import { map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { TipProperties } from '@ocean/shared/forms/directives/app-tip/shared';

@Component({
  selector: 'app-page-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BINDFORM_TOKEN,
      useExisting: forwardRef(() => SignupComponent),
    },
  ],
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  userTypes = getUserTypes();
  userTypeTitles = UserTypeTitles;

  readonly usernameTips: TipProperties = {
    title: 'TOOLTIP.USERNAME.TITLE',
    tip: 'TOOLTIP.USERNAME.CONDITIONS',
  };

  get roleSelected() {
    return this.form.get('userTypes').value;
  }

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserFacade
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      firstName: ['', [Validators.required, nameValidator]],
      lastName: ['', [Validators.required, nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, usernameValidator]],
      password: ['', [Validators.required, passwordValidator]],
      userTypes: [
        [getUserType(UserTypeTitles.BOAT_OWNER)],
        Validators.required,
      ],
    });

    this.route.params
      .pipe(
        map((params) => getUserType(params.role as UserTypeTitles)),
        untilDestroyed(this)
      )
      .subscribe((params) => {
        if (params) {
          this.form.get('userTypes').setValue([params]);
        }
      });
  }

  ngOnDestroy() {
    return;
  }

  onSubmit(event?: Shipyard) {
    if (!this.form.valid) {
      FormUtils.markAsTouched(this.form);
      return;
    }

    switch (this.roleSelected[0].type) {
      case this.userTypeTitles.BOAT_OWNER:
        this.user.signup(Object.assign({}, this.form.value));
        break;
      case this.userTypeTitles.SHIPYARD:
      case this.userTypeTitles.SURVEYOR:
        this.user.signup(
          Object.assign({}, this.form.value, event, {
            phoneNo: this.replaceSpaces(event?.phone),
            cell: this.replaceSpaces(event?.phone),
            country: event?.country?.alpha3Code,
          })
        );
        break;
      default:
        return;
    }
  }

  compareWith(option: UserType[], selected: UserType[]) {
    return option?.[0]?.id === selected?.[0]?.id;
  }

  private replaceSpaces(value?: string) {
    return value?.replace(/\s/g, '') ?? '';
  }
}
