import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalizeComponent {
  @Input() form: FormGroup;
  @Input() isStarted: boolean;
  minDate: Date = new Date();
  startDt: any;
  onch(){
    // this.startDt = this.form.get('auctionStartDate').value; 
    this.startDt = new Date();
  }
}
