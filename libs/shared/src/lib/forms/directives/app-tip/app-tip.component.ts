import { Component, Input } from '@angular/core';
import { TipProperties } from './shared';
import { LocalizationService } from '@ocean/internationalization';

@Component({
  templateUrl: 'app-tip.component.html',
  styleUrls: ['app-tip.component.scss'],
})
export class AppTipComponent {
  @Input()
  properties?: TipProperties;

  constructor(private readonly localizationService: LocalizationService) {}

  get isListOfTips() {
    return Array.isArray(
      this.localizationService.translate(this.properties?.tip)
    );
  }
}
