import { Component, OnInit } from '@angular/core';
import { UserAuctionsDatasource } from '@ocean/api/data';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.scss'],
  providers: [UserAuctionsDatasource],
})
export class MyAuctionsComponent implements OnInit {
  private searchKey: string;
  private search$ = new Subject();

  constructor(public readonly source: UserAuctionsDatasource) {
  }

  ngOnInit() {
    this.source.addOptional({
      stream: this.search$,
      getter: () => ({searchKey: this.searchKey}),
    });
  }
}
