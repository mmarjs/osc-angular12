import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedDirectivesModule } from '@ocean/shared';
import { DashboardImports } from '../../dashboard.imports';
import { MessagesChatComponent } from './chat.component';

describe('MessagesChatComponent', () => {
  let component: MessagesChatComponent;
  let fixture: ComponentFixture<MessagesChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedDirectivesModule, ...DashboardImports],
      declarations: [MessagesChatComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
