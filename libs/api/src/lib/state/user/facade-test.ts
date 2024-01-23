import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { UserTypeTitle } from '@ocean/api/shared';

@Injectable()
export class UserTestFacade {
  loggedIn$ = new Subject();
  token$ = new Subject();
  userType$ = new Subject();
  // data
  user$ = new Subject();
  id$ = new Subject();
  name$ = new Subject();

  // actions
  loginSuccess$ = new Subject();
  loginError$ = new Subject();

  constructor() {}

  signup(request: any) {}

  login() {}

  logout() {}

  switchAccount(type: UserTypeTitle) {}
}
