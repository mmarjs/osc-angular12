import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileRatingsComponent {
  rate = 3.5;
}
