import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  HostBinding,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bid } from '@ocean/api/shared';
import { PATHS } from '@ocean/shared/routing';

@Component({
  selector: 'app-acept-bid',
  templateUrl: './acept-bid.component.html',
  styleUrls: ['./acept-bid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AceptBidComponent {
  @HostBinding('class') cssClasses = 'app-dialog app-prompt';
  PATHS = PATHS;
  constructor(
    public dialogRef: MatDialogRef<AceptBidComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public bid: Bid
  ) { }
}
