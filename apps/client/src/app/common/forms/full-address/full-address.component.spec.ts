import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFullAddressComponent } from './full-address.component';
import { MockComponent, MockPipe } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { MatSelectCountryComponent } from '@angular-material-extensions/select-country';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormAddressComponent } from '../address';
import { FormLocationComponent } from '../location';
import { MatInputModule } from '@angular/material/input';
import { TrimInputDirective } from '@ocean/shared';
import { CountryComponent } from '@ocean/shared/forms/autocompleters/country/country.component';

describe('FullAddressComponent', () => {
  let component: FormFullAddressComponent;
  let fixture: ComponentFixture<FormFullAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormFullAddressComponent,
        MockPipe(TranslatePipe, (v) => v),
        MockComponent(MatSelectCountryComponent),
        MockComponent(FormAddressComponent),
        MockComponent(FormLocationComponent),
        TrimInputDirective,
        CountryComponent,
      ],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFullAddressComponent);
    component = fixture.componentInstance;
    component.form=new FormGroup({
      country:new FormControl('')
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
