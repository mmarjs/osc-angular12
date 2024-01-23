import { Params } from '@angular/router';
import { Dictionary } from '@ocean/shared';
import { isFunction } from 'util';
import { OutletRoutes, PrimaryRoutes } from './routes.interface';

export interface AppBreadcrumb {
  key: string;
  text: string;
  route: Array<any>;
}

export class AppRouteDefinitions {
  // defined data
  private _DATA: Dictionary<any> = {};
  // breadcrumbs texts
  private _NAV: Dictionary<string> = {};
  // app links
  private _LINKS: Dictionary<string | Function> = {};
  // router paths
  private _PATHS: Dictionary<string> = {};
  // key => route mapping
  private _ROUTES: Dictionary<string> = {};

  constructor(
    routes: OutletRoutes | PrimaryRoutes,
    PATHS: Dictionary<string> = {},
    DATA: Dictionary<any> = {}
  ) {
    this.parse(routes, '', PATHS, DATA);
  }

  /**
   * Public API
   */

  // Routes
  exists(key: string) {
    return this._ROUTES.hasOwnProperty(key);
  }

  get(key: string) {
    if (!this.exists(key)) {
      throw new Error(`Route '${key}' not found`);
    }
    return this._ROUTES[key];
  }

  // Links
  link(key: string, params: Dictionary<any> = {}) {
    if (!this.exists(key)) {
      throw new Error(`Link '${key}' not found`);
    }
    return isFunction(this._LINKS[key])
      ? (this._LINKS[key] as Function)(params)
      : this._LINKS[key];
  }

  isFn(key: string) {
    if (!this.exists(key)) {
      throw new Error(`Link '${key}' not found`);
    }
    return isFunction(this._LINKS[key]);
  }

  // Paths
  path(key: string) {
    if (!this._PATHS.hasOwnProperty(key)) {
      throw new Error(`Path '${key}' not found`);
    }
    return this._PATHS[key];
  }

  // Route data merged with the definition
  data(key: string, data?: Dictionary<any>): Dictionary<any> {
    if (!this._LINKS.hasOwnProperty(key)) {
      throw new Error(`Route '${key}' not found`);
    }
    // merge the existing data with the input
    return { ...this._DATA[key], ...data };
  }

  // Array of breadcrumb items
  breadcrumbs(route: string, params: Params): Array<AppBreadcrumb> {
    // incremental path
    let current = '';
    // remove leading and trailing slashes
    return route
      .replace(/^\/|\/$/g, '')
      .split('/')
      .map(v => {
        current = this.join('/', current, v);
        const key = this.findKey(this._ROUTES, r => r === this.abs(current));
        return {
          key,
          text: this._NAV[key],
          route: isFunction(this._LINKS[key]) ? [key, params] : [key]
        };
      });
  }

  /**
   * Recursive routes parser
   */
  private parse(
    routes: OutletRoutes | PrimaryRoutes,
    path: string,
    PATHS: Dictionary<string>,
    DATA: Dictionary<any>
  ) {
    for (const route of routes) {
      // validation
      if (this._LINKS[route.key]) {
        throw new Error(`Repeated route key '${route.key}' found`);
      }

      // path key and value
      const key = route.key;
      const value = this.join('/', path, route.path);
      let fn: any;

      if (route.hasOwnProperty('data')) {
        // module routes
        this._DATA[key] = DATA[key] = route['data'];
        this._NAV[key] = route.hasOwnProperty('breadcrumb')
          ? route['breadcrumb']
          : route['data']['title'];
      }

      // route with parameters
      if (value.match(/:([^\/]*)/g)) {
        fn = (params: Dictionary<any>) =>
          this.abs(
            value.replace(/:([^\/]*)/g, (v, k) => {
              return params[k];
            })
          );
      }

      this._PATHS[key] = PATHS[key] = route.path;
      this._ROUTES[key] = this.abs(value);
      this._LINKS[key] = fn || this.abs(value);

      if (route.children) {
        this.parse(route.children, value, PATHS, DATA);
      }
    }
  }

  private join(sepparator: string, ...args: Array<string>) {
    return args.filter(Boolean).join(sepparator);
  }

  private findKey<T>(
    object: Dictionary<T>,
    predicate: (v: T, k: string, obj: Dictionary<T>) => boolean
  ) {
    let result: string;
    if (!object) {
      return result;
    }
    Object.keys(object).some(key => {
      const value = object[key];
      if (predicate(value, key, object)) {
        result = key;
        return true;
      }
    });
    return result;
  }

  private abs(route: string) {
    return '/' + route;
  }
}
