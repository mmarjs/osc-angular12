import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiEnvironment } from '@ocean/api/shared';
import extractDomain from 'extract-domain';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { ROUTES } from './routing';

@NgModule({
  imports: []
})
export class CookieModule {
  constructor(
    @Optional()
    @SkipSelf()
    parent: CookieModule
  ) {
    if (parent) {
      throw new Error('CookieModule is already loaded.');
    }
  }

  static forRoot(environment: ApiEnvironment) {
    return [
      NgcCookieConsentModule.forRoot({
        cookie: {
          domain: extractDomain(environment.webURL)
        },
        palette: {
          popup: {
            background: '#484848',
            text: '#dddddd',
            link: '#cccccc'
          },
          button: {
            background: '#dddddd',
            text: '#484848'
          }
        },
        theme: 'classic',
        position: 'bottom',
        revokable: false,
        autoOpen: true,
        type: 'info',
        elements: {
          messagelink: `
    <span id="cookieconsent:desc" class="cc-message">
      {{message}}

      <a aria-label="Learn more about Cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank">
        {{cookiePolicyLink}}
      </a>,
      <a aria-label="Learn more about our Privacy Policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">
        {{privacyPolicyLink}}
      </a> and our
      <a aria-label="Learn more about our Terms of Service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank">
        {{tosLink}}
      </a>
    </span>
    `
        },
        content: {
          message: 'By using our site, you acknowledge that you have read and understand our ',

          cookiePolicyLink: 'Cookie Policy',
          cookiePolicyHref: environment.webURL + ROUTES.get('COOKIE_POLICY'),

          privacyPolicyLink: 'Privacy Policy',
          privacyPolicyHref: environment.webURL + ROUTES.get('PRIVACY_POLICY'),

          tosLink: 'Terms of Service',
          tosHref: environment.webURL + ROUTES.get('USER_AGREEMENT'),

          policy: ''
        }
      })
    ];
  }
}
