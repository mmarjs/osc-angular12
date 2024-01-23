import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'layout-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @HostBinding('class') className: string;

  // attached to the .app-notification-{type} styles
  @Input()
  set type(value: 'success' | 'info' | 'warning' | 'error') {
    this.className = `app-notification-${value}`;
  }

  constructor() {}

  ngOnInit() {}
}
