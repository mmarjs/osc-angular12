import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalizationService } from '@ocean/internationalization';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { Country } from 'ngx-intl-tel-input/lib/model/country.model';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-form-control-update-on-submit',
  templateUrl: './form-control-update-on-submit.component.html',
  styleUrls: ['./form-control-update-on-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlUpdateOnSubmitComponent implements OnInit {
  readonly iconType = IconType;
  readonly preferredCountries: CountryISO[] = [CountryISO.UnitedStates];
  readonly PhoneNumberFormat = PhoneNumberFormat;
  readonly CountryISO = CountryISO;
  readonly SearchCountryField = SearchCountryField;

  @Output() controlSubmitted: EventEmitter<string> = new EventEmitter<string>();

  @Input() form: FormGroup;
  @Input() control: FormControl;

  @Input() controlName: string;
  @Input() minLength: string;
  @Input() maxLength: string;
  @Input() label: string;
  @Input() visibility = 'visible';

  @Input() isPhone: boolean;
  @Input() isLoading: boolean;

  countryCode = CountryISO.UnitedStates;
  errorMsg = '';

  constructor(private readonly localizationService: LocalizationService) {}

  ngOnInit() {
    this.form = new FormGroup({
      [this.controlName]: this.control,
    });
  }

  toggleControlDisabledState() {
    if (this.control.disabled) {
      this.control.enable();
    } else {
      this.control.disable();
    }
    this.control.updateValueAndValidity();
  }

  onValueChange() {
    this.ctrlHasError();
  }

  submit() {
    if (this.ctrlHasError()) {
      this.control.enable();
    } else if (this.control.disabled) {
      this.isLoading = true;
      this.controlSubmitted.emit(this.control.value);
    }
  }

  onCountrySelect(country: Country) {
    this.ctrlHasError();
    this.countryCode =
      (country?.iso2?.toLowerCase() as CountryISO) ?? CountryISO.UnitedStates;
  }

  private ctrlHasError(): boolean {
    if (this.control.hasValidator(Validators.required)) {
      if (!this.control.value) {
        this.errorMsg = this.localizationService.translate(
          'FORMS.LABELS.REQUIRED'
        );
        return true;
      }
    }
    if (this.control.invalid && !this.isPhone) {
      this.errorMsg = this.localizationService.translate('FORMS.ERRORS.NAME');
      return true;
    }

    if (this.control.invalid && this.isPhone) {
      this.errorMsg = this.localizationService.translate(
        'FORMS.ERRORS.INVALID_PHONE'
      );
      return true;
    }

    if (this.control.value.length < this.minLength && this.control.invalid) {
      this.errorMsg = this.localizationService.translate(
        'FORMS.LABELS.MIN_SIZE',
        { size: this.minLength }
      );
      return true;
    }

    if (this.control.value.length > this.maxLength) {
      this.errorMsg = this.localizationService.translate(
        'FORMS.LABELS.MAX_SIZE',
        { size: this.maxLength }
      );
      return true;
    }

    if (this.control.hasValidator(Validators.email)) {
      this.errorMsg = this.localizationService.translate(
        'FORMS.LABELS.EMAIL_PATTERN'
      );
      return true;
    }

    this.errorMsg = '';

    return false;
  }
}
