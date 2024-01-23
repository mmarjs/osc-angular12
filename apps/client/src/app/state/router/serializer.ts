import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateUrl } from './state';

export class RouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    const paths = [];

    while (route.firstChild) {
      paths.push(route.routeConfig ? route.routeConfig.path : '');
      route = route.firstChild;
    }
    paths.push(route.routeConfig ? route.routeConfig.path : '');
    const path = '/' + paths.filter(Boolean).join('/');

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { route: path, url, params, queryParams };
  }
}
