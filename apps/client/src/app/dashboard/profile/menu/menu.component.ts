import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterFacade } from '@ocean/client/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  currentUrl: string;

  links = [
    {
      icon: 'person',
      title: 'PROFILE.TITLE',
      route: ROUTES.link('PROFILE')
    },
    {
      icon: 'build',
      title: 'PROFILE.SERVICES',
      route: ROUTES.link('SERVICES')
    },
    {
      icon: 'edit',
      title: 'PROFILE.EDIT_PROFILE',
      route: ROUTES.link('PROFILE_EDIT')
    },
    {
      icon: 'lock',
      title: 'PROFILE.CHANGE_PASSWORD',
      route: ROUTES.link('PROFILE_PASSWORD')
    }
    // {
    //   icon: 'star_rate',
    //   title: 'View Ratings',
    //   route: ROUTES.link('PROFILE_RATINGS')
    // }
  ];

  constructor(private store: RouterFacade) { }

  ngOnInit() {
    this.store.url$
      .pipe(untilDestroyed(this))
      .subscribe(url => (this.currentUrl = url));
  }

  ngOnDestroy() { }
}
