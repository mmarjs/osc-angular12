/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { toggle } from '@ocean/animations';
import { BidItem, JobItem } from '@ocean/api/shared';

@Component({
  selector: 'ocean-bid-items-table',
  templateUrl: './bid-items-table.component.html',
  styleUrls: ['./bid-items-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toggle()]
})
export class BidItemsTableComponent {
  @Input() bidItems!: BidItem[];
  columns: string[] = ['id', 'title', 'quantity', 'bid'];
  expandedElement: JobItem | null;
}
