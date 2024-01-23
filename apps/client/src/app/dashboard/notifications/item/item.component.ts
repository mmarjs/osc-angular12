import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-notifications-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsItemComponent implements OnInit {
  @Input() notification: any;

  @HostBinding('class.mat-list-base')
  materialOverride = true;

  @HostBinding('class.dense')
  @Input()
  dense = false;

  @HostBinding('class.active')
  @Input()
  active = false;

  constructor() {}

  ngOnInit() {}

  @HostListener('click')
  onClick() {
    this.active = !this.active;
    // TODO mark as read
  }
}
