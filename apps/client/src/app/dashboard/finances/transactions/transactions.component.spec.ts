// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent, PanelWrapperComponent } from '@ocean/layout';
import { MockComponent } from 'ng-mocks';
import { FinancesTransactionsComponent } from './transactions.component';

describe('FinancesTransactionsComponent', () => {
  let component: FinancesTransactionsComponent;
  let fixture: ComponentFixture<FinancesTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(NotificationComponent),
        MockComponent(PanelWrapperComponent),
        FinancesTransactionsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
