import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PATHS } from '@ocean/shared';

@Injectable({
  providedIn: 'root',
})
export class StripeAccountMethodsGuard implements CanActivate {
  constructor(private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const [{methods}, {method}] = [route.data ?? {}, this.router.getCurrentNavigation()?.extras?.state ?? {}];

    return methods?.includes(method) ? true : this.router.parseUrl(`/${PATHS.DASHBOARD}`);
  }
}
