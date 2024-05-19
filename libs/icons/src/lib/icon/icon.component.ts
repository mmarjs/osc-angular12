import { Component, Input, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { iconType } from '../enums/icon-type.enum';

@Component({
  selector: 'ocean-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  private _tooltip?: string;

  @Input()
  iconType?: iconType;

  /*
   * [as]sociation
   * To hide tooltip use as=""
   * To associate icon as other icon for tooltip use as="ICON-NAME"
   * <ocean-icon as="REJECT" [iconType]="iconType.DELETE"> will be transformed for tooltip as TOOLTIP.REJECT (see i18 json)
   * By default, if no association provided tooltip will get the text based on icon type
   */
  @Input() set as(icon: string) {
    this._tooltip = this.toTooltipText(icon);
  }

  get tooltip() {
    return this._tooltip as iconType;
  }

  @Input()
  classes?: string[];
  @Input()
  fontSet = 'far';
  @Input()
  fontIcon?: string;
  @Input()
  tooltipHideDelay = 100;
  @Input()
  tooltipPosition: TooltipPosition = 'below';

  ngOnInit() {
    if (typeof this._tooltip !== 'string') {
      this._tooltip = this.toTooltipText(this.iconType);
    }
  }

  private toTooltipText(icon?: string) {
    return icon?.length ? `TOOLTIP.${icon?.toUpperCase()}` : '';
  }
}
