import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableCopy]'
})
export class DisableCopyDirective {
  constructor() { }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}
