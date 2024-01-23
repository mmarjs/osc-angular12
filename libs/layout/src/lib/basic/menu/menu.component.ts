import { Component, OnDestroy } from '@angular/core';
import { UserFacade } from '@ocean/api/state';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'layout-basic-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  userName: string;

  constructor(private user: UserFacade) {
    this.user.name$
      .pipe(untilDestroyed(this))
      .subscribe(userName => (this.userName = userName));
  }

  ngOnDestroy() { }

  doLogin() {
    this.user.login();
  }
}
