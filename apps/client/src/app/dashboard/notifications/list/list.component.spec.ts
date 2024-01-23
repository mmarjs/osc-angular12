// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from '@ocean/layout';
import { MockComponent } from 'ng-mocks';
import { DashboardImports } from '../../dashboard.imports';
import { NotificationsItemComponent } from '../item';
import { NotificationsListComponent } from './list.component';

describe('NotificationsListComponent', () => {
  let component: NotificationsListComponent;
  let fixture: ComponentFixture<NotificationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...DashboardImports],
      declarations: [
        MockComponent(NotificationsItemComponent),
        MockComponent(NotificationComponent),
        NotificationsListComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
