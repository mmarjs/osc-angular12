import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserFacade } from '@ocean/api/state';
import { LocalizationService } from '@ocean/internationalization';
import { NotifierService } from '@ocean/shared/services';
import { StripeElements, StripeError } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { delay, of, switchMap } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { createStripeElementsOptions } from './create-stripe-elements-options';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit, OnDestroy {
  @ViewChild('card', {static: true}) cardElement: ElementRef;

  private elements: StripeElements;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: unknown,
    private readonly dialogRef: MatDialogRef<PaymentModalComponent>,
    private readonly userFacade: UserFacade,
    private readonly notifier: NotifierService,
    private readonly stripe: StripeService,
    private readonly localizationService: LocalizationService
  ) {
  }

  ngOnInit() {
    this.userFacade.setUpIntent();

    this.userFacade
      .setUpIntentSuccess$
      .pipe(
        first(value => value !== undefined),
        switchMap(paymentIntent => {
          if (typeof paymentIntent !== 'object' || typeof paymentIntent?.clientSecret !== 'string') {
            this.notifier.error(this.localizationService.translate('PAYMENT.UNABLE_TO_SETUP_INTENT'));
            return of(undefined);
          }
          return this.stripe.elements(createStripeElementsOptions(paymentIntent?.clientSecret));
        }),
        delay(1000),
        tap(elements => {
          this.elements = elements;

          elements
            .create('payment')
            .mount(this.cardElement.nativeElement);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  ngOnDestroy() {
  }

  private onStripeError(error: StripeError) {
    this.notifier.error(error.message);
  }

  onSubmit() {
    this.stripe.confirmSetup({
      elements: this.elements,
      redirect: 'if_required'
    })
      .pipe(
        untilDestroyed(this),
        first()
      )
      .subscribe(({error, setupIntent}) => {
        if (error) {
          this.onStripeError(error);
        } else {
          this.notifier.success(this.localizationService.translate('PAYMENT.PAYMENT_METHOD_ADDED_SUCCESSFULLY'));
          this.close(setupIntent.status === 'succeeded');
        }
      });
  }

  close(result: boolean = false) {
    this.dialogRef.close(result);
  }
}
