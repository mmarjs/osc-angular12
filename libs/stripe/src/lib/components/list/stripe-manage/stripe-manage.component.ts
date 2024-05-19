import { Component } from '@angular/core';
import { StripeFacadeService } from '../../../store/facade';

@Component({
  selector: 'app-stripe-manage',
  templateUrl: './stripe-manage.component.html',
  styleUrls: ['./stripe-manage.component.scss'],
})
export class StripeManageComponent {
  readonly loading$ = this.stripeFacadeService.loading$;

  constructor(private readonly stripeFacadeService: StripeFacadeService) {}
}
