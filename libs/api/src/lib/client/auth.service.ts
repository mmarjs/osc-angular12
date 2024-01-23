import { Inject, Injectable } from '@angular/core';
import { API_ENVIRONMENT, ApiEnvironment } from '@ocean/api/shared';
import { NotifierService } from '@ocean/shared/services';
import { Auth0DecodedHash, WebAuth } from 'auth0-js';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

/**
 * Auth0 promise wrapper
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0: WebAuth;
  email: string;
  verified: boolean;
  expiresAt: number;

  constructor(
    @Inject(API_ENVIRONMENT) private environment: ApiEnvironment,
    private notifier: NotifierService,
    private cookiesService: NgcCookieConsentService
  ) {
    this.auth0 = new WebAuth(environment.auth);
  }

  /**
   * Session check on user.init$
   */
  getAccessToken(): Promise<Auth0DecodedHash> {
    return this.checkSignup().then(() =>
      this.parseHash().catch(() => this.checkSession())
    );
  }

  checkSignup(): Promise<void> {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(location.search);
      // shows the incoming message from AUth0
      if (params.get('supportSignUp')) {
        this.notifier.success(params.get('message'), 'OK', 20000);
        // location.search = '';
      } else if (params.get('email')) {
        this.notifier.info(params.get('message'), 'OK', 20000);
      }
      resolve();
    });
  }

  /**
   * Hash handling
   */
  parseHash() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, res: Auth0DecodedHash) => {
        // console.log('parseHash', err, res);
        if (res && res.accessToken && res.idToken) {
          // window.location.hash = '';
          this._saveInfo(res);
          resolve(res);
        } else {
          if (err && err.errorDescription) {
            this.notifier.error(err.errorDescription, 'OK', 10000);
          }
          reject();
        }
      });
    });
  }

  /**
   * Check for existing session
   */
  checkSession(): Promise<Auth0DecodedHash> {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, res: Auth0DecodedHash) => {
        if (res?.accessToken) {
          this._saveInfo(res);
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * Auth0 profile info
   */
  getUserInfo(res: Auth0DecodedHash) {
    return new Promise((resolve, reject) => {
      // use access token to retrieve user's profile and set session
      this.auth0.client.userInfo(res.accessToken, (err, profile) => {
        profile ? resolve(profile) : reject(err);
      });
    });
  }

  /**
   * Auth0 change-password trigger
   */
  changePassword(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.auth0.changePassword(
        {
          email: this.email,
          connection: this.environment.connection
        },
        (err, res) => {
          res ? resolve(res) : reject(err);
        }
      );
    });
  }

  /**
   * UI utilities
   */
  doLogin() {
    this.auth0.authorize({
      // redirectUri: this.environment.auth.redirectUri
    });
  }

  isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < this.expiresAt;
  }

  doLogout() {
    // remove the expiry time
    this.expiresAt = 0;
    this._clearSession();

    this.auth0.logout({
      returnTo: this.environment.webURL
    });
  }

  async reauth() {
    try {
      await this.checkSession();
    } catch (_) {
      this.expiresAt = 0;
      this._clearSession();

      this.auth0.logout({});

      this.auth0.authorize();
    }
  }

  /**
   * Private utils
   */
  private _saveInfo(res: Auth0DecodedHash) {
    this.email = res.idTokenPayload.email;
    this.verified = res.idTokenPayload.email_verified;
    this.expiresAt = res.idTokenPayload.exp * 1000;
    // console.log(this.expiresAt, this.expiresAt > Date.now());
  }

  private _clearSession(): void {
    this.cookiesService.clearStatus();
    document.cookie = '';
    localStorage.clear();
    sessionStorage.clear();
  }
}
