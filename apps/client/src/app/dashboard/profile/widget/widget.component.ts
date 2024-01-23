import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class ProfileWidgetComponent implements OnInit, OnDestroy {
  user: User;

  constructor(private store: UserFacade) {}

  ngOnInit() {
    this.store.user$
      .pipe(untilDestroyed(this))
      .subscribe(user => (this.user = user));
  }

  ngOnDestroy() {}
}
