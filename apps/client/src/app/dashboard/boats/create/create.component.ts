import { Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MediaService, MediaTransform } from '@ocean/api/client';
import { BoatProvider } from '@ocean/api/services';
import { Boat } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { BoatsFacade, RouterFacade } from '@ocean/client/state';
import { FormUtils } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, switchMap, tap } from 'rxjs';
import { FormBuilderEntries, FormFieldsService } from '@ocean/libs/form-builder';
import { boatFields, BoatFieldsType, getBoatFieldsForType } from '@ocean/forms-config';

enum CreateBoatStep {
  MainInfo,
  About,
  Images,
}

type Fields = typeof boatFields;

@Component({
  selector: 'app-boats-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class BoatsCreateComponent implements OnInit, OnDestroy {
  @ViewChild('top', {static: true}) top: ElementRef;
  @ViewChild(MatStepper, {static: true}) stepper: MatStepper;

  readonly createBoatStep = CreateBoatStep;

  readonly step1: FormBuilderEntries<Fields> | undefined;
  readonly step2: FormBuilderEntries<Fields> | undefined;
  readonly step3 = this.builder.group({
    files: this.builder.array([])
  });

  private userId: string;

  createdBoat: Boat;

  constructor(
    private readonly builder: FormBuilder,
    private readonly boat: BoatsFacade,
    private readonly boatProvider: BoatProvider,
    private readonly mediaService: MediaService,
    private readonly userFacade: UserFacade,
    private readonly routerFacade: RouterFacade,
    private readonly fieldsService: FormFieldsService<Fields>
  ) {
    this.fieldsService.init(boatFields);

    const [information, about] = getBoatFieldsForType(
      this.fieldsService,
      BoatFieldsType.CREATE
    );

    this.step1 = this.fieldsService.entries(information);
    this.step2 = this.fieldsService.entries(about);
  }

  ngOnInit() {
    this.fieldsService.validateWhenCountryChanged(
      this.step1?.form?.get('country'),
      this.step1?.form?.get('zipCode'),
    )?.subscribe();

    this.userFacade.id$
      .pipe(untilDestroyed(this))
      .subscribe((id) => (this.userId = id));
  }

  ngOnDestroy() {
    return;
  }

  onNext() {
    switch (this.stepper.selectedIndex) {
      case CreateBoatStep.MainInfo:
        if (this.step1?.form?.valid) {
          FormUtils.markAsTouched(this.step1?.form);
          this.onJump(CreateBoatStep.About);
        }
        break;

      case CreateBoatStep.About:
        if (this.step2?.form?.valid) {
          FormUtils.markAsTouched(this.step2?.form);
          const boat = {
            ...this.step1?.form?.value,
            ...this.step2?.form?.value,
            flag: this.step1?.form?.value?.flag?.alpha3Code,
            country: this.step1?.form?.value?.country?.alpha3Code,
          };
          this.boat.create(boat);
          this.getCreatedBoat();
        }
        break;

      case CreateBoatStep.Images:
        break;

      default:
        break;
    }
  }

  onJump(step: number) {
    this.stepper.selectedIndex = step;

    this.top.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  onUploadImages() {
    this.mediaService.uploadMultipleFilesWithTransformation({
      files: this.step3.value.files.map(f => f.file),
      tags: `${this.createdBoat.id},${this.userId}`,
      title: this.createdBoat.name,
      transformations: [
        MediaTransform.CAROUSEL_MAIN,
        MediaTransform.CAROUSEL_THUMB,
        MediaTransform.THUMB
      ]
    })
      .pipe(
        switchMap((res) => {
          return this.boatProvider.associateMedia(
            this.createdBoat.id,
            res.map(r => r.publicId)
          );
        }),
        tap(() => this.onLater()),
        untilDestroyed(this)
      )
      .subscribe();
  }

  onLater() {
    this.routerFacade.go({
      path: ['/dashboard/boats', this.createdBoat.id],
    });
  }

  getCreatedBoat() {
    this.boat.createdBoat$
      .pipe(
        filter((boat) => !!boat),
        untilDestroyed(this)
      )
      .subscribe((boat) => {
        this.createdBoat = boat;
        this.onJump(CreateBoatStep.Images);
      });
  }
}
