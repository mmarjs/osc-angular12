import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentMethod } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { LocalizationService } from '@ocean/internationalization';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-payment-form',
  templateUrl: './edit-payment-form.component.html',
  styleUrls: ['./edit-payment-form.component.scss']
})
export class EditPaymentFormComponent implements OnInit,OnDestroy {

  editPaymentMethodForm: FormGroup;
  showSubmit: boolean = true;
  currentYear:number = new Date().getFullYear();
  isPaymentLoadingSubscription:Subscription;
  paymentIdSubscription: Subscription;
  year: number;
  minValue: number = 1;
  
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: PaymentMethod,
    private userFacade: UserFacade,
    private dialogRef: MatDialogRef<EditPaymentFormComponent>,
    private localizationService: LocalizationService
    ) { }

  ngOnInit(): void {
    this.editPaymentMethodForm = this.fb.group({
      expMonth: [this.extractDataFromJson(this.data.details)?.card.exp_month,[Validators.required,this.monthValidation]],
      expYear: [this.extractDataFromJson(this.data.details)?.card.exp_year, [Validators.required,Validators.pattern("^[0-9]{4}$"),this.yearValidation]]
    })
    this.paymentIdSubscription = this.userFacade.paymentId$.pipe(filter(Boolean)).subscribe(() => {
      this.dialogRef.close();
      this.userFacade.resetPaymentId();
    })
    this.isPaymentLoadingSubscription = this.userFacade.editPaymentMethodError$.pipe(filter(Boolean)).subscribe(() => this.close())
  }

  extractDataFromJson(card) {
    card = card && JSON.parse(card);
    return card;
  }

  getCard(card:PaymentMethod['details']){
    return this.extractDataFromJson(card).card;
   }

  onSubmit(cardId: number) {
    this.userFacade.editPaymentMethod(cardId, this.editPaymentMethodForm.value)
    this.showSubmit = false;
  }

  yearValidation = (control: FormControl) => {
    this.year = +control.value;
    if (this.year < this.currentYear) {
      return { 'inValidYear': true, 'message': 'FORMS.ERRORS.SHOULD_NOT_LESS_THAN_CURRENT_YEAR' };
    } else {
      this.editPaymentMethodForm?.controls['expMonth'].updateValueAndValidity();
      return null;
    }
  }

  monthValidation = (control: FormControl) => {
    const month = control.value;
    const maxMonth = 12;
    const minMonth = 1;
    const currentMonth = new Date().getMonth() + 1;
    if (month > maxMonth || month < minMonth) {
      return {
        'inValidMonth': true,
        'message': this.localizationService.translate('FORMS.ERRORS.SHOULD_BE_BETWEEN', { value1: minMonth, value2: maxMonth })
      };
    } else if (month < currentMonth && this.year === this.currentYear) {
      return {
        'inValidMonth': true,
        'message': 'FORMS.ERRORS.INVALID_MONTH'
      }
    } else {
      return null;
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.isPaymentLoadingSubscription?.unsubscribe();
    this.paymentIdSubscription?.unsubscribe();
  }

}
