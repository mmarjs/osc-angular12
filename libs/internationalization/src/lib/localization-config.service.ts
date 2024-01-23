import { Injectable } from '@angular/core';
import { Locale } from '..';

/**
 * Class representing the localization config
 */
@Injectable()
export class LocalizationServiceConfig {
  public locale_id = Locale.EN;
}
