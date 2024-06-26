import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DeletedFiles } from '@ocean/common/forms';
import { FileType } from '@ocean/shared/utils/read-file-async';

@Component({
  selector: 'app-boats-create-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class BoatsCreateMediaComponent {
  @Input() form: FormGroup | undefined;

  get files() {
    return this.form?.get('files') as FormArray | undefined;
  }

  constructor(private readonly fb: FormBuilder) {}

  onDeleteImages({ deletedFiles }: DeletedFiles) {
    const filtered =
      (this.files?.value?.filter(
        (item) =>
          !deletedFiles.some(
            (deletedFile) => item?.file?.name === deletedFile.name
          )
      ) as FileType[]) ?? [];

    this.files?.clear();

    filtered.forEach((item: FileType) =>
      this.files?.push(
        this.fb.group({
          file: item instanceof File ? item : item.file,
        })
      )
    );
  }
}
