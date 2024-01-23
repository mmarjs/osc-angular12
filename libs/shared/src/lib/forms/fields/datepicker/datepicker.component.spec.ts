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
import { DatepickerComponent } from './datepicker.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async () => {
    await render(
      `
      <div [formGroup]="form">
        <app-datepicker label="DatePicker" formControlName="datepicker"></app-datepicker>
      </div>
    `,
      {
        imports: [MatCheckboxModule, ReactiveFormsModule],
        declarations: [
          MockPipe(TranslatePipe, (value) => value),
          DatepickerComponent,
        ],
        componentProperties: {
          form: new FormGroup({
            datepicker: new FormControl(false, [Validators.required]),
          }),
        },
      }
    );
  });

  it('should create', () => {
    expect(DatepickerComponent).toBeTruthy();
  });

  it('should propagate value changes', () => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    const spy = jest.spyOn(component, 'propagateChange');
    const date = new Date();
    component.onChange(date);
    expect(spy).toHaveBeenCalledWith(date);
  });

  it('should propagate value changes', () => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    const spy = jest.spyOn(component, 'propagateChange');
    const date = new Date();
    component.onChange(date);
    expect(spy).toHaveBeenCalledWith(date);
  });

  it('should set required state', () => {
    component.required = true;
    expect(component._required).toBe(true);

    component.required = false;
    expect(component._required).toBe(false);
  });

  it('should add * when field has required validator', async () => {
    expect(await screen.findByLabelText('DatePicker')).toBeInTheDocument();
  });

  it('should show default value from form group', async () => {
    expect(await screen.findByLabelText('DatePicker')).toHaveValue();
  });
});
