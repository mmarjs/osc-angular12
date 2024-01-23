import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_EXPANSION_PANEL_DEFAULT_OPTIONS } from '@angular/material/expansion';

@Component({
  selector: 'app-page-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
      useValue: {
        collapsedHeight: '72px'
      }
    }
  ]
})
export class FaqComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
