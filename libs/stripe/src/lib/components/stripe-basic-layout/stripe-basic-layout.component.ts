import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { PATHS } from '@ocean/shared';
import { Router } from '@angular/router';
import { StripeProviderMethod } from '@ocean/api/services';
import { MatTabGroup } from '@angular/material/tabs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {
  StripeAccountValidationStatus,
  StripeValidation,
} from '../../helpers/stripe-account-validation';
import { StripeFacadeService } from '../../store/facade';
import { stripeRedirectWithStatus } from '../../helpers/stripe-redirect-with-status';
import { IconType } from '@ocean/icons';

const LINKS: string[] = [PATHS.STRIPE_MANAGEMENT, PATHS.CREATE_STRIPE_ACCOUNT];

@Component({
  selector: 'app-stripe-basic-layout',
  templateUrl: './stripe-basic-layout.component.html',
  styleUrls: ['./stripe-basic-layout.component.scss'],
})
export class StripeBasicLayoutComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('tabs', { static: true })
  private readonly tabs?: MatTabGroup;

  private readonly method?: StripeProviderMethod =
    this.router.getCurrentNavigation()?.extras?.state?.method;

  readonly iconType = IconType;
  readonly DASHBOARD_URL = `/${PATHS.DASHBOARD}`;

  readonly selectedIndex = LINKS.indexOf(
    this.location.path().replace(/\//, '')
  );

  readonly errors$ = this.stripeFacadeService.validationErrors$;

  readonly loading$ = this.stripeFacadeService.loading$;

  isManageDisabled = true;

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly stripeFacadeService: StripeFacadeService
  ) {}

  ngOnInit() {
    this.errors$
      .pipe(untilDestroyed(this))
      .subscribe((validation) => this.switchManageTab(validation));
  }

  ngAfterViewInit() {
    this.tabs?.selectedIndexChange
      ?.pipe(untilDestroyed(this))
      ?.subscribe((index) => this.navigate(index));
  }

  ngOnDestroy() {
    return;
  }

  private switchManageTab(validation?: StripeValidation) {
    this.isManageDisabled =
      typeof validation !== 'object' ||
      validation?.status !== StripeAccountValidationStatus.VALID ||
      typeof this.method !== 'string';
  }

  private navigate(index: number) {
    return stripeRedirectWithStatus(
      this.router,
      LINKS?.[index] ?? PATHS.CREATE_STRIPE_ACCOUNT,
      StripeProviderMethod.READ
    );
  }
}
