import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { User, UserPatchDTO } from '@ocean/api/shared';
import { FormBuilderService } from '@ocean/libs/form-builder';
import {
  defaultPersonalInformationObj,
  personalInformationFields,
  UserPersonalInformationAsObject,
} from '@ocean/forms-config';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ChangeData } from 'ngx-intl-tel-input';

const EMAIL: keyof UserPersonalInformationAsObject = 'email';
const PHONE: keyof UserPersonalInformationAsObject = 'phone';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInformationComponent implements OnDestroy {
  @Output()
  readonly patch = new EventEmitter<UserPatchDTO>();

  @Input()
  readonly isUpdating: boolean;

  @Input()
  set user(user: User) {
    this.form.patchValue(this.normalizePersonalInformation(user));
  }

  readonly fields = personalInformationFields;
  readonly form = this.formBuilderService.buildReactiveForm(this.fields);

  private personalInformation = defaultPersonalInformationObj;

  disabled = true;

  constructor(private readonly formBuilderService: FormBuilderService) {
    this.form.get(EMAIL)?.disable();

    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((current) => {
      this.disabled = Object.keys(this.personalInformation).every(
        (key: keyof UserPersonalInformationAsObject) => {
          switch (key) {
            case EMAIL:
              return true;
            case PHONE:
              return typeof current[key] === 'object'
                ? this.personalInformation[key] === current[key]?.number
                : this.personalInformation[key] === current[key];
            default:
              return this.personalInformation[key] === current[key];
          }
        }
      );
    });
  }

  submit() {
    this.patch.emit(this.normalizeOutput(this.form.value));
  }

  normalizePersonalInformation(user: User) {
    this.form.get(PHONE)?.markAsUntouched();

    const { firstName, lastName, email, phoneNo: phone } = user;
    this.personalInformation = { firstName, lastName, email, phone };
    return this.personalInformation;
  }

  normalizeOutput(output: UserPersonalInformationAsObject) {
    const { phone, ...rest } = output;
    return {
      ...rest,
      phoneNumber:
        typeof phone === 'string'
          ? phone
          : (phone as ChangeData)?.internationalNumber,
    };
  }

  ngOnDestroy() {
    return;
  }
}
