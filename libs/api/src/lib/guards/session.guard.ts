import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { SystemFacade, UserFacade } from '../state';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanLoad, CanActivate {
  constructor(
    private router: Router,
    private system: SystemFacade,
    private user: UserFacade
  ) {}

  canLoad(): Observable<boolean> {
    return this.system.loaded$.pipe(
      filter(Boolean),
      switchMap(() => this.user.loggedIn$),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/']);
        }
      }),
      first() // complete
    );
  }

  canActivate(): Observable<boolean> {
    // TODO redirect if false?
    return this.system.loaded$.pipe(
      filter(Boolean),
      switchMap(() => this.user.loggedIn$),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/']);
        }
      }),
      first() // complete
    );
  }
}
