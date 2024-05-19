import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NotifierService } from '@ocean/shared/services';
import { FormGalleryUploadComponent } from './upload';
import { MatDialog } from '@angular/material/dialog';
import { PromptDialogComponent } from '@ocean/shared/dialogs';
import { take } from 'rxjs/operators';
import { LocalizationService } from '@ocean/internationalization';
import { MediaResponse } from '@ocean/api/client';
import { UploadItemType } from './item';

export const DEFAULT_SUPPORTED_MEDIA_FORMATS = `image/gif, image/jpg, video/mpeg, image/jpeg, image/webp, image/png, image/x-icon, image/bmp, image/tiff, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword`;
export const DEFAULT_SUPPORTED_MEDIA_IMAGES =
  DEFAULT_SUPPORTED_MEDIA_FORMATS.split(', ')
    .filter((i) => i.includes('image'))
    .join(',');

export const NON_IMAGE_EXTENSION = ['.pdf', '.doc', '.docx'];

export interface DeletedFiles {
  urls: string[];
  deletedFiles: File[];
}

const MULTIPLE_FILE_DELETING_KEY = 'Control';

@Component({
  selector: 'app-form-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormGalleryComponent),
      multi: true,
    },
  ],
})
export class FormGalleryComponent {
  readonly uploadItemType = UploadItemType;

  @Input()
  multiple = true;

  @Input() form: FormGroup;
  get files() {
    return this.form?.get('files') as FormArray | undefined;
  }

  @Input() media: MediaResponse[] = [];

  @Input()
  accept: string = DEFAULT_SUPPORTED_MEDIA_FORMATS;

  @Input()
  id: number;

  @Input()
  set editable(value: any) {
    this._editable = coerceBooleanProperty(value);
  }

  @ViewChild('uploader') uploader: FormGalleryUploadComponent;

  @Output()
  fileAdded = new EventEmitter<File>();

  @Output()
  filesDeleted = new EventEmitter<DeletedFiles>();

  protected _editable = false;

  private _multiDeleting = false;
  private _multiDeleteData: DeletedFiles[] = [];

  @HostListener('appDropZone', ['$event'])
  onDrop(event: Array<File>) {
    event.forEach((file) => {
      this.addItem(file);
    });
  }

  @HostListener('window:keyup', ['$event'])
  private onSelectKeyUp(event: KeyboardEvent) {
    if (event.key === MULTIPLE_FILE_DELETING_KEY) {
      if (this._multiDeleting) {
        const filesToDelete = this._multiDeleteData.reduce(
          (acc, cur) => {
            return {
              urls: [...acc.urls, ...cur.urls],
              deletedFiles: [...acc.deletedFiles, ...cur.deletedFiles],
            };
          },
          {
            urls: [],
            deletedFiles: [],
          }
        );

        this.deleteItems(filesToDelete);
      }

      this._multiDeleting = false;
      this._multiDeleteData = [];
    }
  }

  @HostListener('window:keydown', ['$event'])
  private onSelectKeyPress(event: KeyboardEvent) {
    this._multiDeleting =
      event.key === MULTIPLE_FILE_DELETING_KEY && this.multiple;
  }

  private deleteItems({ urls, deletedFiles }: DeletedFiles): void {
    if (
      (!Array.isArray(urls) || urls?.length === 0) &&
      (!Array.isArray(deletedFiles) || deletedFiles?.length === 0)
    ) {
      return;
    }

    this.dialog
      .open(PromptDialogComponent, {
        data: {
          title: this.localizationService.translate(
            'DIALOGS.GALLERY_IMAGES.TITLE'
          ),
          content: this.localizationService.translate(
            'DIALOGS.GALLERY_IMAGES.DESC',
            {
              length: deletedFiles?.length ?? 0,
            }
          ),
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmDelete) => {
        this.dialog.closeAll();
        if (confirmDelete) {
          this.filesDeleted.emit({ urls, deletedFiles });
        }
      });
  }

  isImageFiles(control: AbstractControl): boolean {
    const file = control.value?.file;
    const isTypeImage = file?.type?.startsWith('image');
    const isExtensionImage =
      typeof file === 'string' &&
      file?.startsWith('http') &&
      !NON_IMAGE_EXTENSION.some((ext) => file?.endsWith(ext));

    return isTypeImage || isExtensionImage;
  }

  constructor(
    private readonly builder: FormBuilder,
    private readonly notifier: NotifierService,
    private readonly dialog: MatDialog,
    private readonly localizationService: LocalizationService
  ) {}

  isItemMultiSelected(item: AbstractControl): boolean {
    const { file } = item?.value ?? {};
    return (
      this._multiDeleteData?.findIndex((element) =>
        element?.deletedFiles?.includes(file)
      ) > -1
    );
  }

  unselectFromMultiDeleting(url: string) {
    this._multiDeleteData = this._multiDeleteData?.filter(
      (file) => !file?.urls?.includes(url)
    );
  }

  addItem(file: File) {
    if (!this.accept.includes(file.type)) {
      return this.notifier.error(
        this.localizationService.translate('MEDIA.INVALID_FORMAT', {
          file: file.name,
        })
      );
    }

    if (
      this.files?.value?.some((entity) =>
        entity instanceof File
          ? entity?.name === file?.name
          : entity?.file?.name === file?.name
      )
    ) {
      return this.notifier.info(
        this.localizationService.translate('MEDIA.DUPLICATED_FILE', {
          name: file.name,
        })
      );
    }

    if (!this.multiple) {
      this.files.clear();
    }

    this.files.push(
      this.builder.group({
        file,
      })
    );

    this.fileAdded.emit(file);
  }

  selectItem(url: string, file: AbstractControl) {
    if (this._multiDeleting) {
      this._multiDeleteData.push({
        urls: [url],
        deletedFiles: [file.value?.file],
      });
    } else {
      this.deleteItems({
        urls: [url],
        deletedFiles: [file.value?.file],
      });
    }
  }
}
