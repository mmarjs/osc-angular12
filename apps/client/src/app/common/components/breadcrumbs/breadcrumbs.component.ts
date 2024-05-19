import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppBreadcrumb, ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { RouterFacade } from '../../../state/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  @HostBinding('attr.aria-hidden') ariaHidden = false;

  paths: Array<AppBreadcrumb> = [];

  constructor(private router: RouterFacade) { }

  ngOnInit() {
    this.router.state$.pipe(untilDestroyed(this)).subscribe(state => {
      this.paths = ROUTES.breadcrumbs(state.route, state.params).filter(p => p.text);
    });
  }

  ngOnDestroy() { }
}
