import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaResponse } from '@ocean/api/client';
import { Boat, JobItem } from '@ocean/api/shared';
import { IconType } from '@ocean/icons';
import { Image } from '@ocean/carousel';

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
  @Output() updateJobTitle: EventEmitter<string> = new EventEmitter();
  @Output() updateLocation: EventEmitter<string> = new EventEmitter();
  @Output() updateZip: EventEmitter<string> = new EventEmitter();
  @Input()
  get boat(): Boat {
    return this._boat;
  }
  iconType = IconType;

  isEditLocation: boolean;
  isEditZipCode: boolean;
  isEditJobName: boolean;
  location: string;
  zip: string;
  _boat: Boat;
  addressForm = this.fb.group({
    address: ['', [Validators.required]],
    zipCode: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(6),
      ],
    ],
  });
  set boat(value: Boat) {
    this.location = value.address;
    this.zip = value.zipCode;
    this._boat = value;
  }
  get descriptionGroup(): FormGroup {
    return this.form.get('description') as FormGroup;
  }

  get informationGroup(): FormGroup {
    return this.form.get('information') as FormGroup;
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

  get jobItems(): JobItem[] {
    return this.informationGroup.get('jobItems').value;
  }

  get auctionType(): string {
    return this.descriptionGroup.get('type').value;
  }

  get allImage(): Image[] {
    return [...(this.images || []), ...(this.extImages || [])];
  }

  constructor(private fb: FormBuilder) {}

  handleUpdateZip() {
    this.isEditZipCode = false;
    this.updateZip.emit(this.zip);
  }

  handleUpdateLocation() {
    this.isEditLocation = false;
    this.updateLocation.emit(this.location);
  }
}
