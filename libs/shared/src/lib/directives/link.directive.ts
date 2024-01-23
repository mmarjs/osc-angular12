/**
 * Fork implementation of the RouterLink directive
 * until Ivy comes out and we can add a layer between.
 */

import { LocationStrategy } from '@angular/common';
import {
  Attribute,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  UrlTree
} from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTES } from '../routing';

/**
 * Link Directive
 */

@Directive({
  selector: ':not(a):not(area)[appLink]',
  exportAs: 'routerLink'
})
export class LinkDirective {
  @Input() queryParams!: { [k: string]: any };
  @Input() fragment!: string;
  @Input() queryParamsHandling!: 'merge' | 'preserve' | '';
  @Input() preserveFragment!: boolean;
  @Input() skipLocationChange!: boolean;
  @Input() replaceUrl!: boolean;
  @Input() state?: { [k: string]: any };
  private commands: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Attribute('tabindex') tabIndex: string,
    renderer: Renderer2,
    el: ElementRef
  ) {
    if (tabIndex === null) {
      renderer.setAttribute(el.nativeElement, 'tabindex', '0');
    }
  }

  @Input()
  set appLink(commands: any[] | string) {
    this.commands = processParams(commands);
  }

  @HostListener('click')
  onClick(): boolean {
    const extras = {
      skipLocationChange: attrBoolValue(this.skipLocationChange),
      replaceUrl: attrBoolValue(this.replaceUrl)
    };
    this.router.navigateByUrl(this.urlTree, extras);
    return true;
  }

  get urlTree(): UrlTree {
    return this.router.createUrlTree(this.commands, {
      relativeTo: this.route,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: attrBoolValue(this.preserveFragment)
    });
  }
}

/**
 * Link with Href Directive
 */

@Directive({
  selector: 'a[appLink],area[appLink]',
  exportAs: 'routerLinkWithHref'
})
export class LinkHrefDirective implements OnChanges, OnDestroy {
  @HostBinding('attr.target') @Input() target!: string;
  @Input() queryParams!: { [k: string]: any };
  @Input() fragment!: string;
  @Input() queryParamsHandling!: 'merge' | 'preserve' | '';
  @Input() preserveFragment!: boolean;
  @Input() skipLocationChange!: boolean;
  @Input() replaceUrl!: boolean;
  @Input() state?: { [k: string]: any };
  private commands: any[] = [];
  private subscription: Subscription;

  // the url displayed on the anchor element.
  @HostBinding() href!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationStrategy: LocationStrategy
  ) {
    this.subscription = router.events.subscribe((s: RouterEvent) => {
      if (s instanceof NavigationEnd) {
        this.updateTargetUrlAndHref();
      }
    });
  }

  @Input()
  set appLink(commands: any[] | string) {
    this.commands = processParams(commands);
  }

  ngOnChanges(changes: {}): any {
    this.updateTargetUrlAndHref();
  }
  ngOnDestroy(): any {
    this.subscription.unsubscribe();
  }

  @HostListener('click', [
    '$event.button',
    '$event.ctrlKey',
    '$event.metaKey',
    '$event.shiftKey'
  ])
  onClick(
    button: number,
    ctrlKey: boolean,
    metaKey: boolean,
    shiftKey: boolean
  ): boolean {
    if (button !== 0 || ctrlKey || metaKey || shiftKey) {
      return true;
    }

    if (typeof this.target === 'string' && this.target !== '_self') {
      return true;
    }

    const extras = {
      skipLocationChange: attrBoolValue(this.skipLocationChange),
      replaceUrl: attrBoolValue(this.replaceUrl),
      state: this.state
    };
    this.router.navigateByUrl(this.urlTree, extras);
    return false;
  }

  private updateTargetUrlAndHref(): void {
    this.href = this.locationStrategy.prepareExternalUrl(
      this.router.serializeUrl(this.urlTree)
    );
  }

  get urlTree(): UrlTree {
    return this.router.createUrlTree(this.commands, {
      relativeTo: this.route,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: attrBoolValue(this.preserveFragment)
    });
  }
}

/**
 * Utils
 */

function attrBoolValue(s: any): boolean {
  return s === '' || !!s;
}

function processParams(commands: any[] | string) {
  if (!commands) {
    // no route data
    return [];
  } else if (typeof commands === 'string') {
    // single route
    return [ROUTES.link(commands)];
  }

  // array of commands
  const params = commands.slice();

  if (ROUTES.isFn(params[0])) {
    if (!params[1]) {
      throw new Error(`Route '${params[0]}' needs input parameters`);
    }
    params[0] = ROUTES.link(params[0], params[1]);
    params.splice(1, 1);
  } else if (ROUTES.exists(params[0])) {
    params[0] = ROUTES.link(params[0]);
  }

  return Array.isArray(params) ? params : [params];
}
