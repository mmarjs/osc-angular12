import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MediaResponse } from '@ocean/api/client';
import { Boat } from '@ocean/api/shared';
import { IconType } from '@ocean/icons';
import { Image } from '@ocean/carousel';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { Country } from '@angular-material-extensions/select-country';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent {
  @Input() form: FormGroup;
  @Input() isCreateSuccess: boolean;
  @Input() images: Image[];
  @Input() extImages: MediaResponse[];
  @Input() isStarted: boolean;

  @Input()
  set boat(value: Boat) {
    this.country = stringToCountryField(value.country);
    this._boat = value;
  }

  get boat(): Boat {
    return this._boat;
  }

  iconType = IconType;

  country: Country;
  _boat: Boat;

  get descriptionGroup(): FormGroup {
    return this.form.get('description') as FormGroup;
  }

  get jobName(): string {
    return this.descriptionGroup.get('name').value;
  }

  get jobType(): string {
    return this.descriptionGroup.get('type').value;
  }

  get jobDescription(): string {
    return this.descriptionGroup.get('description').value;
  }

  get auctionEndDate(): string {
    return this.form.get('auctionEndDate').value;
  }

  get auctionStartDate(): string {
    return this.form.get('auctionStartDate')?.value ?? new Date();
  }

  get auctionType(): string {
    return this.descriptionGroup.get('type').value;
  }

  get allImage(): Image[] {
    return [...(this.images || []), ...(this.extImages || [])];
  }
}
