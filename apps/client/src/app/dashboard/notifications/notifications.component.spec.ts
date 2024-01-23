import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkDirectiveMock } from '@ocean/shared';
import { MockComponent } from 'ng-mocks';
// import { MessagesWidgetComponent } from '../messages';
import { ProfileWidgetComponent } from '../profile';
import { NotificationsIndexComponent } from './index/index';
import { NotificationsComponent } from './notifications.component';
import { NotificationsWidgetComponent } from './widget';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        LinkDirectiveMock,
        MockComponent(NotificationsIndexComponent),
        // MockComponent(MessagesWidgetComponent),
        MockComponent(NotificationsWidgetComponent),
        MockComponent(ProfileWidgetComponent),
        NotificationsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
