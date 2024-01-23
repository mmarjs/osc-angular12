import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'layout-two-columns',
  templateUrl: './two-columns.component.html',
  styleUrls: ['./two-columns.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TwoColumnsComponent implements OnInit {
  @Input() width = 63;
  @Input() reverse = false;

  constructor() {}

  ngOnInit() {}
}
