import { MatSelectCountryComponent } from '@angular-material-extensions/select-country';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserTypeTitle, UserTypeTitles } from '@ocean/api/shared';
import { LocalizationService } from '@ocean/internationalization';
import { FormUtils } from '@ocean/shared';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';
import { CountryISO } from 'ngx-intl-tel-input';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-shipyard-surveyor-signup',
  templateUrl: './shipyard-surveyor-signup.component.html',
  styleUrls: ['./shipyard-surveyor-signup.component.scss']
})
export class ShipyardSurveyorSignupComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() role: UserTypeTitle;
  @Input() isParentValid: boolean;
  step1: FormGroup = this.builder.group({
    name: ['', [Validators.required, CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
    country: ['', Validators.required],
    phone: ['', [Validators.required, CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    businessEmail: ['', [Validators.required, CustomValidator.noWhiteSpace, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    website: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService), CustomValidator.noWhiteSpace]],
  })
  step2: FormGroup = this.builder.group({
    address: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    address2: ['', [CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    city: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    state: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]],
    zipCode: ['', [Validators.required, CustomValidator.startWithSpaceValidator, CustomValidator.dontAllowOnlyZeros(this.localizationService)]]
  })
  CountryISO = CountryISO;
  countryAlpha2Code: string;
  notSelectedError = false;
  userTypes = UserTypeTitles;
  @Output() formValue = new EventEmitter();
  defaultCountry:string = 'us'
  @ViewChild('matCountry') matCountry: MatSelectCountryComponent;
  get countryCtrl() {
    return this.step1.get('country');
  }
  get phoneCtrl() {
    return this.step1.get('phone');
  }
  constructor(private builder: FormBuilder, private localizationService: LocalizationService) { }

  ngOnInit(): void {
    this.countryCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(change =>

          FormUtils.validateZipCtrlByCountry(change, this.step2.get('zipCode'))
        ),
        untilDestroyed(this)
      )
      .subscribe(data => {
        this.countryAlpha2Code = data?.alpha2Code?.toLowerCase();
      });
  }
  ngAfterViewInit() {
    this.matCountry.onBlur = () => {
      this.countryCtrl.markAsTouched();
    }
  }

  onSubmit() {
    this.formValue.emit({ ...this.step1.value, ...this.step2.value })
  }

  ngOnDestroy(): void { }
}
