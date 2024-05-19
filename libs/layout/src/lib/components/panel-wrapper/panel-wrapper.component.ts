import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'layout-panel-wrapper',
  templateUrl: './panel-wrapper.component.html',
  styleUrls: ['./panel-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PanelWrapperComponent implements OnInit {
  @Input() panelTitle: string;
  @Input() description: string;
  @Input() fontSet: string;
  @Input() icon: string;
  @Input() asIcon: string;

  constructor() {}

  ngOnInit() {}
}
