import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldListModel } from '@ocean/libs/form-builder';

@Component({
  selector: 'app-bidding-form-footer-group',
  templateUrl: './bidding-form-footer-group.component.html',
  styleUrls: ['./bidding-form-footer-group.component.scss']
})
export class BiddingFormFooterGroupComponent implements OnDestroy {

  @Input()
  fields: FormFieldListModel | undefined;
  @Output() bidSubmit: EventEmitter<number> = new EventEmitter();

  @Input() form: FormGroup;
  @Input() bidAmount = 0;
  @Input() tableFormInvalid: boolean;
  @Input() isBidCreating: boolean;
  @Input() isBidAmountPaid: boolean;

  ngOnDestroy() {}

  formBidSubmit = () => this.bidSubmit.emit(this.bidAmount);
}
