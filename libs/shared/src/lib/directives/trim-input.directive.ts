import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[trimInput]'
})
export class TrimInputDirective {
  constructor() { }
  @Input('trimInput') trimInput: boolean;
  @HostListener('keyup', ['$event']) public onKeyup(event: KeyboardEvent): void {
    if (!this.trimInput) return;

    event.preventDefault()
    const target = event.target as HTMLInputElement
    const value = target.value;

    if (value.trim() == '') {
      target.value = '';
    }
    else if (value.endsWith(' ') && value.charAt(value.length - 2) == ' ') {
      target.value = value.trimEnd() + ' ';
    }
    else {
      target.value = value;
    }
  }
}
