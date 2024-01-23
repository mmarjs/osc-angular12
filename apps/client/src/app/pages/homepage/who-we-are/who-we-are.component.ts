import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-page-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WhoWeAreComponent implements OnInit, OnDestroy {
  loggedIn: boolean;

  constructor(private router: Router, private user: UserFacade) {
    this.user.loggedIn$
      .pipe(untilDestroyed(this))
      .subscribe(loggedIn => (this.loggedIn = loggedIn));
  }

  ngOnInit() {}

  ngOnDestroy() {}

  getStarted() {
    if (this.loggedIn) {
      // redirect to add auction
      this.router.navigate([ROUTES.link('DASHBOARD')]);
    } else {
      // go to signup
      this.router.navigate([ROUTES.link('SIGNUP')]);
    }
  }
}
