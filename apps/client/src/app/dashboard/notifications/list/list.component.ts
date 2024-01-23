import { Component, Input, OnInit } from '@angular/core';
import { MOCK_NOTIFICATIONS } from './list.mock';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class NotificationsListComponent implements OnInit {
  notifications = MOCK_NOTIFICATIONS;

  @Input() limit: number;

  @Input()
  set dense(dense: any) {
    this._isDense = dense || dense === '';
  }
  _isDense = false;

  constructor() {}

  ngOnInit() {
    if (this.limit) {
      this.notifications = MOCK_NOTIFICATIONS.slice(0, this.limit);
    }
  }
}
