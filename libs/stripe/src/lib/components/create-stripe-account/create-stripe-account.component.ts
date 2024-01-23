import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { Country } from '@angular-material-extensions/select-country';
import { BehaviorSubject, catchError, distinctUntilChanged, EMPTY, tap } from 'rxjs';
import { take } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormBuilderService } from '@ocean/libs/form-builder';
import { StripeProvider, StripeProviderMethod } from '@ocean/api/services';
import { createStripeAccount, StripeAccount } from '@ocean/api/shared';
import { FormUtils, PATHS } from '@ocean/shared';
import { LocalizationService } from '@ocean/internationalization';
import { NotifierService } from '@ocean/shared/services';
import { getCountryAdministrativeUnits, ISO } from '@ocean/shared/utils/iso-mapper';
import { CountryISO } from 'ngx-intl-tel-input';
import { createFields } from './form-fields';

const lastSSN4Validators = [
  Validators.required,
  Validators.minLength(4),
  Validators.maxLength(9)
];

@Component({
  selector: 'app-create-stripe-account',
  templateUrl: './create-stripe-account.component.html',
  styleUrls: ['./create-stripe-account.component.scss']
})
export class CreateStripeAccountComponent implements OnInit, OnDestroy {
  private method: StripeProviderMethod | undefined = this.router.getCurrentNavigation()?.extras?.state?.method;
  private readonly stripeAccountDetail: StripeAccount | undefined = this.activatedRoute?.snapshot?.data?.stripeAccountDetail;
  readonly isLoading$ = new BehaviorSubject<boolean>(false);

  readonly fields = createFields(this.localizationService, lastSSN4Validators);
  readonly form = this.formBuilderService.buildReactiveForm(this.fields);
  constructor(
    private readonly stripeProvider: StripeProvider,
    private readonly formBuilderService: FormBuilderService,
    private readonly localizationService: LocalizationService,
    private readonly notifierService: NotifierService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.method === StripeProviderMethod.READ && Object.keys(this.stripeAccountDetail ?? {}).length) {
      this.form.patchValue(this.stripeAccountDetail ?? {});
    }

    this.form
      .get('country')
      ?.valueChanges
      ?.pipe(
        distinctUntilChanged(),
        tap((country: Country) => {
          FormUtils.validateZipCtrlByCountry(country, this.form.get('postalCode'));
          FormUtils.validateStateByCountry(country, this.form.get('state'));
          FormUtils.validateProvinceByCountry(country, this.form.get('province'));
          FormUtils.disableFieldOnCondition(
            this.form.get('ssnLast4'),
            lastSSN4Validators,
            country.alpha2Code.toLowerCase() !== CountryISO.UnitedStates
          );

          const {states, provinces} = getCountryAdministrativeUnits(country.alpha2Code as ISO);
          FormUtils.validateRegionByCountry(country, this.form.get('region'), [], states || provinces);
        }),
        untilDestroyed(this)
      )
      ?.subscribe();

    this.isLoading$
      .pipe(untilDestroyed(this))
      .subscribe(status => status ? this.form.disable() : this.form.enable());
  }

  ngOnDestroy() {
    this.isLoading$.complete();
  }

  onSubmit() {
    if (typeof this.method !== 'string' || ![StripeProviderMethod.CREATE, StripeProviderMethod.READ].includes(this.method)) {
      return;
    }

    this.isLoading$.next(true);
    if(this.method === StripeProviderMethod.READ){
      this.method = StripeProviderMethod.EDIT;
    }
    this.stripeProvider
      ?.[this.method]
      ?.(createStripeAccount(this.form))
      ?.pipe(
        catchError(err => {
          this.isLoading$.next(false);
          this.notifierService.error(err?.message ?? this.localizationService.translate('STRIPE.ERROR.CREATING'));
          return EMPTY;
        }),
        tap(() => void this.router.navigate([`/${PATHS.DASHBOARD}`])),
        untilDestroyed(this),
        take(1)
      )
      ?.subscribe();
  }
}
