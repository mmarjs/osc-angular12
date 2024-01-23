import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PaymentMethod } from '@ocean/api/shared';
import { BidsFacade } from '@ocean/client/state';
import {
    FormBuilderService,
    FormFieldGroupTypes,
    FormFieldListModel
} from '@ocean/libs/form-builder';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-pay-commission',
  templateUrl: './pay-commission.component.html',
  styleUrls: ['./pay-commission.component.scss'],
})
export class PayCommissionComponent implements OnInit {
  depositSuccess = false;
  selectedCard: PaymentMethod | null = null;

  formFields: FormFieldListModel = {
    deposit: {
      order: 0,
      defaultValue: 0,
      label: 'BIDS.DEPOSIT_AMOUNT',
      placeholder: 'BIDS.DEPOSIT_AMOUNT',
      type: FormFieldGroupTypes.number,
      hideArrowsForNumber: false,
      isCurrency: true,
      validators: [Validators.required],
    },
  };

  form = this.formBuilderService.buildReactiveForm(this.formFields);

  bid$ = this.bidsFacade.bid$.pipe(
    filter((bid) => !!bid),
    tap((bid) => {
      this.form.setValue({ deposit: bid.startDeposit });
      this.form
        .get('deposit')
        .setValidators([Validators.required, Validators.min(bid.startDeposit)]);
    })
  );

  constructor(
    private bidsFacade: BidsFacade,
    private readonly formBuilderService: FormBuilderService
  ) {}

  ngOnInit(): void {
    this.bidsFacade.loadBid();
  }

  onCardDetailsChanged(card: PaymentMethod): void {
    this.selectedCard = card;
  }

  onSubmit() {
    this.depositSuccess = true;
  }
}
