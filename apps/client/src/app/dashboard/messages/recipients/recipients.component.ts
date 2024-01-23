import {
  AfterContentInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { fromEvent, of } from 'rxjs';
import { mergeMap, sampleTime } from 'rxjs/operators';
import { MOCK_THREADS } from './threads.mock';

@Component({
  selector: 'app-messages-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesRecipientsComponent
  implements OnInit, OnDestroy, AfterContentInit {
  active = 0;
  threads = MOCK_THREADS;

  @ViewChild('scroll', { static: true })
  scroll: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  ngAfterContentInit() {
    const lastPosition = { scrolled: 0 };
    fromEvent(this.scroll.nativeElement, 'scroll')
      .pipe(
        untilDestroyed(this),
        sampleTime(300),
        mergeMap((ev: any) => of(this.calculatePoints()))
      )
      .subscribe((pos: any) => this.handleScroll(pos, lastPosition));
  }

  // TODO move to a Directive with Output event
  private calculatePoints() {
    const el = this.scroll.nativeElement;
    return {
      height: el.offsetHeight,
      scrolled: el.scrollTop,
      total: el.scrollHeight
    };
  }

  private handleScroll(position, lastPosition) {
    if (position.height + position.scrolled === position.total) {
      // fetch more threads
    }
    lastPosition.scrolled = position.scrolled;
  }
}
