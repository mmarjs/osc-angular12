import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'layout-basic-navtop',
  templateUrl: './navtop.component.html',
  styleUrls: ['./navtop.component.scss']
})
export class NavtopComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  userRole$: Observable<string> = this.user.userType$;
  userRoles = UserTypeTitles;
  constructor(private user: UserFacade) {
    this.user.loggedIn$
      .pipe(untilDestroyed(this))
      .subscribe(loggedIn => (this.loggedIn = loggedIn));
  }

  ngOnInit() { }

  ngOnDestroy() { }

  onLogout() {
    // TODO prompt for confirmation of only in the CanDeactivate guard?
    this.user.logout();
  }
}
