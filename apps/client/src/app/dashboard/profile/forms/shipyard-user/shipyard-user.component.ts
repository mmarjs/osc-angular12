import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SecurityOptions, User } from '@ocean/api/shared';
import { LocalizationService } from '@ocean/internationalization';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';
import { NumberValidator } from '@ocean/shared/utils/number-validator';

@Component({
  selector: 'app-shipyard-user',
  templateUrl: './shipyard-user.component.html',
  styleUrls: ['./shipyard-user.component.scss'],
})
export class ShipyardUserComponent implements OnChanges {
  @Input() isDisabled = true;

  @Input() set user(value: User) {
    this.form.patchValue(value);
  }

  private readonly commonValidators = [
    NumberValidator.onlyPositiveNumbers(),
    CustomValidator.dontAllowOnlyZeros(this.localizationService),
    // https://github.com/oh-es-see/osc-api/pull/321/files
    NumberValidator.digits(10, 4),
  ];

  readonly securityOptions = [
    {
      title: this.localizationService.translate('FORMS.LABELS.PART_TIME'),
      value: SecurityOptions.PART_TIME,
    },
    {
      title: this.localizationService.translate('FORMS.LABELS.FULL_TIME'),
      value: SecurityOptions.FULL_TIME,
    },
  ];

  readonly form = this.fb.group({
    dockageFee: ['', [...this.commonValidators]],
    utilityFee: ['', [...this.commonValidators]],
    garbageFee: ['', [...this.commonValidators]],
    ampServiceFee: ['', [...this.commonValidators]],
    security: ['', [CustomValidator.startWithSpaceValidator]],
    arbitrationLocation: [
      '',
      [
        CustomValidator.startWithSpaceValidator,
        CustomValidator.dontAllowOnlyZeros(this.localizationService),
      ],
    ],
    warrantyDays: [
      '',
      [
        CustomValidator.dontAllowOnlyZeros(this.localizationService),
        NumberValidator.onlyPositiveNumbers(),
      ],
    ],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly localizationService: LocalizationService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.isDisabled ? this.form.disable() : this.form.enable();
  }
}
