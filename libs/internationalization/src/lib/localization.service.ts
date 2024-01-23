import { EventEmitter, Injectable, Optional, SkipSelf } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Locale } from '..';
import { LocalizationServiceConfig } from './localization-config.service';
import { LocalStorageService } from '@ocean/storage';

@Injectable()
export class LocalizationService {
  private _localeId = Locale.EN; // default

  /**
   * @constructor
   * @param {LocalizationService} singleton - the localization service
   * @param {LocalizationServiceConfig} config - the localization config
   * @param {TranslateService} translateService - the translate service
   */
  constructor(
    @Optional() @SkipSelf() private singleton: LocalizationService,
    private config: LocalizationServiceConfig,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    if (this.singleton) {
      throw new Error(
        'LocalizationService is already provided by the root module'
      );
    }
    this.translateService.addLangs(Object.values(Locale));
    this._localeId = this.config.locale_id;
  }

  /**
   * Initialize the language.
   * @returns {Observable<void>}
   */
  public initLanguage(): Observable<void> {
    this._localeId = this.localStorageService.getItem('language') as Locale || Locale.EN;
    return this.useLanguage(this._localeId);
  }

  /**
   * change the selected language
   * @returns {Observable<void>}
   */
  public useLanguage(lang: string): Observable<void> {
    this.translateService.setDefaultLang(lang);
    return this.translateService
      .use(lang)
      .pipe(
        catchError(() => throwError(() => 'LocalizationService.init failed'))
      );
  }

  /**
   * Gets the instant translated value of a key (or an array of keys).
   * @param key
   * @param interpolateParams
   * @returns {string|any}
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public translate(key: string | string[], interpolateParams?: Object): string {
    return this.translateService.instant(key, interpolateParams) as string;
  }

  public getLangs(): string[] {
    return this.translateService.getLangs();
  }

  public getCurrentLang(): string {
    return this.translateService.currentLang;
  }

  public onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }
}
