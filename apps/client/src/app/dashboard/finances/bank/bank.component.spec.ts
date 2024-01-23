// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent, PanelWrapperComponent } from '@ocean/layout';
import { MockComponent } from 'ng-mocks';
import { FinancesBankComponent } from './bank.component';

describe('FinancesBankComponent', () => {
  let component: FinancesBankComponent;
  let fixture: ComponentFixture<FinancesBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(NotificationComponent),
        MockComponent(PanelWrapperComponent),
        FinancesBankComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
