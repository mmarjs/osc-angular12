import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boats-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class BoatsWidgetComponent implements OnInit {
  @Input() isTableOnly = false;
  constructor() {}

  ngOnInit() {}
}
