import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripeBanksComponent } from './stripe-banks.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { MatDialogModule } from '@angular/material/dialog';
import { ProceedActionFor, StripeFacadeService } from '../../../store/facade';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { STRIPE_DETAILS_EXIT_TYPE } from '../../../shared/types';
import { STRIPE_FEATURE_KEY } from '../../../store/state';
import { exitDetailsWithStatus } from '../../../helpers/exit-details-with-status';

describe('StripeBanksComponent', () => {
  let component: StripeBanksComponent;
  let fixture: ComponentFixture<StripeBanksComponent>;
  let stripeFacadeService: StripeFacadeService;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatIconModule, MatCardModule, MatButtonModule],
      declarations: [StripeBanksComponent, MockPipe(TranslatePipe, (v) => v)],
      providers: [provideMockStore(), StripeFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(StripeBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    stripeFacadeService = TestBed.inject(StripeFacadeService);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load banks on init', () => {
    const spy = jest.spyOn(stripeFacadeService, 'loadBanks');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it.each([{ bankName: 'test' }, undefined])(
    'should send bank data properly (%s)',
    (type) => {
      jest.spyOn(component.dialog, 'open').mockImplementation(() => ({
        afterClosed: () => of(type),
      }));

      const spy = jest
        .spyOn(stripeFacadeService, 'createBankAccount')
        .mockImplementationOnce(() => null);

      component.handleBankAccountCreate();

      typeof type === 'object'
        ? expect(spy).toHaveBeenCalledWith(type)
        : expect(spy).not.toHaveBeenCalled();
    }
  );

  it.each([
    undefined,
    exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.MARK, 'test'),
    exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.DELETE, 'test'),
  ])('should proceed bank data properly (%s)', async (type) => {
    jest.spyOn(component.dialog, 'open').mockImplementation(() => ({
      afterClosed: () => of(type),
    }));

    store.setState({
      [STRIPE_FEATURE_KEY]: {
        banks: [
          {
            id: 'test',
          },
        ],
      },
    });

    store.refreshState();
    fixture.detectChanges();

    const spy = jest
      .spyOn(stripeFacadeService, 'proceedAction')
      .mockImplementationOnce(() => null);

    await component.handleBankAccountDetails('test');

    typeof type === 'object'
      ? expect(spy).toHaveBeenCalledWith(ProceedActionFor.BANKS, type)
      : expect(spy).not.toHaveBeenCalled();
  });
});
