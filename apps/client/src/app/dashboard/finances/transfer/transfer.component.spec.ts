// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent, PanelWrapperComponent } from '@ocean/layout';
import { MockComponent } from 'ng-mocks';
import { FinancesTransferComponent } from './transfer.component';

describe('FinancesTransferComponent', () => {
  let component: FinancesTransferComponent;
  let fixture: ComponentFixture<FinancesTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(NotificationComponent),
        MockComponent(PanelWrapperComponent),
        FinancesTransferComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
