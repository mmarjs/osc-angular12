import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from '@ocean/shared';
import { Observable, scan, takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-count-with-navigation',
  templateUrl: './count-with-navigation.component.html',
  styleUrls: ['./count-with-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountWithNavigationComponent {
  @Input() appLink: string;
  @Input() message: string;
  @Input() btnText: string;
  count$: Observable<number> = timer(0, 1000)
    .pipe(
      scan(acc => --acc, 5),
      takeWhile(x => x >= 0),
      tap(x => x === 0 && this.router.navigateByUrl(PATHS['DASHBOARD'])
      )
    );

  constructor(private router: Router) { }
}
