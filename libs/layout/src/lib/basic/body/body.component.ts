import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'layout-basic-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
// tslint:disable-next-line:component-class-suffix
export class BasicLayout implements OnInit {
  constructor() {}

  ngOnInit() {}
  onActivate(event:Event) {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 }
}
