// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelWrapperComponent } from '@ocean/layout';
import { MockComponent } from 'ng-mocks';
import { NotificationsListComponent } from '../list';
import { NotificationsIndexComponent } from './index.component';

describe('NotificationsIndexComponent', () => {
  let component: NotificationsIndexComponent;
  let fixture: ComponentFixture<NotificationsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(NotificationsListComponent),
        MockComponent(PanelWrapperComponent),
        NotificationsIndexComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
