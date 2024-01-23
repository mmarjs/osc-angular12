import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconType } from '@ocean/icons';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-files-list',
  template: `
      <mat-list class="files-list">
        <mat-list-item *ngFor="let item of files; let i=index">
        <span class="file-item-name">{{ item.relativePath }}</span>
        <button mat-icon-button (click)="removeAt(i)" class="remove-file-btn">
          <ocean-icon [iconType]="iconType.DELETE"></ocean-icon>
          {{'COMMON.BUTTONS.REMOVE' | translate}}
        </button>
      </mat-list-item>
    </mat-list>
  `,
  styleUrls: ['./files-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesListComponent {
  @Output() filesChange: EventEmitter<NgxFileDropEntry[]> = new EventEmitter();
  @Input() files: NgxFileDropEntry[] = [];
  iconType = IconType;

  removeAt(index: number): void {
    this.files.splice(index, 1);
    this.filesChange.emit(this.files);
  }
}
