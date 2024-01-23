import { JobProvider } from '@ocean/api/services';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Job } from '@ocean/api/shared';
import { MediaResponse } from '@ocean/api/client';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-auction-detail-card',
  templateUrl: './auction-detail-card.component.html',
  styleUrls: ['./auction-detail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionDetailCardComponent {
  @Input() auction: Job;

  images$: Observable<MediaResponse[]>;
  constructor(private jobs: JobProvider) {}

  ngOnInit(): void {
    this.images$ = this.jobs.getAssociatedMedia(this.auction?.id)
    .pipe(
      tap(console.log.bind(console, 'images$'))
    )
  }
}
