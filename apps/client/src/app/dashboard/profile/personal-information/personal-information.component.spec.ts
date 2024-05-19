import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PanelWrapperComponent } from '@ocean/layout';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { PersonalInformationComponent } from './personal-information.component';
import { ButtonComponent } from '@ocean/shared/partials/button/button.component';
import { FormBuilderComponent } from '@ocean/libs/form-builder';
import { JobDialogs } from '@ocean/api/data';
import {
  MatSelectCountryLangToken,
  MatSelectCountryModule,
} from '@angular-material-extensions/select-country';
import {
  LinkDirective,
  NumberOnlyDirective,
  TextFieldComponent,
  TrimInputDirective,
} from '@ocean/shared';
import { LocalizationService } from '@ocean/internationalization';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TextMaskModule } from 'angular2-text-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

describe('PersonalInformationComponent', () => {
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        MatSelectCountryModule.forRoot('en'),
        NgxIntlTelInputModule,
        TextMaskModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
      ],
      declarations: [
        PersonalInformationComponent,
        LinkDirective,
        TrimInputDirective,
        NumberOnlyDirective,
        ButtonComponent,
        FormBuilderComponent,
        TextFieldComponent,
        MockPipe(TranslatePipe, (v) => v),
        MockComponent(PanelWrapperComponent),
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        MockProvider(JobDialogs),
        MockProvider(LocalizationService),
        MockProvider(MatSelectCountryLangToken),
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
