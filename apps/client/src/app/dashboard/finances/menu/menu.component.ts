import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterFacade } from '@ocean/client/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-finances-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class FinancesMenuComponent implements OnInit, OnDestroy {
  currentUrl: string;

  links = [
    {
      icon: IconType.SWAP_HORIZONTAL_CIRCLE,
      title: 'Transfer Funds',
      route: ROUTES.link('FINANCES_TRANSFER'),
    },
    {
      icon: IconType.MONETIZATION_ON,
      title: 'Bank  Information',
      route: ROUTES.link('FINANCES_BANK'),
    },
    {
      icon: IconType.CHECK_CIRCLE,
      title: 'View Transactions',
      route: ROUTES.link('FINANCES_TRANSACTIONS'),
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
