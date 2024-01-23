// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelWrapperComponent } from '@ocean/layout';
import { MockComponent } from 'ng-mocks';
import { MessagesChatComponent } from '../chat';
import { MessagesRecipientsComponent } from '../recipients';
import { MessagesIndexComponent } from './index.component';

describe('MessagesIndexComponent', () => {
  let component: MessagesIndexComponent;
  let fixture: ComponentFixture<MessagesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(MessagesRecipientsComponent),
        MockComponent(MessagesChatComponent),
        MockComponent(PanelWrapperComponent),
        MessagesIndexComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
