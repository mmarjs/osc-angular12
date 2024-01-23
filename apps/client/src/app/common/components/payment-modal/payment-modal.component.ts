import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { delay, filter, of, switchMap, last, flatMap } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { StripeService } from 'ngx-stripe';
import { StripeElements, StripeError } from '@stripe/stripe-js';
import { UserFacade } from '@ocean/api/state';
import { NotifierService } from '@ocean/shared/services';
import { LocalizationService } from '@ocean/internationalization';
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
        filter(value => value !== undefined),
        switchMap(paymentIntent => {
          if (typeof paymentIntent !== 'object' || typeof paymentIntent?.clientSecret !== 'string') {
            this.notifier.error(this.localizationService.translate('PAYMENT.UNABLE_TO_SETUP_INTENT'));
            return of(undefined);
          }
          return this.stripe.elements(createStripeElementsOptions(paymentIntent?.clientSecret));
        }),
        map(elements => {
          this.elements = elements;

          elements
            .create('payment')
            .mount(this.cardElement.nativeElement);
        }),
        untilDestroyed(this)
      )
      .subscribe();

    this.dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        delay(500),
        untilDestroyed(this),
      )
      .subscribe(() => this.userFacade.loadSavedCards());
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
        take(1),
      )
      .subscribe(({error}) => {
        if (error) {
          this.onStripeError(error);
        } else {
          this.notifier.success(this.localizationService.translate('PAYMENT.PAYMENT_METHOD_ADDED_SUCCESSFULLY'));
          this.close();
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
