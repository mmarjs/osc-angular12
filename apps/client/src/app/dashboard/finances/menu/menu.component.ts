import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterFacade } from '@ocean/client/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-finances-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class FinancesMenuComponent implements OnInit, OnDestroy {
  currentUrl: string;

  links = [
    {
      icon: 'swap_horizontal_circle',
      title: 'Transfer Funds',
      route: ROUTES.link('FINANCES_TRANSFER')
    },
    {
      icon: 'monetization_on',
      title: 'Bank  Information',
      route: ROUTES.link('FINANCES_BANK')
    },
    {
      icon: 'check_circle',
      title: 'View Transactions',
      route: ROUTES.link('FINANCES_TRANSACTIONS')
    }
  ];

  constructor(private store: RouterFacade) {}

  ngOnInit() {
    this.store.url$
      .pipe(untilDestroyed(this))
      .subscribe(url => (this.currentUrl = url));
  }

  ngOnDestroy() {}
}
