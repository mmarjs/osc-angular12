import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { API_ENVIRONMENT } from '@ocean/api/shared';
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
import userEvent from '@testing-library/user-event';
import { MockPipe, MockProvider } from 'ng-mocks';
import { Observable } from 'rxjs';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let actions$: Observable<any>;

  const deps = {
    imports: [
      NoopAnimationsModule,
      RouterTestingModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
    ],
    declarations: [
      SignupComponent,
      FormatTypePipe,
      MockPipe(TranslatePipe, (v) => v),
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
      provideMockStore(),
      provideMockActions(() => actions$),
    ],
  };

  it('should show error for invalid first name', async () => {
    await render(SignupComponent, {
      ...deps,
    });

    const inputName = screen.getByLabelText(/FORMS.LABELS.FIRST_NAME */i);

    await userEvent.type(inputName, 'John-123');
    await userEvent.tab();

    expect(inputName).toHaveValue('John-123');

    expect(screen.queryByText(/FORMS.ERRORS.NAME/i)).toBeInTheDocument();
  });

  it('should show error for invalid last name', async () => {
    await render(SignupComponent, { ...deps });

    const inputName = screen.getByLabelText(/FORMS.LABELS.LAST_NAME */i);

    await userEvent.type(inputName, 'last-name-123');
    await userEvent.tab();

    expect(inputName).toHaveValue('last-name-123');

    expect(screen.queryByText(/FORMS.ERRORS.NAME/i)).toBeInTheDocument();
  });
});
