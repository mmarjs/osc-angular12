import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextareaFieldComponent, TextFieldComponent } from '@ocean/shared';
import { MockComponent } from 'ng-mocks';
import { BoatsCreateAboutComponent } from './about.component';

describe('BoatsCreateAboutComponent', () => {
  let component: BoatsCreateAboutComponent;
  let fixture: ComponentFixture<BoatsCreateAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        MockComponent(TextareaFieldComponent),
        MockComponent(TextFieldComponent),
        BoatsCreateAboutComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const builder = TestBed.get(FormBuilder);

    fixture = TestBed.createComponent(BoatsCreateAboutComponent);
    component = fixture.componentInstance;
    component.form = builder.group({
      about: ''
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
