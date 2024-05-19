import * as moment from 'moment';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, tap, zip } from 'rxjs';
import { first, switchMap, take } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MediaResponse, MediaService, MediaTransform } from '@ocean/api/client';
import { ErrorHandlingService } from '@ocean/api/client/error-handling.service';
import {
  User,
  UserPatchDTO,
  UserTypeTitle,
  UserTypeTitles,
} from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { NotifierService } from '@ocean/shared/services';
import { LocalizationService } from '@ocean/internationalization';
import { BoatUserComponent } from './forms/boat-user/boat-user.component';
import { ShipyardUserComponent } from './forms/shipyard-user/shipyard-user.component';
import {
  DEFAULT_SUPPORTED_MEDIA_IMAGES,
  DeletedFiles,
} from '@ocean/common/forms';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  readonly iconType = IconType;
  readonly supportedImageFormats = DEFAULT_SUPPORTED_MEDIA_IMAGES;

  readonly userTypes = UserTypeTitles;
  readonly mediaTransform = MediaTransform;

  fileArray: File[] = [];
  fileSelected: File | null = null;

  userAvatar: MediaResponse;
  images: MediaResponse[] = [];

  galleryForm: FormGroup;
  avatarForm: FormGroup;
  childForm: FormGroup;

  userType$: Observable<UserTypeTitle> = this.store.userType$;
  user$: Observable<User> = this.store.user$;
  isUpdating$: Observable<boolean> = this.store.isUpdating$;

  showUpload = true;
  isDisableAdditionalInfo = true;

  userId: string;

  @ViewChild('boatOwner') boatOwner: BoatUserComponent;
  @ViewChild('shipyard') shipyard: ShipyardUserComponent;

  constructor(
    public readonly store: UserFacade,
    private readonly fb: FormBuilder,
    private readonly mediaService: MediaService,
    private readonly userFacade: UserFacade,
    private readonly notifier: NotifierService,
    private readonly errorHandlingService: ErrorHandlingService,
    private readonly localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.galleryForm = this.fb.group({
      files: this.fb.array([]),
    });

    this.avatarForm = this.fb.group({
      files: this.fb.array([]),
    });

    this.userFacade.id$
      .pipe(
        tap((id) => (this.userId = id)),
        tap(this.getUserImages.bind(this)),
        switchMap(() => this.getUserAvatar(this.userId)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  ngOnDestroy() {}

  getUserAvatar(id: string) {
    return this.mediaService.getFilesByTags({ tags: `avatar-${id}` }).pipe(
      tap(([image]) => (this.userAvatar = image)),
      catchError((err) => this.errorHandlingService.handleError(err)),
      take(1)
    );
  }

  getUserImages(id: string, localImages: File[] = []) {
    const files = this.galleryForm.get('files') as FormArray;

    this.mediaService
      .getFilesByTags({
        tags: `profile,${id}`,
      })
      .pipe(
        tap((images) => {
          files.clear();

          images.forEach((img) => {
            files.push(
              this.fb.group({
                file: img.fileURL,
              })
            );
          });

          localImages.forEach((file) => {
            files.push(
              this.fb.group({
                file,
              })
            );
          });

          this.images = images;
          this.showUpload = true;
        }),
        catchError((err) => {
          return this.errorHandlingService.handleError(err);
        }),
        untilDestroyed(this),
        take(1)
      )
      .subscribe(() => {
        [this.fileArray, this.fileSelected] = [
          localImages.length > 0 ? localImages : [],
          localImages.length < 1 ? null : this.fileSelected,
        ];
      });
  }

  patchUser(patchDto: UserPatchDTO) {
    this.user$
      .pipe(
        tap((user) => {
          this.store.update({
            ...user,
            ...patchDto,
            phoneNumber: patchDto?.phoneNumber
              ? patchDto.phoneNumber
              : user?.phoneNo,
          });
        }),
        untilDestroyed(this),
        take(1)
      )
      .subscribe();
  }

  updateAvatar(file: File) {
    const payload = {
      file,
      tags: `avatar-${this.userId}`,
      title: 'avatar',
      fileId: this.userAvatar?.publicId,
      transformations: [MediaTransform.AVATAR],
    };

    const api$: Observable<MediaResponse> = this.userAvatar
      ? this.mediaService.updateFileWithTransformation(payload)
      : this.mediaService.uploadFileWithTransformation(payload);

    api$.pipe(untilDestroyed(this), take(1)).subscribe({
      next: (img) => {
        this.userAvatar = img;
        this.notifier.success(
          this.localizationService.translate('PROFILE.AVATAR.UPDATED')
        );
      },
      error: (err) => this.errorHandlingService.handleError(err),
    });
  }

  onUploadImages() {
    this.showUpload = false;
    this.mediaService
      .uploadMultipleFilesWithTransformation({
        files: this.fileArray.map((f) => f),
        tags: `profile,${this.userId}`,
        title: `profile${this.userId}`,
        transformations: [
          MediaTransform.CAROUSEL_MAIN,
          MediaTransform.CAROUSEL_THUMB,
        ],
      })
      .pipe(
        tap(() => this.getUserImages(this.userId)),
        catchError((err) => this.errorHandlingService.handleError(err)),
        untilDestroyed(this),
        take(1)
      )
      .subscribe(() => {
        this.fileArray = [];
        this.fileSelected = null;
      });
  }

  onDeleteImages({ urls, deletedFiles }: DeletedFiles) {
    this.showUpload = false;

    this.fileArray = this.fileArray.filter((fileFromArray) =>
      deletedFiles.every(
        (deletedFile) => fileFromArray?.name !== deletedFile?.name
      )
    );

    const files = this.images?.filter((image) =>
      urls.some((url) => url === image?.fileURL)
    );

    if (files.length < 1) {
      this.getUserImages(this.userId, this.fileArray);
    } else {
      this.mediaService
        .deleteMultipleFiles({
          files,
        })
        .pipe(
          tap(() => this.getUserImages(this.userId, this.fileArray)),
          catchError((err) => this.errorHandlingService.handleError(err)),
          untilDestroyed(this),
          take(1)
        )
        .subscribe(() => {
          this.showUpload = true;
        });
    }
  }

  onFileCheck(event: File) {
    this.fileArray.push(event);
    this.fileSelected = event;
  }

  updateAdditionalInfo() {
    this.isDisableAdditionalInfo = !this.isDisableAdditionalInfo;

    zip([this.userType$, this.user$])
      .pipe(untilDestroyed(this), take(1))
      .subscribe((userTypeAndUserData) => {
        const [type, user] = userTypeAndUserData;
        this.setChildForm(type);

        this.patchUser({
          ...user,
          ...this.childForm?.value,
          dob: this.childForm?.value?.dob
            ? moment(this.childForm.value.dob).format('YYYY-MM-DD')
            : null,
          cell: this.childForm?.value?.cell
            ? this.childForm?.value?.cell?.e164Number
            : null,
        });
      });
  }

  setChildForm(role: UserTypeTitle) {
    this.childForm = null;

    if (role === UserTypeTitles.BOAT_OWNER) {
      this.childForm = this.boatOwner.form;
    } else if (role === UserTypeTitles.SHIPYARD) {
      this.setNullValueForEmptyString(this.shipyard.form); // Currently API is not accepting empty string
      this.childForm = this.shipyard.form;
    }
  }

  setNullValueForEmptyString(form: FormGroup) {
    for (const key in form.value) {
      if (form.value[key] === '') {
        form.value[key] = null;
      }
    }
  }

  deleteAvatar() {
    this.mediaService
      .deleteFile({ fileId: this.userAvatar.publicId })
      .pipe(
        first(),
        switchMap(() => this.getUserAvatar(this.userId)),
        tap(() => {
          this.notifier.success(
            this.localizationService.translate('PROFILE.AVATAR.DELETED')
          );
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
