import {
  Component,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-notifications-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsItemComponent {
  @Input() notification: any;

  @HostBinding('class.mat-list-base')
  materialOverride = true;

  @HostBinding('class.dense')
  @Input()
  dense = false;

  @HostBinding('class.active')
  @Input()
  active = false;

  readonly iconType = IconType;

  @HostListener('click')
  onClick() {
    this.active = !this.active;
  }
}
