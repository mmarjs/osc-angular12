import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JobDTO } from '@ocean/api/shared';

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionInfoComponent {
  @Input() auction: JobDTO;
  @Input() bidAmount: number;
}
