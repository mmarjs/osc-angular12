import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardImports } from '../../../dashboard.imports';
import { MessagesRecipientsSearchComponent } from './search.component';

describe('MessagesRecipientsSearchComponent', () => {
  let component: MessagesRecipientsSearchComponent;
  let fixture: ComponentFixture<MessagesRecipientsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ...DashboardImports],
      declarations: [MessagesRecipientsSearchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesRecipientsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
