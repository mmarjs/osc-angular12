import { Component, OnInit } from '@angular/core';
import { Bid, PagedResponse } from '@ocean/api/shared';
import { delay, map, Observable, tap } from 'rxjs';
import { BidsFacade } from '@ocean/client/state';

@Component({
  selector: 'app-my-bids-widget',
  templateUrl: './my-bids-widget.component.html',
  styleUrls: ['./my-bids-widget.component.scss']
})
export class MyBidsWidgetComponent implements OnInit {
  sourceObservable: Observable<PagedResponse<Bid>>;
  isLoading: boolean = true;
  constructor(
    private bidsFacade: BidsFacade
  ) {}

  ngOnInit() {
    const pageable = {
      page: 0,
      size: 10
    };
    this.bidsFacade.loadMyBids({pageable});
    this.sourceObservable = this.bidsFacade.pagedDataOfMyBids$.pipe(
      tap(() => this.isLoading = true),
      delay(500),
      map(res => {
        this.isLoading = false;
        return res;
      })
    );
  }

}
