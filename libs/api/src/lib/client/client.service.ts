import { HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_ENVIRONMENT, ApiEnvironment, ApiError } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { PATHS } from '@ocean/shared';
import { NotifierService } from '@ocean/shared/services';
import { Auth0DecodedHash } from 'auth0-js';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, tap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Axios } from './axios';
import { ProgressIndicatorFacade } from '@ocean/client/state/progress-indicator';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private TOKENLESS_URLS: string[];
  baseURL: string;
  webURL: string;
  token: Partial<Auth0DecodedHash>;

  constructor(
    @Inject(API_ENVIRONMENT) private readonly environment: ApiEnvironment,
    private readonly user: UserFacade,
    private readonly notifier: NotifierService,
    private readonly progressIndicatorFacade: ProgressIndicatorFacade
  ) {
    this.baseURL = environment.api.baseURL;
    this.webURL = environment.webURL;
    this.TOKENLESS_URLS = [
      PATHS.SIGNUP,
      PATHS.LEGAL,
      PATHS.FAQ,
      PATHS.CALLBACK,
    ];
    this.user.token$.subscribe((token) => {
      this.token = token;
    });
  }

  request<T = any>(options: AxiosRequestConfig): Observable<T> {
    this.progressIndicatorFacade.setLoadingStatus(true);

    const baseURL = this.baseURL;
    const headers = this.token
      ? {
        Authorization: `${this.token.tokenType} ${this.token.accessToken}`,
      }
      : {};

    return Axios.request({
      ...options,
      baseURL,
      headers: {
        ...headers,
        ...options.headers,
      },
    }).pipe(
      tap({
        next: () => this.progressIndicatorFacade.setLoadingStatus(false),
        error: () => this.progressIndicatorFacade.setLoadingStatus(false),
      }),
      map((res: AxiosResponse) => {
        switch (res.status) {
          // TODO test all the statuses
          case 201:
            if (res.headers.location) {
              const [id] = res.headers.location.split('/').reverse();
              return {
                id,
              };
            }
            return {
              id: res.data?.id,
              ...res.data ?? {},
            };
          case 204:
            return;
          default:
            try {
              if (typeof res.data === 'string') {
                res.data = res.data === '' ? {} : JSON.parse(res.data);
              }
              return res.data;
            } catch (e) {
              throw throwError(() => ({
                error: 'Unknown Error',
                message: e && e.message,
              }));
            }
        }
      }),
      catchError((err: AxiosError) => {
        if (err?.response?.data) {
          if (
            err.response.status === HttpStatusCode.Unauthorized &&
            !this.TOKENLESS_URLS.some((url) => window.location.href.includes(url)) &&
            this.webURL + '/' !== window.location.href
          ) {
            this.user.reauth();
          }
          this.notifier.error((err?.response?.data as any)?.message);

          return throwError(() => err.response.data as ApiError);
        } else if (err.request) {
          this.notifier.error(err);

          return throwError(() => ({
            error: 'No Response',
            message: err.message,
          }));
        }

        this.notifier.error(err);

        return throwError(() => ({
          error: 'Unknown Error',
          message: err.message,
        }));
      })
    );
  }
}
