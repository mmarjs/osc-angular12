import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { MessagesRecipientsComponent } from './recipients.component';
import { MessagesRecipientsSearchComponent } from './search';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';
import { SharedModule } from '@ocean/shared';
import { MatListModule } from '@angular/material/list';

describe('MessagesRecipientsComponent', () => {
  let component: MessagesRecipientsComponent;
  let fixture: ComponentFixture<MessagesRecipientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, SharedModule],
      declarations: [
        MockComponent(MessagesRecipientsSearchComponent),
        MessagesRecipientsComponent,
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
