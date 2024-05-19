import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'layout-basic-menu-overlay',
  templateUrl: './menu-overlay.component.html',
  styleUrls: ['./menu-overlay.component.scss'],
})
export class MenuOverlayComponent implements OnDestroy {
  @Output() close = new EventEmitter();

  readonly userRoles = UserTypeTitles;
  readonly iconType = IconType;

  readonly userRole$: Observable<string> = this.user.userType$;

  loggedIn?: boolean;

  constructor(
    private readonly router: Router,
    private readonly user: UserFacade
  ) {
    this.user.loggedIn$
      .pipe(untilDestroyed(this))
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));
  }

  ngOnDestroy() {
    return;
  }

  goTo(name: string) {
    void this.router.navigate([ROUTES.link(name)]);
    this.close.emit();
  }

  getStarted() {
    if (this.loggedIn) {
      void this.router.navigate([ROUTES.link('DASHBOARD')]);
    } else {
      void this.router.navigate([ROUTES.link('SIGNUP')]);
    }
    this.close.emit();
  }

  doLogin() {
    this.user.login();
    this.close.emit();
  }

  onLogout() {
    this.user.logout();
    this.close.emit();
  }

  closeMenu() {
    this.close.emit();
  }
}
