// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationComponent, PanelWrapperComponent } from '@ocean/layout';
import { LinkDirectiveMock } from '@ocean/shared';
import { StoreTesting } from '@ocean/testing';
import { MockComponent } from 'ng-mocks';
import { FinancesWidgetComponent } from './widget.component';

describe('FinancesWidgetComponent', () => {
  let component: FinancesWidgetComponent;
  let fixture: ComponentFixture<FinancesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...StoreTesting],
      declarations: [
        LinkDirectiveMock,
        MockComponent(NotificationComponent),
        MockComponent(PanelWrapperComponent),
        FinancesWidgetComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
