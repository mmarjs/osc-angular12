import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxFileDropEntry, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'ocean-file-drop',
  template: `
  <div class="file-drop-container">
    <app-files-list [files]="files" (filesChange)="filesChange.emit($event)"></app-files-list>
    <ngx-file-drop [accept]="accept" (onFileDrop)="dropped($event)"
    (onFileOver)="fileOver($event)" (onFileLeave)="fileLeave($event)">
        <ng-template ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">
          <div (click)="openFileSelector()">
            <app-upload-input-mask>
            </app-upload-input-mask>
          </div>
          <p class="drop-files-hint">
            {{'FILES.DRAG_AND_DROP_HERE' | translate}}
          </p>
        </ng-template>
    </ngx-file-drop>
</div>
  `,
  styleUrls: ['./file-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDropComponent {
  @Output() filesChange: EventEmitter<NgxFileDropEntry[]> = new EventEmitter();
  @Input() accept = '';
  files: NgxFileDropEntry[] = [];

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.filesChange.emit(this.files);
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  fileOver(event: DragEvent) {
    console.log(event);
  }

  fileLeave(event: DragEvent) {
    console.log(event);
  }

}
