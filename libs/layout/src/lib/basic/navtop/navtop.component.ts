import { Component, Inject } from '@angular/core';
import { UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { scrollToHowItWorksSection } from '@ocean/layout/helpers/scroll-to-how-it-works-section';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-basic-navtop',
  templateUrl: './navtop.component.html',
  styleUrls: ['./navtop.component.scss'],
})
export class NavtopComponent {
  readonly userRole$: Observable<string> = this.user.userType$;
  readonly userRoles = UserTypeTitles;
  readonly scrollToHowItWorksSection = scrollToHowItWorksSection.bind(this);
  readonly loggedIn$ = this.user.loggedIn$;

  constructor(
    public readonly user: UserFacade,
    @Inject(DOCUMENT) private readonly document: Document,
    // used in scrollToHowItWorksSection binding
    private readonly router: Router
  ) {}

  onLogout() {
    this.user.logout();
  }
}
