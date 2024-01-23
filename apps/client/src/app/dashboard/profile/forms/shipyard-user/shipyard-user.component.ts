import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { SecurityOptions, User } from '@ocean/api/shared';
import { LocalizationService } from '@ocean/internationalization';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';

@Component({
  selector: 'app-shipyard-user',
  templateUrl: './shipyard-user.component.html',
  styleUrls: ['./shipyard-user.component.scss']
})
export class ShipyardUserComponent implements OnInit,OnChanges {
  @Input() isDisabled:boolean=true;
  securityOptions = [
   { title: this.localizationService.translate('FORMS.LABELS.PART_TIME'),value:SecurityOptions.PART_TIME },
   { title: this.localizationService.translate('FORMS.LABELS.FULL_TIME'),value:SecurityOptions.FULL_TIME }
  ]
  commonValidators = [CustomValidator.onlyPositiveNumbers(this.localizationService), Validators.pattern('^[0-9]*$'), CustomValidator.dontAllowOnlyZeros(this.localizationService), Validators.maxLength(10)]
  form = this.fb.group({
    dockageFee: ['', [...this.commonValidators]],
    utilityFee: ['', [...this.commonValidators]],
    garbageFee: ['', [...this.commonValidators]],
    ampServiceFee: ['', [...this.commonValidators]],
    security: ['', [CustomValidator.startWithSpaceValidator]],
    arbitrationLocation: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    warrantyDays: ['', [CustomValidator.dontAllowOnlyZeros(this.localizationService), CustomValidator.onlyPositiveNumbers(this.localizationService)]],
  })
   @Input() set user(value:User){
    this.form.patchValue(value);
  }
  constructor(private fb:FormBuilder,private localizationService:LocalizationService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isDisabled ? this.form.disable() : this.form.enable();
  }
}
