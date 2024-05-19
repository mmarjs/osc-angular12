import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripeDebitCardDetailsComponent } from './stripe-debit-card-details.component';
import { exitDetailsWithStatus } from '../../../helpers/exit-details-with-status';
import { MatIconModule } from '@angular/material/icon';
import { MockPipe } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { STRIPE_DETAILS_EXIT_TYPE } from '../../../shared/types';

const dialogRefMock = {
  close: exitDetailsWithStatus,
};

const dialogData = {
  id: 'dwadawd',
};

describe('StripeDebitCardDetailsComponent', () => {
  let component: StripeDebitCardDetailsComponent;
  let fixture: ComponentFixture<StripeDebitCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [
        StripeDebitCardDetailsComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeDebitCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark as default', () => {
    const spy = jest.spyOn(dialogRefMock, 'close');
    component.markAsDefault();

    expect(spy).toHaveBeenCalledWith(
      exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.MARK, dialogData.id)
    );
  });

  it('should delete', () => {
    const spy = jest.spyOn(dialogRefMock, 'close');
    component.delete();

    expect(spy).toHaveBeenCalledWith(
      exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.DELETE, dialogData.id)
    );
  });
});
