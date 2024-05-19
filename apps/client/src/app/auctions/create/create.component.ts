import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Boat, Job, JobDTO, JobTypes } from '@ocean/api/shared';
import { take, tap } from 'rxjs/operators';
import { filter, Observable, Subscription } from 'rxjs';
import {
  AuctionsFacade,
  BoatsFacade,
  DraftsFacade,
  RouterFacade,
} from '@ocean/client/state';
import { FormUtils } from '@ocean/shared/utils/form.utils';
import { DraftDialogs } from '@ocean/api/data';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MediaResponse, MediaService } from '@ocean/api/client';
import { UserFacade } from '@ocean/api/state';
import * as moment from 'moment';
import { ImageFacadeService } from '@ocean/client/state/images/image-facade.service';
import { SharedCreateBoatForm } from './shared-form';

const initialFormValue = {
  type: JobTypes.REPAIR,
  name: '',
  description: '',
  jobItems: [
    {
      title: '',
      description: '',
    },
  ],
  auctionEndDate: null,
};

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionCreateComponent implements OnInit, OnDestroy {
  form = this.fb.group(
    {
      description: this.fb.group({
        type: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required],
        medias: this.fb.group({
          files: this.fb.array([]),
        }),
        syncing: [], // Used for sync boat-info fields
      }),
      auctionEndDate: ['', Validators.required],
    },
    {
      validator: FormUtils.endDateValidator('auctionEndDate'),
    }
  );

  isCreateSuccess$: Observable<boolean> = this.auctionsFacade.isCreateSuccess$;
  selectedAuction: JobDTO;
  boat: Boat;
  boat$ = this.boatFacade.selectedBoat$.pipe(tap((boat) => (this.boat = boat)));
  isEditMode: boolean;
  auction: JobDTO = {};
  userId: string;
  isLoadingImages$ = this.imageFacadeService.isLoadingImages$;
  jobImages: MediaResponse[] = [];
  isUpdatingSubscription: Subscription;
  updateDraft: boolean;
  imageSubscription: Subscription;

  get description(): FormGroup {
    return this.form?.get('description') as FormGroup;
  }

  get auctionType(): string {
    return this.description?.get('type').value;
  }

  get mediasForm() {
    return this.description?.get('medias') as FormGroup;
  }

  get files() {
    return this.mediasForm?.get('files').value;
  }

  constructor(
    private fb: FormBuilder,
    private boatFacade: BoatsFacade,
    private auctionsFacade: AuctionsFacade,
    private draftsFacade: DraftsFacade,
    private routerFacade: RouterFacade,
    private imageFacadeService: ImageFacadeService,
    private draftDialogs: DraftDialogs,
    private userFacade: UserFacade,
    private readonly builder: FormBuilder,
    private readonly sharedForm: SharedCreateBoatForm,
    private readonly mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.userFacade.id$
      .pipe(untilDestroyed(this))
      .subscribe((id) => (this.userId = id));
    this.auctionsFacade.init();
    this.handleAuctionFormRender();
    this.handleGetAuction();

    this.imageFacadeService.cache();
    this.mediasForm
      ?.get('files')
      ?.valueChanges?.pipe(
        untilDestroyed(this),
        filter(
          (value) => this.imageFacadeService.getLocalImages(value)?.length > 0
        )
      )
      ?.subscribe((value) => this.imageFacadeService.cache(value));
  }

  private subscribeToImages(id: number) {
    if (this.imageSubscription && !this.imageSubscription.closed) {
      this.imageSubscription.unsubscribe();
    }
    this.imageSubscription = this.imageFacadeService
      .remote$(id)
      .pipe(untilDestroyed(this))
      .subscribe((images) => {
        this.jobImages = images;

        if (Array.isArray(images)) {
          const files = this.mediasForm?.get('files');

          if (files instanceof FormArray) {
            files.clear();

            if (images.length) {
              images.forEach((img) => {
                files.push(
                  this.builder.group({
                    file: img.fileURL,
                  })
                );
              });
            }
          }
        }
      });
  }

  private handleGetAuction() {
    this.auctionsFacade.selectedAuction$.pipe(untilDestroyed(this)).subscribe({
      next: (selectedAuction) => {
        this.isEditMode = !!selectedAuction;
        this.initAuctionForm(selectedAuction);
        this.auction = selectedAuction;
        if (this.auction) {
          this.subscribeToImages(this.auction.id);
        }
      },
    });
  }

  private handleAuctionFormRender() {
    this.routerFacade.queryParams$
      .pipe(
        filter((queryParams) => !!queryParams.draft),
        take(1),
        tap((queryParams) => {
          this.updateDraft = true;
          this.draftsFacade.setSelectedDraft(queryParams.draft);
        })
      )
      .subscribe();
  }

  private initAuctionForm(job: Job | JobDTO = initialFormValue) {
    this.form.patchValue({
      description: {
        type: job.type,
        name: job.name,
        description: job.description,
      },
      auctionEndDate: job.auctionEndDate,
    });

    this.sharedForm.form = this.form;
  }

  private mapJobDto(): JobDTO {
    const edt = moment(this.form.value.auctionEndDate).format();

    return {
      auctionEndDate: edt,
      jobItems: [
        {
          title: this.form.value.description.name,
          description: this.form.value.description.description,
        },
      ],
      ...this.form.value.description,
      boatId: this.boat.id,
      currencyCode: 'USD',
    };
  }

  deleteUnusedGalleryImages() {
    if (!Array.isArray(this.files)) {
      return;
    }

    const isNotMediaFile = (
      media: Record<string, unknown>,
      entity: MediaResponse
    ) => (typeof media === 'object' ? media?.file !== entity.fileURL : false);

    let files: MediaResponse[];

    if (this.files?.length === 0) {
      files = this.jobImages ?? [];
    } else {
      files =
        this.jobImages?.filter(
          (entity) =>
            !!this.files?.some((media) => isNotMediaFile(media, entity))
        ) ?? [];
    }

    if (files.length) {
      this.mediaService.deleteMultipleFiles({
        files,
      });
    }
  }

  saveJob() {
    if (this.isEditMode || this.updateDraft) {
      this.auctionsFacade.edit(
        this.mapJobDto(),
        this.files?.map((f) => f.file) ?? []
      );
    } else {
      this.auctionsFacade.create(
        this.mapJobDto(),
        this.files?.map((f) => f.file) ?? []
      );
    }
  }

  saveAsDraft() {
    const endDate = new Date(new Date().setDate(new Date().getDate() + 2));
    const edt = moment(this.form.value.auctionEndDate || endDate).format();

    this.form.value.description.description =
      this.form.value.description.description || 'Auction Description';
    this.form.value.description.name =
      this.form.value.description.name || 'Auction Name';

    const draft = {
      content: {
        auctionEndDate: edt,
        jobItems: [
          {
            title: this.form.value.description.name,
            description: this.form.value.description.description,
          },
        ],
        ...this.form.value.description,
        boatId: this.boat.id,
        currencyCode: 'USD',
        status: 'DRAFT',
        id: this.auction?.id,
      },
      link: {
        path: 'AUCTION_CREATE',
        meta: {
          id: this.boat.id,
        },
      },
    };
    if (this.updateDraft) {
      this.draftsFacade.updateDraft(
        draft,
        this.files?.map((f) => f.file) ?? []
      );
      this.isUpdatingSubscription = this.draftsFacade.isUpdating$
        .pipe(filter(Boolean))
        .subscribe(() => this.onLater());
    } else {
      this.draftDialogs
        .addDraftNamePrompt()
        .pipe(
          tap((name) =>
            this.draftsFacade.saveDraft(
              {
                name,
                ...draft,
              },
              this.files?.map((f) => f.file) ?? []
            )
          ),
          untilDestroyed(this)
        )
        .subscribe(() => {
          this.onLater();
        });
    }
  }

  onLater() {
    this.deleteUnusedGalleryImages();
    this.routerFacade.go({
      path: ['/dashboard'],
    });
  }

  ngOnDestroy(): void {
    this.auctionsFacade.setSelectedAuction();
    this.boatFacade.setSelectedBoat();
    this.isUpdatingSubscription?.unsubscribe();
    if (this.auction?.id) {
      this.imageFacadeService.setImages(this.auction.id, []);
    }
  }
}
