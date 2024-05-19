import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StripeForm } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { MediaService } from '@ocean/api/client';
import { StripeFacadeService } from '../../../store/facade';
import { map } from 'rxjs';
import { StripeAccountValidationStatus } from '../../../helpers/stripe-account-validation';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-stripe-account-preview',
  templateUrl: './stripe-account-preview.component.html',
  styleUrls: ['./stripe-account-preview.component.scss'],
})
export class StripeAccountPreviewComponent {
  @Input()
  readonly form?: FormGroup;

  @Output()
  readonly submitted = new EventEmitter<void>();

  readonly iconType = IconType;
  readonly VALIDATION_STATUS = StripeAccountValidationStatus;

  readonly errors$ = this.stripeFacadeService.validationErrors$.pipe(
    map(({ errors }) => Object.values(errors ?? {}))
  );

  readonly status$ = this.stripeFacadeService.validationErrors$.pipe(
    map(({ status }) => status)
  );

  readonly avatar$ = this.userFacade.avatar(this.mediaService);

  readonly loading$ = this.stripeFacadeService.loading$;

  get addressLine1() {
    return this.pair(['state', 'province', 'region'], ['city']);
  }

  get addressLine2() {
    return this.pair(
      ['line1', 'line2'],
      [this.get('country')?.alpha2Code, 'postalCode']
    );
  }

  constructor(
    private readonly stripeFacadeService: StripeFacadeService,
    private readonly userFacade: UserFacade,
    private readonly mediaService: MediaService
  ) {}

  get<T extends keyof StripeForm>(
    field?: T | string
  ): StripeForm[T] | undefined {
    const control = this.form?.get(field ?? '');
    if (control instanceof FormControl) {
      return control.value ?? '';
    }

    return (field ?? '') as StripeForm[T];
  }

  isAbleToShowAddress() {
    return this.addressLine1.length || this.addressLine2.length;
  }

  pair(
    first: (keyof StripeForm | string | undefined)[],
    second: (keyof StripeForm | string | undefined)[]
  ): string {
    const firstValues = first.map((field) => this.get(field)).join(' ');
    const secondValues = second.map((field) => this.get(field)).join(' ');

    if (!firstValues.trim().length || !secondValues.trim().length) {
      return '';
    }

    return [firstValues, secondValues]
      .filter((value) => value?.length)
      .join(', ');
  }
}
