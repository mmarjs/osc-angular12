import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[appDetectKey]'
})
export class DetectKeyDirective {
  @Input() appDetectKey: number; // pass the key to detect

  @Output() keyPressed = new EventEmitter<any>();

  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // TODO support more than one key
    if (this.appDetectKey) {
      if (e.keyCode === this.appDetectKey) {
        e.preventDefault();
        this.keyPressed.emit();
      }
    }
  }
}
