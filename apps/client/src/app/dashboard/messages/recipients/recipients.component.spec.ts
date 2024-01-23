import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { DashboardImports } from '../../dashboard.imports';
import { MessagesRecipientsComponent } from './recipients.component';
import { MessagesRecipientsSearchComponent } from './search';

describe('MessagesRecipientsComponent', () => {
  let component: MessagesRecipientsComponent;
  let fixture: ComponentFixture<MessagesRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: DashboardImports,
      declarations: [
        MockComponent(MessagesRecipientsSearchComponent),
        MessagesRecipientsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
