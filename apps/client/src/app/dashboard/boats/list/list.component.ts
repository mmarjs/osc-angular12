import { Component, Input, OnInit } from '@angular/core';
import { BoatDatasource } from '@ocean/api/data';
import { BoatsFacade } from '@ocean/client/state';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-boats-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [BoatDatasource]
})
export class BoatsListComponent implements OnInit {
  @Input() isOnlyTable = false;
  @Input() hidePageSize = false;
  @Input() limit: number;

  hasRecords: boolean;

  private searchKey: string;
  private search$ = new Subject();

  constructor(
    public source: BoatDatasource,
    private store: BoatsFacade,
  ) {}

  ngOnInit() {
    this.store.total$.subscribe(total => (this.hasRecords = total > 0));
    this.source.addOptional({
      stream: this.search$,
      getter: () => ({ searchKey: this.searchKey })
    });
  }

  onSearch(query: string) {
    this.searchKey = query || undefined;
    this.search$.next(query);
  }


}
