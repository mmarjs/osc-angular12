import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';

import {
  NgcCookieConsentService,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(
    iconRegistry: MatIconRegistry,
    private cookie: NgcCookieConsentService,
    public translate: TranslateService
  ) {
    // register font-awesome iconSets
    iconRegistry.registerFontClassAlias('fa');
    iconRegistry.registerFontClassAlias('fab');
    iconRegistry.registerFontClassAlias('fal');
    iconRegistry.registerFontClassAlias('far');
    iconRegistry.registerFontClassAlias('fas');
  }

  ngOnInit() {
    this.cookie.statusChange$
      .pipe(untilDestroyed(this))
      .subscribe((event: NgcStatusChangeEvent) => {
        console.log(event);
      });
  }

  ngOnDestroy() {}
}
