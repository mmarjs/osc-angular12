import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterFacade } from '@ocean/client/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.scss'],
})
export class MenuComponentComponent implements OnInit, OnDestroy {
  currentUrl?: string;

  links = [
    {
      icon: IconType.LIST,
      as: 'POLICY_TERMS',
      title: 'POLICY.TERMS',
      route: ROUTES.link('USER_AGREEMENT'),
    },
    {
      icon: IconType.LOCK,
      as: 'POLICY_PRIVACY',
      title: 'POLICY.PRIVACY',
      route: ROUTES.link('PRIVACY_POLICY'),
    },
    {
      icon: IconType.COOKIE,
      as: 'POLICY_COOKIE',
      title: 'POLICY.COOKIE',
      route: ROUTES.link('COOKIE_POLICY'),
    },
    {
      icon: IconType.SHIELD,
      as: 'POLICY_DATA_PROTECTION',
      title: 'POLICY.DATA_PROTECTION',
      route: ROUTES.link('PROTECTION_POLICY'),
    },
    {
      icon: IconType.RECEIPT_LONG,
      as: 'POLICY_PROPRIETARY_RIGHTS',
      title: 'POLICY.PROPRIETARY_RIGHTS',
      route: ROUTES.link('PROPRIETARY_RIGHTS'),
    },
    {
      icon: IconType.WEBHOOK,
      as: 'POLICY_SOFTWARE',
      title: 'POLICY.SOFTWARE',
      route: ROUTES.link('LICENSE_AGREEMENT'),
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
