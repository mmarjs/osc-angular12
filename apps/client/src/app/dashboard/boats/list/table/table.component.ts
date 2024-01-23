import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BoatDatasource, BoatDialogs } from '@ocean/api/data';
import { Boat, BoatOutputDTO } from '@ocean/api/shared';
import { AuctionsFacade, BoatsFacade } from '@ocean/client/state';
import { getterPaginator, getterSort } from '@ocean/material';
import { ROUTES } from '@ocean/shared';

@Component({
  selector: 'app-boats-list-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class BoatsListTableComponent implements OnInit {
  columns = ['info', 'actions'];
  // MatPaginator Output
  pageEvent: PageEvent;
  activeBoatId: number;

  @Input() isActionButtonHide = false;
  @Input() source: BoatDatasource;
  @Input() hidePageSize = false;
  @Input() limit: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialogs: BoatDialogs,
    private router: Router,
    private boatFacade: BoatsFacade,
    private auctionsFacade: AuctionsFacade
  ) { }

  ngOnInit() {
    this.source.pageSize = this.limit;
    this.source.setPaginator(this.paginator, getterPaginator(this.paginator));
    this.source.setSort(this.sort, getterSort(this.sort));
  }

  onDelete(e: MouseEvent, row: BoatOutputDTO) {
    e.preventDefault();
    e.stopPropagation();

    this.dialogs.deletePrompt(row).subscribe(() => this.source.refresh());
  }

  handleRowClick(boat: Boat): void {
    if (!this.isActionButtonHide) {
      this.router.navigate([ROUTES.link('BOATS'), boat.id]);
    } else {
      this.activeBoatId = boat.id;
      // this.router.navigate([ROUTES.link('SERVICES_BOATS'), id]);
      this.boatFacade.setSelectedBoat(boat);
    }
  }

 createAuction(){
   this.auctionsFacade.setSelectedAuction(undefined);
 }

}
