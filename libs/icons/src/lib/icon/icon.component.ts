import { Component, Input } from '@angular/core';
import { iconType } from '../enums/icon-type.enum';

@Component({
  selector: 'ocean-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input()
  iconType!: iconType;
  @Input()
  classes!: string[];
  @Input()
  fontSet = 'far';
  @Input()
  fontIcon!: string;
}
