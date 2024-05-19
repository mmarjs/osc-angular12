import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '@angular-material-extensions/select-country';
import { distinctUntilChanged, tap } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormBuilderService } from '@ocean/libs/form-builder';
import { StripeProviderMethod } from '@ocean/api/services';
import { FormUtils } from '@ocean/shared';
import { LocalizationService } from '@ocean/internationalization';
import {
  getCountryAdministrativeUnits,
  ISO,
} from '@ocean/shared/utils/iso-mapper';
import { createFields } from './form-fields';
import { StripeFacadeService } from '../../../store/facade';
import { normalizeStipeAccountToForm } from '../../../helpers/normalize-stipe-account-to-form';
import { createStripeAccount } from '@ocean/api/shared';
import { StripeAccountValidationStatus } from '../../../helpers/stripe-account-validation';

@Component({
  selector: 'app-create-stripe-account',
  templateUrl: './create-stripe-account.component.html',
  styleUrls: ['./create-stripe-account.component.scss'],
})
export class CreateStripeAccountComponent implements OnInit, OnDestroy {
  private method?: StripeProviderMethod =
    this.router.getCurrentNavigation()?.extras?.state?.method;

  private readonly account$ = this.stripeFacadeService.account$;

  readonly loading$ = this.stripeFacadeService.loading$;

  readonly fields = createFields(this.localizationService);

  readonly form = this.formBuilderService.buildReactiveForm(this.fields);

  constructor(
    private readonly stripeFacadeService: StripeFacadeService,
    private readonly formBuilderService: FormBuilderService,
    private readonly localizationService: LocalizationService,
    private readonly router: Router
  ) {}

  // taxId - false, SSN - true
  private disableTaxIdOrSSN(taxIdOrSSN?: boolean) {
    this.form.get('taxId')?.disable();
    this.form.get('ssnLast4')?.disable();

    taxIdOrSSN
      ? this.form.get('ssnLast4')?.enable()
      : this.form.get('taxId')?.enable();
  }

  ngOnInit() {
    if (this.method === StripeProviderMethod.READ) {
      this.stripeFacadeService.loadAccount();
    }

    this.stripeFacadeService.validationErrors$
      .pipe(untilDestroyed(this))
      .subscribe((validation) => {
        if (typeof validation === 'object') {
          const { status } = validation;
          if (status !== StripeAccountValidationStatus.NOT_CREATED) {
            this.method = StripeProviderMethod.READ;
          }
        }
      });

    this.account$.pipe(untilDestroyed(this)).subscribe((account) => {
      this.form.patchValue(normalizeStipeAccountToForm(account) ?? {});
    });

    this.loading$.pipe(untilDestroyed(this)).subscribe((status) => {
      status ? this.form.disable() : this.form.enable();
      this.disableTaxIdOrSSN(this.form.get('taxIdOrSSN')?.value);
    });

    this.form
      .get('taxIdOrSSN')
      ?.valueChanges?.pipe(untilDestroyed(this))
      .subscribe((taxIdOrSSN) => this.disableTaxIdOrSSN(taxIdOrSSN));

    this.form
      .get('country')
      ?.valueChanges?.pipe(
        distinctUntilChanged(),
        tap((country: Country) => {
          FormUtils.validateZipCtrlByCountry(
            country,
            this.form.get('postalCode')
          );
          FormUtils.validateStateByCountry(country, this.form.get('state'));
          FormUtils.validateProvinceByCountry(
            country,
            this.form.get('province')
          );

          const { states, provinces } = getCountryAdministrativeUnits(
            country.alpha2Code as ISO
          );
          FormUtils.validateRegionByCountry(
            country,
            this.form.get('region'),
            [],
            states || provinces
          );
        }),
        untilDestroyed(this)
      )
      ?.subscribe();
  }

  ngOnDestroy() {
    return;
  }

  onSubmit() {
    if (
      this.form.invalid ||
      typeof this.method !== 'string' ||
      ![
        StripeProviderMethod.CREATE,
        StripeProviderMethod.READ,
        StripeProviderMethod.EDIT,
      ].includes(this.method)
    ) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.method === StripeProviderMethod.READ) {
      this.method = StripeProviderMethod.EDIT;
    }

    this.stripeFacadeService.createAccount(
      createStripeAccount(this.form),
      this.method
    );
  }
}
