import { EventEmitter } from '@angular/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { of } from 'rxjs';

export const translateServiceMock = {
  currentLang: 'en',
  onLangChange: new EventEmitter<LangChangeEvent>(),
  instant: (v) => v,
  get: of,
  onTranslationChange: new EventEmitter(),
  onDefaultLangChange: new EventEmitter(),
};
