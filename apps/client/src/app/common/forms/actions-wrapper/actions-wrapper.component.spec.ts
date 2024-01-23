import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormActionsWrapperComponent } from './actions-wrapper.component';

describe('FormActionsWrapperComponent', () => {
  let component: FormActionsWrapperComponent;
  let fixture: ComponentFixture<FormActionsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormActionsWrapperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActionsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
