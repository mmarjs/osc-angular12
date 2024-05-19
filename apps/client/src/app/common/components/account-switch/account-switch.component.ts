import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getUserTypes, UserTypeTitle } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-account-switch',
  templateUrl: './account-switch.component.html',
  styleUrls: ['./account-switch.component.scss'],
})
export class AccountSwitchComponent {
  readonly iconType = IconType;
  readonly userTypes = getUserTypes(false);

  constructor(
    public readonly userFacade: UserFacade,
    private readonly router: Router
  ) {}

  doSwitchAccount(type: UserTypeTitle): void {
    this.userFacade.switchAccount(type);
    void this.router.navigate([ROUTES.link('SERVICES')]);
  }
}
