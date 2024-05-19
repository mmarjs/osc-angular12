import {
  ComponentFactoryResolver,
  Directive,
  HostListener,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { AppTipComponent } from './app-tip.component';
import { TipProperties } from './shared';

@Directive({
  selector: '[appTip]',
})
export class AppTipDirective {
  @Input('appTip')
  readonly properties?: TipProperties;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener('mouseenter')
  hover() {
    this.viewContainerRef.clear();

    const ref = this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(AppTipComponent)
    );
    ref.instance.properties = this.properties;
  }

  @HostListener('mouseleave')
  leave() {
    this.viewContainerRef.clear();
  }
}
