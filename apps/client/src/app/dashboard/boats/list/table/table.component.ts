import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BoatDatasource, BoatDialogs } from '@ocean/api/data';
import { Boat, BoatOutputDTO } from '@ocean/api/shared';
import { AuctionsFacade, BoatsFacade } from '@ocean/client/state';
import { getterPaginator, getterSort } from '@ocean/material';
import { ROUTES } from '@ocean/shared';
import { IconType } from '@ocean/icons';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-boats-list-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class BoatsListTableComponent implements OnInit, OnDestroy {
  @Input() isActionButtonHide = false;
  @Input() hidePageSize = false;
  @Input() source?: BoatDatasource;
  @Input() limit?: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  readonly columns = ['info', 'actions'];
  readonly iconType = IconType;

  activeBoatId?: number;

  constructor(
    private readonly dialogs: BoatDialogs,
    private readonly router: Router,
    private readonly boatFacade: BoatsFacade,
    private readonly auctionsFacade: AuctionsFacade
  ) {}

  ngOnInit() {
    this.source.pageSize = this.limit;
    this.source.setPaginator(this.paginator, getterPaginator(this.paginator));
    this.source.setSort(this.sort, getterSort(this.sort));
  }

  onDelete(e: MouseEvent, row: BoatOutputDTO) {
    e.preventDefault();
    e.stopPropagation();

    this.dialogs
      .deletePrompt(row)
      .pipe(untilDestroyed(this), take(1))
      .subscribe(() => this.refreshOnDelete());
  }

  handleRowClick(boat: Boat): void {
    if (!this.isActionButtonHide) {
      void this.router.navigate([ROUTES.link('BOATS'), boat.id]);
    } else {
      this.activeBoatId = boat.id;
      this.boatFacade.setSelectedBoat(boat);
    }
  }

  createAuction() {
    this.auctionsFacade.setSelectedAuction(undefined);
  }

  isLastElementOnPage() {
    return this.source.total % this.source.pageSize === 1;
  }

  refreshOnDelete() {
    if (this.isLastElementOnPage()) {
      this.paginator.previousPage();
    }

    this.source.refresh();
    this.auctionsFacade.refresh();
  }

  ngOnDestroy() {
    return;
  }
}
