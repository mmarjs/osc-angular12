import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Boat } from '@ocean/api/shared';

@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoatDetailsComponent {
  @Output() bidOnRepair: EventEmitter<void> = new EventEmitter();

  @Input() boat: Boat;
  @Input() status: boolean;
}
