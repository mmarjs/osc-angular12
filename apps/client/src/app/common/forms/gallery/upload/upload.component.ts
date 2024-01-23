import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-form-gallery-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class FormGalleryUploadComponent implements OnInit {
  @Input()
  accept: string;

  @Input()
  multiple: boolean;

  @Output() upload = new EventEmitter<File>();

  @ViewChild('file', { static: true }) input: ElementRef;

  constructor() { }

  ngOnInit() { }

  @HostListener('click')
  onclick() {
    this.input.nativeElement.click();
  }

  doUpload(files: FileList) {
    Array.from(files).map((file) => this.upload.emit(file));
  }
}
