import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupCreatedComponent } from './created.component';

describe('SignupCreatedComponent', () => {
  let component: SignupCreatedComponent;
  let fixture: ComponentFixture<SignupCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupCreatedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
