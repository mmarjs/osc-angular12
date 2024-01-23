import { MatSelectCountryComponent } from '@angular-material-extensions/select-country';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import {
  FormAddressComponent,
  FormLocationComponent,
} from '@ocean/client/common/forms';
import { LocalizationService } from '@ocean/internationalization';
import { TextFieldComponent } from '@ocean/shared';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { BoatsCreateLocationComponent } from './location.component';

describe('BoatsCreateLocationComponent', () => {
  let component: BoatsCreateLocationComponent;
  let fixture: ComponentFixture<BoatsCreateLocationComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatFormFieldModule],
      declarations: [
        MockComponent(FormAddressComponent),
        MockComponent(FormLocationComponent),
        MockComponent(TextFieldComponent),
        MockComponent(MatSelectCountryComponent),
        BoatsCreateLocationComponent,
        MockPipe(TranslatePipe, (value: string) => value),
      ],
      providers:[
        MockProvider(LocalizationService)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    const builder = TestBed.inject(FormBuilder);

    fixture = TestBed.createComponent(BoatsCreateLocationComponent);
    component = fixture.componentInstance;
    component.form = builder.group({
      name: ['', Validators.required],
      makeModelYear: '',
      address: ['', Validators.required],
      address2: '',
      state: '',
      city: '',
      zipCode: '',
      country: '',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
