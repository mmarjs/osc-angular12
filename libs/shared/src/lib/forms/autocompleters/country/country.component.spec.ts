import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TrimInputDirective } from '@ocean/shared/directives';
import { render } from '@testing-library/angular';
import { getCountriesForTimezone } from 'countries-and-timezones';
import { MockPipe } from 'ng-mocks';
import { CountryComponent } from './country.component';

jest.mock('countries-and-timezones', () => ({
  getCountriesForTimezone: jest.fn(),
}));

describe('CountryComponent', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  it('should take first country as default', async () => {
    jest.mocked(getCountriesForTimezone).mockReturnValueOnce([
      { id: 'UA', name: 'Ukraine', timezones: [] },
      { id: 'CH', name: 'Switzerland', timezones: [] },
    ]);

    const form = new FormGroup({
      country: new FormControl({ alpha2Code: 'DE' }),
    });
    await render(
      `<div [formGroup]="form">
          <app-country formControlName="country" label="Country"></app-country>
       </div>`,
      {
        imports: [
          MatSelectCountryModule.forRoot('en'),
          ReactiveFormsModule,
          HttpClientTestingModule,
        ],
        declarations: [
          CountryComponent,
          MockPipe(TranslatePipe, (v) => v),
          TrimInputDirective,
        ],
        providers: [],
        componentProperties: { form },
      }
    );

    expect(form.value).toHaveProperty('country.alpha2Code', 'DE');
  });

  it('should take first country as default', async () => {
    jest.mocked(getCountriesForTimezone).mockReturnValueOnce([
      { id: 'UA', name: 'Ukraine', timezones: [] },
      { id: 'CH', name: 'Switzerland', timezones: [] },
    ]);

    const form = new FormGroup({ country: new FormControl() });
    await render(
      `<div [formGroup]="form">
          <app-country formControlName="country" label="Country"></app-country>
       </div>`,
      {
        imports: [
          MatSelectCountryModule.forRoot('en'),
          ReactiveFormsModule,
          HttpClientTestingModule,
        ],
        declarations: [
          CountryComponent,
          MockPipe(TranslatePipe, (v) => v),
          TrimInputDirective,
        ],
        providers: [],
        componentProperties: { form },
      }
    );

    expect(form.value).toHaveProperty('country.alpha2Code', 'UA');
  });

  it('should set US as default', async () => {
    jest.mocked(getCountriesForTimezone).mockReturnValueOnce([]);

    const form = new FormGroup({ country: new FormControl() });
    await render(
      `<div [formGroup]="form">
          <app-country formControlName="country" label="Country"></app-country>
       </div>`,
      {
        imports: [
          MatSelectCountryModule.forRoot('en'),
          ReactiveFormsModule,
          HttpClientTestingModule,
        ],
        declarations: [
          CountryComponent,
          MockPipe(TranslatePipe, (v) => v),
          TrimInputDirective,
        ],
        providers: [],
        componentProperties: { form },
      }
    );

    expect(form.value).toHaveProperty('country.alpha2Code', 'US');
  });
});
