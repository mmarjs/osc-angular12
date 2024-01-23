// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PanelWrapperComponent } from '@ocean/layout';
import { LinkDirectiveMock } from '@ocean/shared';
import { MockComponent } from 'ng-mocks';
import { NotificationsWidgetComponent } from '../notifications';
import { ProfileWidgetComponent } from '../profile';
import { MessagesIndexComponent } from './index/index';
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        LinkDirectiveMock,
        MockComponent(MessagesIndexComponent),
        MockComponent(NotificationsWidgetComponent),
        MockComponent(ProfileWidgetComponent),
        MockComponent(PanelWrapperComponent),
        MessagesComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
