import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router
} from '@angular/router';
import { API_ENVIRONMENT, ApiEnvironment } from '@ocean/api/shared';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  defaultTitle = 'Ocean Service Center';
  link: HTMLLinkElement;

  constructor(
    @Inject(API_ENVIRONMENT) private environment: ApiEnvironment,
    @Inject(DOCUMENT) private document,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.createLink();

    // automatically update the title based on the route data
    this.updateSEO();
  }

  private createLink() {
    if (this.document.head) {
      this.link = this.document.createElement('link');
      this.link.setAttribute('rel', 'cannonical');
      this.document.head.appendChild(this.link);
    }
  }

  private updateSEO() {
    let url: string;

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap((event: NavigationEnd) => (url = event.url)),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        // update the cannonical link
        const urlTree = this.router.parseUrl(url);
        const uri = urlTree.root.children[PRIMARY_OUTLET]
          ? urlTree.root.children[PRIMARY_OUTLET].segments
              .map(v => v.path)
              .join('/')
          : '';

        this.link.setAttribute('href', this.environment.webURL + '/' + uri);

        // update the title if available, otherwise leave the default
        const title = event['title']
          ? event['title'] + ' - ' + this.defaultTitle
          : this.defaultTitle;

        return this.title.setTitle(title);
      });
  }
}
