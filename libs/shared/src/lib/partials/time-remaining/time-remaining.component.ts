import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { getTimeDiffBetweenDates } from '@ocean/shared';
import { map, timer } from 'rxjs';

const TIME_RESOLUTION = 10_000;

@Component({
  selector: 'app-time-remaining',
  templateUrl: './time-remaining.component.html',
  styleUrls: ['./time-remaining.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRemainingComponent {
  @Input() date: string;
  timeCounter$ = timer(0, TIME_RESOLUTION).pipe(
    map(() => getTimeDiffBetweenDates(new Date(), new Date(this.date))),
  );
}
