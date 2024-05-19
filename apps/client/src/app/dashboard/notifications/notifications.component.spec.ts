import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkDirectiveMock } from '@ocean/shared';
import { MockComponent } from 'ng-mocks';
// import { MessagesWidgetComponent } from '../messages';
import { ProfileWidgetComponent } from '../profile';
import { NotificationsIndexComponent } from './index/index';
import { NotificationsComponent } from './notifications.component';
import { NotificationsWidgetComponent } from './widget';
import { IconsModule } from '@ocean/icons';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, IconsModule],
      declarations: [
        LinkDirectiveMock,
        MockComponent(NotificationsIndexComponent),
        // MockComponent(MessagesWidgetComponent),
        MockComponent(NotificationsWidgetComponent),
        MockComponent(ProfileWidgetComponent),
        NotificationsComponent,
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
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
