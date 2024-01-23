import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterFacade } from '@ocean/client/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.scss']
})
export class MenuComponentComponent implements OnInit, OnDestroy {
  currentUrl: string;

  links = [
    {
      icon: ' ',
      title: 'Terms of Service',
      route: ROUTES.link('USER_AGREEMENT')
    },
    {
      icon: '',
      title: 'Privacy Policy',
      route: ROUTES.link('PRIVACY_POLICY')
    },
    {
      icon: '',
      title: 'Cookie Policy',
      route: ROUTES.link('COOKIE_POLICY')
    },
    {
      icon: '',
      title: 'Data Protection Policy',
      route: ROUTES.link('PROTECTION_POLICY')
    },
    {
      icon: '',
      title: 'Proprietary Rights',
      route: ROUTES.link('PROPRIETARY_RIGHTS')
    },
    {
      icon: ' ',
      title: 'Software License Agreement',
      route: ROUTES.link('LICENSE_AGREEMENT')
    }
  ];

  constructor(private store: RouterFacade) { }

  ngOnInit() {
    this.store.url$
      .pipe(untilDestroyed(this))
      .subscribe(url => (this.currentUrl = url));
  }

  ngOnDestroy() { }
}
