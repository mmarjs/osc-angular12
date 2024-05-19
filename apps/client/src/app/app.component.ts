import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { ProgressIndicatorFacade } from '@ocean/client/state/progress-indicator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly isRequestProcessing = this.progressIndicatorFacade.getStatus$;

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly progressIndicatorFacade: ProgressIndicatorFacade,
    public readonly translate: TranslateService,
  ) {
    this.iconRegistry.registerFontClassAlias('fa');
    this.iconRegistry.registerFontClassAlias('fab');
    this.iconRegistry.registerFontClassAlias('fal');
    this.iconRegistry.registerFontClassAlias('far');
    this.iconRegistry.registerFontClassAlias('fas');
  }
}
