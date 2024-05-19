import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getFormattedTimeZones } from '@ocean/shared/utils/timeZones';

@Component({
  selector: 'app-boats-create-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class BoatsCreateLocationComponent {
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

  @Input() form: FormGroup;

  get select() {
    return this.form.get('country');
  }

  readonly timeZones = getFormattedTimeZones();

  constructor() {}

  onSubmit() {
    return this.submit.emit();
  }
}
