import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UserFacade } from '@ocean/api/state';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-page-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HowItWorksComponent implements OnInit, OnDestroy {
  loggedIn: boolean;

  constructor(private user: UserFacade) {
    this.user.loggedIn$
      .pipe(untilDestroyed(this))
      .subscribe(loggedIn => (this.loggedIn = loggedIn));
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
