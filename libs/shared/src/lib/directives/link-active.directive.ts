import {
  AfterContentInit,
  ContentChildren,
  Directive,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LinkDirective, LinkHrefDirective } from './link.directive';

@Directive({
  selector: '[appLinkActive]',
  exportAs: 'appLinkActive'
})
export class LinkActiveDirective
  implements AfterContentInit, DoCheck, OnChanges, OnDestroy {
  @ContentChildren(LinkDirective, { descendants: true })
  links: QueryList<LinkDirective>;

  @ContentChildren(LinkHrefDirective, { descendants: true })
  linksWithHrefs: QueryList<LinkHrefDirective>;

  private active = false;
  private classes: string[] = [];
  private initialized = false;
  private subscription: Subscription;

  @Input() appLinkActiveOptions: { exact: boolean } = { exact: false };

  @Input()
  set appLinkActive(data: string[] | string) {
    const classes = Array.isArray(data) ? data : data.split(' ');
    this.classes = classes.filter(c => !!c);
  }

  constructor(
    private router: Router,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    this.subscription = this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        this.update();
      }
    });
  }

  ngAfterContentInit(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.links.changes.subscribe(_ => this.update());
    this.linksWithHrefs.changes.subscribe(_ => this.update());
    this.update();
  }

  ngDoCheck() {
    if (!this.initialized && this.links) {
      this.ngAfterContentInit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private update(): void {
    if (!this.links || !this.linksWithHrefs || !this.router.navigated) {
      return;
    }
    const hasActiveLinks = this.hasActiveLinks();

    // react only when status has changed to prevent unnecessary dom updates
    if (this.active !== hasActiveLinks) {
      this.classes.forEach(c => {
        if (hasActiveLinks) {
          this.renderer.addClass(this.element.nativeElement, c);
        } else {
          this.renderer.removeClass(this.element.nativeElement, c);
        }
      });
      Promise.resolve(hasActiveLinks).then(active => (this.active = active));
    }
  }

  private isLinkActive(
    router: Router
  ): (link: LinkDirective | LinkHrefDirective) => boolean {
    return (link: LinkDirective | LinkHrefDirective) =>
      router.isActive(link.urlTree, this.appLinkActiveOptions.exact);
  }

  private hasActiveLinks(): boolean {
    return (
      this.links.some(this.isLinkActive(this.router)) ||
      this.linksWithHrefs.some(this.isLinkActive(this.router))
    );
  }

  get isActive(): boolean {
    return this.active;
  }
}
