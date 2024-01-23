import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuOverlayComponent } from '../menu-overlay/menu-overlay.component';
import { RouterFacade } from '@ocean/client/state';
import { Observable, map } from 'rxjs';
import { PATHS } from '@ocean/shared';
import { UserFacade } from '@ocean/api/state';

@Component({
  selector: 'layout-basic-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  overlayRef: OverlayRef;
  isSignup$: Observable<boolean> = this.routerFacade.url$.pipe(map(url => url.includes(PATHS.SIGNUP)));
  userName$: Observable<string> = this.user.name$;

  constructor(private overlay: Overlay, private user: UserFacade, private routerFacade: RouterFacade) { }

  ngOnInit() { }

  ngOnDestroy() { }

  showNav() {
    const positionStrategy = this.overlay.position().global();
    const overlayConfig = {
      width: '100vw',
      height: '100vh',
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    };

    this.overlayRef = this.overlay.create(overlayConfig);
    const menuPortal = new ComponentPortal(MenuOverlayComponent);
    const compRef = this.overlayRef.attach(menuPortal);
    compRef.instance.close.subscribe(() => this.overlayRef.dispose());
  }

  doLogin() {
    this.user.login();
  }
}
