import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-form-gallery-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class FormGalleryUploadComponent {
  @ViewChild('file', { static: true }) input: ElementRef;

  @Input()
  accept: string;

  @Input()
  multiple: boolean;

  @Output()
  upload = new EventEmitter<File>();

  @HostListener('click')
  onclick() {
    this.input.nativeElement.click();
  }

  doUpload(files: FileList) {
    Array.from(files).map((file) => this.upload.emit(file));
    this.input.nativeElement.value = null;
  }
}
