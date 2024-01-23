import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Boat, JobDTO } from '@ocean/api/shared';
import { IconType } from '@ocean/icons';
import { MediaResponse } from '@ocean/api/client';
@Component({
  selector: 'app-survey-information',
  templateUrl: './survey-information.component.html',
  styleUrls: ['./survey-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyInformationComponent {
  @Output() updateZip: EventEmitter<string> = new EventEmitter();
  @Output() updateLocation: EventEmitter<string> = new EventEmitter();
  @Input() form: FormGroup;
  @Input() descriptionForm: FormGroup;
  @Input() boat: Boat;
  @Input() auction: JobDTO;
  @Input() isStarted: boolean;
  @Input() selectedTab: number;
  @Input() isEdit: boolean;
  @Input() isLoadingImages: boolean;
  @Input() jobImages: MediaResponse[];
  iconType = IconType;

  get auctionType(): string {
    return this.descriptionForm.get('type').value;
  }
  get data(): any {
    return this.descriptionForm.value;
  }
}
