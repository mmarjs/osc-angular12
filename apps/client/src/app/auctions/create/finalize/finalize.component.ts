import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getDiffInDays } from '@ocean/shared';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalizeComponent {
  @Input() form: FormGroup;
  @Input() isStarted: boolean;

  get minDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);
    return today;
  }

  get days() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { auctionEndDate } = this.form?.value;
    if (!auctionEndDate) {
      return 0;
    }

    return getDiffInDays(auctionEndDate, today);
  }

  onDaysChange(value: string) {
    const days = +value;
    if (isNaN(days) || days <= 0) {
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + days);
    this.form.patchValue({ auctionEndDate: today });
  }
}
