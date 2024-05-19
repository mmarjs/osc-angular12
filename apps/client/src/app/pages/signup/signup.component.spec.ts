import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { API_ENVIRONMENT, userTypes, UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { LocalizationService } from '@ocean/internationalization';
import {
  EmailFieldComponent,
  NumberOnlyDirective,
  PasswordConfirmFieldComponent,
  PasswordFieldComponent,
  TextFieldComponent,
  TrimInputDirective,
} from '@ocean/shared';
import { FormatTypePipe } from '@ocean/shared/pipes/format-type.pipe';
import { mockEnvironment } from '@ocean/testing';
import { render, screen } from '@testing-library/angular';
import { TextMaskModule } from 'angular2-text-mask';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { SignupComponent } from './signup.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { ShipyardSurveyorSignupComponent } from './forms/shipyard-surveyor-signup/shipyard-surveyor-signup.component';

describe('SignupComponent', () => {
  const params$ = new BehaviorSubject<{ [key: string]: string }>({});

  const deps = {
    imports: [
      NoopAnimationsModule,
      RouterTestingModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      TextMaskModule,
    ],
    declarations: [
      SignupComponent,
      FormatTypePipe,
      MockPipe(TranslatePipe, (v) => v),
      MockComponent(ShipyardSurveyorSignupComponent),
      TextFieldComponent,
      EmailFieldComponent,
      PasswordFieldComponent,
      PasswordConfirmFieldComponent,
      NumberOnlyDirective,
      TrimInputDirective,
    ],
    providers: [
      { provide: API_ENVIRONMENT, useValue: mockEnvironment },
      MockProvider(LocalizationService),
      MockProvider(UserFacade),
      provideMockStore(),
      MockProvider(ActivatedRoute, {
        params: params$,
      }),
    ],
  };

  it('should render', async () => {
    await render(SignupComponent, { ...deps });
  });

  it('if shipyard param passed should preselect it in dropdown', async () => {
    const { fixture } = await render(SignupComponent, { ...deps });
    params$.next({
      role: UserTypeTitles.SHIPYARD,
    });

    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);

    const select = await loader.getHarness(MatSelectHarness);
    const text = await select.getValueText();

    expect(text).toEqual('Shipyard');
  });

  it('if surveyor param passed should preselect it in dropdown', async () => {
    const { fixture } = await render(SignupComponent, { ...deps });
    params$.next({
      role: UserTypeTitles.SURVEYOR,
    });

    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);

    const select = await loader.getHarness(MatSelectHarness);
    const text = await select.getValueText();

    expect(text).toEqual('Surveyor');
  });


  it('if Boat Owner param passed should preselect it in dropdown', async () => {
    const { fixture } = await render(SignupComponent, { ...deps });
    params$.next({
      role: UserTypeTitles.BOAT_OWNER,
    });

    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);

    const select = await loader.getHarness(MatSelectHarness);
    const text = await select.getValueText();

    expect(text).toEqual('Boat Owner');
  });

  it('should preselect Boat Owner in dropdown if no param passed', async () => {
    const { fixture } = await render(SignupComponent, { ...deps });
    params$.next({
      role: undefined,
    });

    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);

    const select = await loader.getHarness(MatSelectHarness);
    const text = await select.getValueText();

    expect(text).toEqual('Boat Owner');
  });
});
