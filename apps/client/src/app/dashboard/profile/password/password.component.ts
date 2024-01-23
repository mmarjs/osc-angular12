import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@ocean/api/client';
import { LocalizationService } from '@ocean/internationalization';
import { NotifierService } from '@ocean/shared/services';

@Component({
  selector: 'app-profile-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePasswordComponent implements OnInit {
  response: string;
  error: string;

  constructor(
    private auth: AuthService,
    private notifier: NotifierService,
    private localization: LocalizationService
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.auth
      .changePassword()
      .then(() => {
        this.response = this.localization.translate('PROFILE.RESET_PASSWORD.EMAIL_SENT_INFO');
        this.notifier.success(this.response, this.localization.translate('COMMON.BUTTONS.OK'), 3000);
      })
      .catch(err => (this.error = err) &&
        this.notifier.error(this.error, this.localization.translate('COMMON.BUTTONS.OK'), 3000)
      );
  }
}
