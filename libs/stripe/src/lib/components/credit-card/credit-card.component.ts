/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocalizationService } from '@ocean/internationalization';
import { StripeCardCvcElementChangeEvent, StripeCardElementOptions, StripeCardExpiryElementChangeEvent, StripeCardNumberElementChangeEvent, StripeElementLocale, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent } from 'ngx-stripe';
import { untilDestroyed } from 'ngx-take-until-destroy';

class CreditCardValidation {
  private cardControls = {
    cardValid: false,
    expirationValid: false,
    cvcValid: false
  }

  get isValid(): boolean {
    return this.cardControls.cardValid && this.cardControls.expirationValid && this.cardControls.cvcValid;
  }

  setControlState(controlName: string, isValid: boolean): void {
    // TODO:
    ( this.cardControls as any )[controlName] = isValid;
  }
}

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit, OnDestroy {
  @ViewChild(StripeCardComponent)
  card!: StripeCardComponent;
  creditCardValidation = new CreditCardValidation();
  cardNumber!:string
  paymentOptios:string[]=['Credit Card','Wire Transfer','Bank Transfer'];
  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    classes: {
      base: 'Stripe_Element',
      empty: 'Stripe_Element',
      focus: 'Stripe_Element--focus',
      invalid: 'Stripe_Element--invalid',
      webkitAutofill: 'Stripe_Element--webkit-autofill'
    },
    style: {
      base: {
        iconColor: '#f79f51',
        color: '#283b4d',
        fontWeight: '500',
        fontFamily: '"BentonSansCond", "Helvetica Neue", sans-serif',
        fontSize: '16px',
        backgroundColor: '#fff',
        '::placeholder': {
          color: '#f79f51'
        }
      },
      invalid: {
        iconColor: '#f44336',
        color: '#f44336'
      }
    },
  };
  errorMsg!: string;
  elementsOptions: StripeElementsOptions = {};

  constructor(
    private localizationService: LocalizationService
  ) { }

  ngOnInit(): void {
    this.localizationService.onLangChange()
      .pipe(untilDestroyed(this))
      .subscribe(({ lang }) => this.elementsOptions.locale = lang as StripeElementLocale)
  }

  onChange(event: StripeCardNumberElementChangeEvent | StripeCardExpiryElementChangeEvent | StripeCardCvcElementChangeEvent, controlName: string) {
    this.creditCardValidation.setControlState(controlName, event.complete);
    if (event.error) {
      this.errorMsg = event.error.message as string;
    } else {
      this.errorMsg = '';
    }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void { }
}
