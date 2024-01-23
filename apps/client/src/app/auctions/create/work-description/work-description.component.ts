import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { Boat, JobDTO, JobTypes } from '@ocean/api/shared';
import { IconType } from '@ocean/icons';
import { noWhitespaceValidator } from '@ocean/shared/utils/no-whitespace-validator';
import { BehaviorSubject } from 'rxjs';
import { CarouselComponent } from '@ocean/carousel';
import { TranslateService } from '@ngx-translate/core';
import { MediaResponse } from '@ocean/api/client';
import { JobStatus } from '@ocean/api/services';

interface JobTypeValues {
  label: string;
  value: JobTypes;
  checked: boolean;
}

@Component({
  selector: 'app-work-description',
  templateUrl: './work-description.component.html',
  styleUrls: ['./work-description.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkDescriptionComponent implements OnInit, OnDestroy {
  readonly iconType = IconType;
  readonly jobStatus = JobStatus;

  @Input() form: FormGroup;
  @Input() boat: Boat;
  @Input() auction: JobDTO;
  @Input() isEdit: boolean;
  @Input() isLoadingImages: boolean;
  @Input() jobImages: MediaResponse[];

  @ViewChild('carouselUseCase') carouselUseCase: CarouselComponent;
  @ViewChild('carouselThumbsUseCase') carouselThumbsUseCase: CarouselComponent;

  jobTypesValues: BehaviorSubject<JobTypeValues[] | null> = new BehaviorSubject(null);

  constructor(private readonly translateService: TranslateService) {
  }

  get mediasForm(): FormGroup {
    return this.form?.get('medias') as FormGroup;
  }

  get files(): FormArray {
    return this.mediasForm?.get('files') as FormArray;
  }

  get totalMedias(): number {
    return this.mediasForm.value.files.length;
  }

  get type(): string {
    return this.form?.get('type').value;
  }

  ngOnInit() {
    this.form
      ?.get('name')
      .setValidators([Validators.required, noWhitespaceValidator]);

    this.form
      ?.get('description')
      .setValidators([Validators.required, noWhitespaceValidator]);

    this.jobTypesValues.next([
        {
          label: this.translateService.instant('APPLICATION.REPAIR_REFIT'),
          value: JobTypes.REPAIR,
          checked: this.type === JobTypes.REPAIR,
        },
        {
          label: this.translateService.instant('APPLICATION.SURVEY'),
          value: JobTypes.SURVEY,
          checked: this.type === JobTypes.SURVEY,
        }
      ]
    );
  }

  ngOnDestroy() {
    this.jobTypesValues.complete();
  }

  handleCarouselUseCaseEvents(event: any) {
    if (event.name === 'transitionend') {
      this.carouselThumbsUseCase.select(this.carouselUseCase.slideCounter);
    }
  }

  onClearForm() {
    this.form.reset();
    this.jobTypesValues.next(
      this.jobTypesValues.value.map((item) => ({
        ...item,
        checked: false,
      }))
    );
  }

  onDeleteImages({ deletedFiles }) {
    if (this.files?.value?.length > 0 && deletedFiles?.length > 0) {
      for (const deletedFile of deletedFiles) {
        const index = this.files.value.findIndex((value) => {
          return value.file === deletedFile;
        });
        if (index !== -1) {
          this.files.removeAt(index);
        }
      }
    }
  }
}
