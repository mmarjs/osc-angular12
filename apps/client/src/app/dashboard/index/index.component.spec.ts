// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NotificationComponent,
  PanelWrapperComponent,
  TwoColumnsComponent
} from '@ocean/layout';
import { StoreTesting } from '@ocean/testing';
import { MockComponent, MockPipe } from 'ng-mocks';
import { BoatsWidgetComponent } from '../boats';
import { FinancesWidgetComponent } from '../finances';
import { MessagesWidgetComponent } from '../messages';
import { NotificationsWidgetComponent } from '../notifications';
import { ProfileWidgetComponent } from '../profile';
import { ShipyardsWidgetComponent } from '../shipyards';
import { SurveyorsWidgetComponent } from '../surveyors';
import { DashboardIndexComponent } from './index.component';
import { TranslatePipe } from '@ngx-translate/core';

describe('DashboardIndexComponent', () => {
  let component: DashboardIndexComponent;
  let fixture: ComponentFixture<DashboardIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...StoreTesting],
      declarations: [
        MockComponent(FinancesWidgetComponent),
        MockComponent(MessagesWidgetComponent),
        MockComponent(NotificationsWidgetComponent),
        MockComponent(ProfileWidgetComponent),
        MockComponent(BoatsWidgetComponent),
        MockComponent(ShipyardsWidgetComponent),
        MockComponent(SurveyorsWidgetComponent),
        MockComponent(TwoColumnsComponent),
        MockComponent(PanelWrapperComponent),
        MockComponent(NotificationComponent),
        MockPipe(TranslatePipe, (value: string) => value),
        DashboardIndexComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
