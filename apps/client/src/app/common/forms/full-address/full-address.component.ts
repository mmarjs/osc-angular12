import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { distinctUntilChanged, Subscription, tap } from 'rxjs';
import { FormUtils } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-full-address',
  templateUrl: './full-address.component.html',
  styleUrls: ['./full-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFullAddressComponent implements OnDestroy {
  private _form: FormGroup;
  private countryValueChangesSubscribed: Subscription;
  get form(): FormGroup {
    return this._form;
  }
  @Input()
  set form(val: FormGroup) {
    this._form = val;
    if (this._form) {
      const countryCtrl = this._form.get('country');
      if (this.countryValueChangesSubscribed) {
        this.countryValueChangesSubscribed.unsubscribe();
      }
      this.countryValueChangesSubscribed = countryCtrl.valueChanges
        .pipe(
          distinctUntilChanged(),
          tap(change => {
            FormUtils.validateZipCtrlByCountry(change, this._form.get('zipCode'));
          }),
          untilDestroyed(this)
        )
        .subscribe();
    }
  }
  ngOnDestroy() { }
}
