import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MockPipe } from 'ng-mocks';
import { InputDialogComponent } from './input-dialog.component';

describe('InputDialogComponent', () => {
  it('should not allow to save without input value', async () => {
    await render(InputDialogComponent, {
      imports: [
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        InputDialogComponent,
        MockPipe(TranslatePipe, (value: string) => value),
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jest.fn() },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    const dialogRefMock = TestBed.inject(MatDialogRef);

    expect(
      screen.getByRole('button', { name: 'COMMON.BUTTONS.OK' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'COMMON.BUTTONS.OK' })
    ).toBeDisabled();

    userEvent.type(screen.getByRole('textbox'), 'test');

    expect(
      screen.getByRole('button', { name: 'COMMON.BUTTONS.OK' })
    ).toBeEnabled();

    userEvent.click(screen.getByRole('button', { name: 'COMMON.BUTTONS.OK' }));

    expect(dialogRefMock.close).toHaveBeenCalledWith('test');
  });
});
