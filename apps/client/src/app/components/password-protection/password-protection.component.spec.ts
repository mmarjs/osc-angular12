import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { PasswordProtectionComponent } from './password-protection.component';

describe('PasswordProtectionComponent', () => {
  beforeEach(() => {
    TestBed.overrideComponent(PasswordProtectionComponent, {
      set: {
        providers: [
          {
            provide: 'ENVIRONMENT',
            useValue: {
              passwordProtected: { username: 'osc', password: 'test' },
            },
          },
        ],
      },
    });
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should show content with correct credentials', async () => {
    await render(
      `
     <app-password-protection>
        <h1>Content</h1>
     </app-password-protection>
     `,
      {
        declarations: [PasswordProtectionComponent],
        imports: [
          RouterTestingModule,
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
        ],
      }
    );

    await userEvent.type(screen.getByLabelText(/username/i), 'osc');
    await userEvent.type(screen.getByLabelText(/password/i), 'test');

    await userEvent.click(screen.getByText(/login/i));

    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it('should show error if not valid', async () => {
    await render(PasswordProtectionComponent, {
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
    });

    await userEvent.type(screen.getByLabelText(/username/i), 'broken-user');
    await userEvent.type(screen.getByLabelText(/password/i), 'test');

    await userEvent.click(screen.getByText(/login/i));

    expect(
      screen.getByText('Invalid username or password')
    ).toBeInTheDocument();
  });
});
