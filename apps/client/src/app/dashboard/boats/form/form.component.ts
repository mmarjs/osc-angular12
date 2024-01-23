import { COUNTRIES_DB } from '@angular-material-extensions/select-country';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaResponse, MediaService, MediaTransform } from '@ocean/api/client';
import { ErrorHandlingService } from '@ocean/api/client/error-handling.service';
import { BoatParams } from '@ocean/api/resolvers';
import { BoatOutputDTO } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { BoatsFacade } from '@ocean/client/state';
import { ROUTES } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { catchError, switchMap, tap } from 'rxjs';
import { normalizeBoatLength } from '@ocean/shared/utils/boat-length-validator';
import {
  FormBuilderService,
  FormFieldListModel,
  FormFieldModel,
  FormFieldsService,
} from '@ocean/libs/form-builder';
import {
  boatFields,
  BoatFieldsType,
  getBoatFieldsForType,
} from '@ocean/forms-config';
import { fieldsForRewrite } from './rewrited-fields';

type Fields = typeof boatFields;

@Component({
  selector: 'app-boats-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class BoatsFormComponent implements OnInit, OnDestroy {
  @ViewChild('carouselUseCase') carouselUseCase: any;
  @ViewChild('carouselThumbsUseCase') carouselThumbsUseCase: any;

  fields: FormFieldListModel<Partial<Fields>, FormFieldModel> | undefined;
  form: FormGroup | undefined;

  isEditMode: boolean;

  item: BoatOutputDTO;
  readonly: boolean;
  changed: boolean;
  boatImages: MediaResponse[];
  isLoadingImages: boolean;
  imageTransform = MediaTransform;
  uploadImageForm: FormGroup;
  userId: string;
  showUpload = true;

  constructor(
    private readonly builder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly boat: BoatsFacade,
    private readonly mediaService: MediaService,
    private readonly errorHandlingService: ErrorHandlingService,
    private readonly userFacade: UserFacade,
    private readonly formBuilderService: FormBuilderService,
    private readonly fieldsService: FormFieldsService<Fields>
  ) {
    this.fieldsService.init(boatFields);

    this.fields = {
      ...this.fieldsService.pick(getBoatFieldsForType(this.fieldsService, BoatFieldsType.EDIT).flat(1)),
      ...this.fieldsService.rewrite(fieldsForRewrite)
    };

    this.form = this.formBuilderService.buildReactiveForm(this.fields);
  }

  ngOnInit() {
    this.uploadImageForm = this.builder.group({
      files: this.builder.array([]),
    });

    this.route.data
      .pipe(
        tap(({ readonly }) => {
          this.isEditMode = !readonly;

          if (!readonly) {
            this.form.enable();
          } else {
            this.form.disable();
          }

          this.form?.get('hullId')?.disable();
        }),
        untilDestroyed(this)
      )
      .subscribe();

    this.fieldsService
      .validateWhenCountryChanged(
        this.form.get('country'),
        this.form.get('zipCode')
      )
      ?.subscribe();

    this.userFacade.id$
      .pipe(untilDestroyed(this))
      .subscribe((id) => (this.userId = id));
    // route parameters
    this.route.data
      .pipe(
        tap((data: BoatParams) => {
          this.isLoadingImages = true;
          this.item = data.item;
          this.readonly = !!data.readonly;
          const item = {
            ...this.item,
            flag: this.getCountry(this.item.flag),
            country: this.getCountry(this.item.country),
          };
          this.form.patchValue(item);
        }),
        switchMap(() =>
          this.mediaService.getFilesByTags({
            tags: this.item.id,
          })
        ),
        tap((images) => {
          this.boatImages = images;
          this.isLoadingImages = false;
        }),
        catchError((err) => {
          this.isLoadingImages = false;
          return this.errorHandlingService.handleError(err);
        })
      )
      .subscribe();

    this.boat.updatedItem$.subscribe((item) => {
      if (this.changed) {
        this.changed = false;
        this.router.navigate([ROUTES.link('BOATS')]);
      }
    });

    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  }

  onSubmit() {
    this.changed = true;
    this.boat.update({
      ...this.form.value,
      id: this.item.id,
      flag: this.form.value?.flag?.alpha3Code,
      country: this.form.value?.country?.alpha3Code,
      zipCode: this.form.value?.zipCode ?? '0000',
      length: normalizeBoatLength(this.form.value?.length),
    });
  }

  onUploadImages() {
    this.showUpload = false;
    this.mediaService
      .uploadMultipleFilesWithTransformation({
        files: this.uploadImageForm.value.files.map((f) => f.file),
        tags: `${this.item.id},${this.userId}`,
        title: this.item.name,
        transformations: [
          MediaTransform.CAROUSEL_MAIN,
          MediaTransform.CAROUSEL_THUMB,
          MediaTransform.THUMB,
        ],
      })
      .pipe(
        tap(() => {
          const files = this.uploadImageForm.get('files') as FormArray;
          files.clear();
        }),
        switchMap(() =>
          this.mediaService.getFilesByTags({
            tags: this.item.id,
          })
        ),
        tap((images) => {
          this.boatImages = images;
          this.isLoadingImages = false;
          this.showUpload = true;
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  canUploadImages(): boolean {
    return this.uploadImageForm?.get('files')?.value?.length || this.showUpload;
  }

  handleCarouselUseCaseEvents(event: any) {
    if (event.name === 'transitionend') {
      this.carouselThumbsUseCase.select(this.carouselUseCase.slideCounter);
    }
  }

  getCountry(alpha3Code: string) {
    return COUNTRIES_DB.find((country) => country.alpha3Code === alpha3Code);
  }

  ngOnDestroy() {
    return;
  }
}
