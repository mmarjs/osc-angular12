import { Component } from '@angular/core';
import { JobDatasource } from '@ocean/api/data';

@Component({
  selector: 'app-auctions-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [JobDatasource]
})
export class AuctionsListComponent {
  limit: number;

  constructor(
    public readonly source: JobDatasource
  ) {
  }
}
