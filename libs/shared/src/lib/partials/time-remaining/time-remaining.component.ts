import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TimeCounter } from '@ocean/api/shared';
import { getTimeDiffBetweenDates } from '@ocean/shared';
import { map, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-time-remaining',
  templateUrl: './time-remaining.component.html',
  styleUrls: ['./time-remaining.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeRemainingComponent {
  @Input() date: string;
  timeCounter$: Observable<TimeCounter> = timer(0, 10000)
    .pipe(
      map(() => getTimeDiffBetweenDates(new Date(), new Date(this.date)))
    );
}
