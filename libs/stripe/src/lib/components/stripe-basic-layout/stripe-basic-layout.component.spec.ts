import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripeBasicLayoutComponent } from './stripe-basic-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StripeFacadeService } from '../../store/facade';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { STRIPE_FEATURE_KEY } from '../../store/state';
import { StripeAccountValidationStatus } from '../../helpers/stripe-account-validation';
import { firstValueFrom } from 'rxjs';

describe('StripeBasicLayoutComponent', () => {
  let component: StripeBasicLayoutComponent;
  let fixture: ComponentFixture<StripeBasicLayoutComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatToolbarModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
      ],
      declarations: [
        StripeBasicLayoutComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        provideMockStore({
          initialState: {
            [STRIPE_FEATURE_KEY]: {
              loading: false,
            },
          },
        }),
        StripeFacadeService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StripeBasicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check location and redirect', async () => {
    const spy = jest.spyOn(component, 'navigate');
    component.ngAfterViewInit();

    component.tabs.selectedIndex = 1;
    fixture.detectChanges();

    const index = await firstValueFrom(component.tabs.selectedIndexChange);
    expect(spy).toHaveBeenCalledWith(index);
  });

  it('should check manage tab availability after errors updated', async () => {
    const spy = jest.spyOn(component, 'switchManageTab');

    store.setState({
      [STRIPE_FEATURE_KEY]: {
        validation: {
          status: StripeAccountValidationStatus.VALID,
          errors: {
            test: 'test',
          },
        },
      },
    });

    component.ngOnInit();

    store.refreshState();
    fixture.detectChanges();

    const result = await firstValueFrom(component.errors$);
    expect(spy).toHaveBeenCalledWith(result);
  });
});
