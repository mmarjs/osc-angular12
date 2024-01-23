import { BasicLayout } from './body/body.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuOverlayComponent } from './menu-overlay/menu-overlay.component';
import { MenuComponent } from './menu/menu.component';
import { NavtopComponent } from './navtop/navtop.component';

export const BasicComponents = [
  BasicLayout,
  FooterComponent,
  HeaderComponent,
  MenuComponent,
  MenuOverlayComponent,
  NavtopComponent
];

export const BasicEntryComponents = [MenuOverlayComponent];

export const BasicExports = [BasicLayout];

export { BasicLayout };
