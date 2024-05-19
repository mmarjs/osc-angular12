import { Component, ViewEncapsulation } from '@angular/core';
import { PATHS } from '@ocean/shared';
import { Location } from '@angular/common';

@Component({
  selector: 'layout-basic-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
// tslint:disable-next-line:component-class-suffix
export class BasicLayout {
  shouldHideLayout?: boolean;

  constructor(private readonly location: Location) {
    this.location.onUrlChange(this.onLocationChange.bind(this));
    this.onLocationChange(location.path());
  }

  private onLocationChange(url: string) {
    this.shouldHideLayout =
      url.includes(PATHS.DOCUMENT_SIGNED) ||
      url.includes(PATHS.DOCUMENT_DECLINED);
  }

  onActivate(event: Event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
