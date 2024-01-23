import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf, } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, NG_VALIDATORS, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { MediaResponse } from '@ocean/api/client';

export enum UploadItemType {
  IMAGE = 'IMAGE',
  OTHER = 'OTHER',
}

interface Value {
  file: File | string | ArrayBuffer | undefined;
}

@Component({
  selector: 'app-form-gallery-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormGalleryItemComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormGalleryItemComponent),
      multi: true,
    },
  ],
})
export class FormGalleryItemComponent implements OnInit {
  readonly uploadItemType = UploadItemType;

  private _control: AbstractControl | undefined;

  @Input() type: UploadItemType | undefined;
  @Input() formGroupName: string | number;
  @Input() selected: boolean;
  @Input() media: MediaResponse[] = [];

  @Output() change = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() unselected = new EventEmitter<string>();

  value: Value['file'];
  fileName = '';

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private readonly parent: ControlContainer,
    private readonly cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (coerceBooleanProperty(this.formGroupName)) {
      const parent = this.parent.control as AbstractControl;
      this._control = (parent as FormArray).controls[this.formGroupName];
      this.writeValue(this._control?.value);
    }
  }

  onDelete(url: string) {
    this.delete.emit(url);
  }

  onUnselect(url: string) {
    this.unselected.emit(url);
  }

  writeValue(value: Value): void {
    if (value === null || value === undefined || !(typeof value?.file === 'string' || value?.file instanceof File)) {
      return;
    }

    if (typeof value.file === 'string') {
      this.value = value.file;
      if (Array.isArray(this.media)) {
        const mediaInfo = this.media.find(
          (f) => f.fileURL === value.file || f.secureFileURL === value.file
        );
        this.fileName = mediaInfo?.originalFilename;
      }
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(value.file);
    reader.onload = () => {
      this.value = reader.result;
      this.cd.detectChanges();
    };
    this.fileName = value.file.name;
  }

  validate() {
    return null;
  }
}
