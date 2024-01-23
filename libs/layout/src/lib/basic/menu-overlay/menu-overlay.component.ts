import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'layout-basic-menu-overlay',
  templateUrl: './menu-overlay.component.html',
  styleUrls: ['./menu-overlay.component.scss']
})
export class MenuOverlayComponent implements OnInit, OnDestroy {
  @Output()
  close = new EventEmitter();
  loggedIn: boolean;
  userRole$: Observable<string> = this.user.userType$;
  userRoles = UserTypeTitles;

  constructor(private router: Router, private user: UserFacade) {
    this.user.loggedIn$
      .pipe(untilDestroyed(this))
      .subscribe(loggedIn => (this.loggedIn = loggedIn));
  }

  ngOnInit() { }

  ngOnDestroy() { }

  goTo(name: string) {
    this.router.navigate([ROUTES.link(name)]);
    this.close.emit();
  }

  getStarted() {
    if (this.loggedIn) {
      // redirect to add auction
      this.router.navigate([ROUTES.link('DASHBOARD')]);
    } else {
      // go to signup
      this.router.navigate([ROUTES.link('SIGNUP')]);
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
