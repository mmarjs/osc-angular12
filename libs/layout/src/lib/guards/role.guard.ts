import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserFacade } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private userFacade: UserFacade) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isAccessAllowed(route.data.roles);
  }

  private isAccessAllowed(roles) {
    return this.userFacade.userType$.pipe(
      map((role: string) => {
        if (!roles.includes(role)) {
          this.router.navigate([ROUTES.link('DASHBOARD')]);
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
