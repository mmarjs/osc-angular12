import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterFacade } from '@ocean/client/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  readonly iconType = IconType;
  currentUrl: string;

  links = [
    {
      icon: IconType.PERSON,
      title: 'PROFILE.TITLE',
      route: ROUTES.link('PROFILE'),
    },
    {
      icon: IconType.BUILD,
      title: 'PROFILE.SERVICES',
      route: ROUTES.link('SERVICES'),
    },
    {
      icon: IconType.EDIT,
      title: 'PROFILE.EDIT_PROFILE',
      route: ROUTES.link('PROFILE_EDIT'),
    },
    {
      icon: IconType.LOCK,
      title: 'PROFILE.CHANGE_PASSWORD',
      route: ROUTES.link('PROFILE_PASSWORD'),
    },
  ];

  constructor(private readonly store: RouterFacade) {}

  ngOnInit() {
    this.store.url$
      .pipe(untilDestroyed(this))
      .subscribe((url) => (this.currentUrl = url));
  }

  ngOnDestroy() {
    return;
  }
}
