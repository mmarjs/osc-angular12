import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslatePipe } from '@ngx-translate/core';
import { render, screen } from '@testing-library/angular';
import { MockPipe } from 'ng-mocks';
import { CheckboxComponent } from './checkbox.component';
import userEvent from '@testing-library/user-event';

describe('CheckboxComponent', () => {
  it('should add * when field has required validator', async () => {
    await render(
      `
      <div [formGroup]="form">
        <app-checkbox formControlName="checkbox" label="Checkbox"></app-checkbox>
      </div>
    `,
      {
        imports: [MatCheckboxModule, ReactiveFormsModule],
        declarations: [
          MockPipe(TranslatePipe, (value) => value),
          CheckboxComponent,
        ],
        componentProperties: {
          form: new FormGroup({
            checkbox: new FormControl(false, [Validators.required]),
          }),
        },
      }
    );

    expect(await screen.findByText(/Checkbox\s+\*/)).toBeInTheDocument();
  });

  it('should change checkbox value when clicked', async () => {
    const form = new FormGroup({
      checkbox: new FormControl(false, [Validators.required]),
    });
    await render(
      `
      <div [formGroup]="form">
        <app-checkbox formControlName="checkbox" label="Check me"></app-checkbox>
      </div>
    `,
      {
        imports: [MatCheckboxModule, ReactiveFormsModule],
        declarations: [
          MockPipe(TranslatePipe, (value) => value),
          CheckboxComponent,
        ],
        componentProperties: {
          form,
        },
      }
    );

    expect(
      screen.queryByRole('checkbox', { name: 'Check me' })
    ).not.toBeChecked();

    await userEvent.click(screen.getByRole('checkbox', { name: 'Check me' }));

    expect(screen.queryByRole('checkbox', { name: 'Check me' })).toBeChecked();
    expect(form.value).toEqual({ checkbox: true });
  });

  it('should be disabled when form control is disabled', async () => {
    const form = new FormGroup({
      checkbox: new FormControl(false, [Validators.required]),
    });
    await render(
      `
      <div [formGroup]="form">
        <app-checkbox formControlName="checkbox" label="Check me"></app-checkbox>
      </div>
    `,
      {
        imports: [MatCheckboxModule, ReactiveFormsModule],
        declarations: [
          MockPipe(TranslatePipe, (value) => value),
          CheckboxComponent,
        ],
        componentProperties: {
          form,
        },
      }
    );

    expect(
      screen.queryByRole('checkbox', { name: 'Check me' })
    ).not.toBeDisabled();

    form.get('checkbox').disable();

    expect(
      await screen.findByRole('checkbox', { name: 'Check me' })
    ).toBeDisabled();
  });

  it('should show default value from form group', async () => {
    const form = new FormGroup({
      checkbox: new FormControl(true, [Validators.required]),
    });
    await render(
      `
      <div [formGroup]="form">
        <app-checkbox formControlName="checkbox" label="Check me"></app-checkbox>
      </div>
    `,
      {
        imports: [MatCheckboxModule, ReactiveFormsModule],
        declarations: [
          MockPipe(TranslatePipe, (value) => value),
          CheckboxComponent,
        ],
        componentProperties: {
          form,
        },
      }
    );

    expect(
      await screen.findByRole('checkbox', { name: 'Check me' })
    ).toBeChecked();
  });
});
