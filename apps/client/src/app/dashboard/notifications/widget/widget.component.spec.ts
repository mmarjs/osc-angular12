// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PanelWrapperComponent } from '@ocean/layout';
import { LinkDirectiveMock } from '@ocean/shared';
import { MockComponent } from 'ng-mocks';
import { NotificationsListComponent } from '../list';
import { NotificationsWidgetComponent } from './widget.component';

describe('NotificationsWidgetComponent', () => {
  let component: NotificationsWidgetComponent;
  let fixture: ComponentFixture<NotificationsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        LinkDirectiveMock,
        MockComponent(NotificationsListComponent),
        MockComponent(PanelWrapperComponent),
        NotificationsWidgetComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
