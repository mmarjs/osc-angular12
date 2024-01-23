import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User, UserPatchDTO } from '@ocean/api/shared';
import { CustomValidator } from '../../../../../../../libs/shared/src/lib/utils/nospace-validator';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInformationComponent {
  @Output() controlSubmittedValue: EventEmitter<UserPatchDTO> =
    new EventEmitter();
  @Output() updateAvatar = new EventEmitter<File>();
  @Input() isUpdating: boolean;
  @Input()
  set user(value: User) {
    this.firstNameCtrl.patchValue(value.firstName);
    this.lastNameCtrl.patchValue(value.lastName);
    this.emailCtrl.patchValue(value.email);
    this.phoneCtrl.patchValue(value.phoneNo);
  }

  firstNameCtrl = new FormControl(
    { value: '', disabled: true },
    {
      validators: [Validators.required, Validators.maxLength(50), CustomValidator.noWhiteSpace,Validators.pattern("^[a-zA-Z ]*$")],
      // updateOn: 'submit',
    }
  );

  lastNameCtrl = new FormControl(
    { value: '', disabled: true },
    {
      validators: [Validators.required, Validators.maxLength(50),Validators.pattern("^[a-zA-Z ]*$")],
      // updateOn: 'submit',
    }
  );

  emailCtrl = new FormControl(
    { value: '', disabled: true },
    {
      validators: [Validators.required, Validators.email],
      updateOn: 'submit',
    }
  );

  phoneCtrl = new FormControl(
    { value: '', disabled: true },
    {
      validators: [Validators.required],
      // updateOn: 'submit'
    }
  );

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      files: this.formBuilder.array([]),
    });
  }

  controlSubmitted(data: UserPatchDTO) {
    this.controlSubmittedValue.emit(data);
  }

}
