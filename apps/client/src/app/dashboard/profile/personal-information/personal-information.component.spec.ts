import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PanelWrapperComponent } from '@ocean/layout';
import { FormControlUpdateOnSubmitComponent } from '@ocean/shared/forms/form-control-update-on-submit/form-control-update-on-submit.component';
import { MockComponent, MockPipe } from 'ng-mocks';
import { PersonalInformationComponent } from './personal-information.component';

describe('PersonalInformationComponent', () => {
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        PersonalInformationComponent,
        MockPipe(TranslatePipe, (v) => v),
        MockComponent(FormControlUpdateOnSubmitComponent),
        MockComponent(PanelWrapperComponent)
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
