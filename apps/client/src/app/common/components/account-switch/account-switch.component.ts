import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getUserTypes, UserTypeTitle } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';

@Component({
  selector: 'app-account-switch',
  templateUrl: './account-switch.component.html',
  styleUrls: ['./account-switch.component.scss']
})
export class AccountSwitchComponent {
  userTypes = getUserTypes(false);

  constructor(
    public userFacade: UserFacade,
    private router: Router
    ) {
  }

  doSwitchAccount(type: UserTypeTitle): void {
    this.userFacade.switchAccount(type);
    this.router.navigate([ROUTES.link('SERVICES')]);
  }
}
