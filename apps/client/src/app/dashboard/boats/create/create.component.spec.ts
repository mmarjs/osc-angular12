import {
  MatSelectCountryLangToken,
  MatSelectCountryModule,
} from '@angular-material-extensions/select-country';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {
  LangChangeEvent,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { MediaService } from '@ocean/api/client';
import { LocalizationService } from '@ocean/internationalization';
import { LayoutComponentsModule, PanelSimpleComponent } from '@ocean/layout';
import { NumberOnlyDirective } from '@ocean/shared/directives';
import { TrimInputDirective } from '@ocean/shared/directives/trim-input.directive';
import {
  TextareaFieldComponent,
  TextFieldComponent,
} from '@ocean/shared/forms';
import { render, screen } from '@testing-library/angular';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { FormActionsWrapperComponent } from './../../../common/forms/actions-wrapper/actions-wrapper.component';
import { FormAddressComponent } from './../../../common/forms/address/address.component';
import { FormLocationComponent } from './../../../common/forms/location/location.component';
import { BoatsCreateAboutComponent } from './about';
import { BoatsCreateComponent } from './create.component';
import { BoatsCreateLocationComponent } from './location';
import { BoatsCreateMediaComponent } from './media';
import { BoatProvider } from '@ocean/api/services';
import { DropDownComponent } from '@ocean/shared/forms/fields/drop-down';
import {
  FormBuilderComponent,
  FormBuilderService,
  FormFieldsService,
  LibsFormBuilderModule,
} from '@ocean/libs/form-builder';
import { JobDialogs } from '@ocean/api/data';
import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoatsCreateComponent', () => {
  const actions$: Observable<any> = of(null);

  const translateServiceMock = {
    currentLang: 'en',
    onLangChange: new EventEmitter<LangChangeEvent>(),
    instant: (v) => v,
    get: of,
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBuilderComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  it('should create', async () => {
    await render(BoatsCreateComponent, {
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectCountryModule,
        LayoutComponentsModule,
        LibsFormBuilderModule,
      ],
      declarations: [
        MockPipe(TranslatePipe, (v) => v),
        MockComponent(BoatsCreateAboutComponent),
        MockComponent(BoatsCreateMediaComponent),
        BoatsCreateLocationComponent,
        TrimInputDirective,
        NumberOnlyDirective,
        BoatsCreateComponent,
        TextFieldComponent,
        FormAddressComponent,
        FormLocationComponent,
        FormBuilderComponent,
        PanelSimpleComponent,
        MatStepper,
        FormActionsWrapperComponent,
        MockComponent(TextareaFieldComponent),
        MockComponent(DropDownComponent),
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
        MockProvider(MediaService),
        MockProvider(LocalizationService),
        MockProvider(BoatProvider),
        MockProvider(JobDialogs),
        MockProvider(MatSelectCountryLangToken),
        provideMockStore(),
        provideMockActions(() => actions$),
        FormFieldsService,
        FormBuilderService,
      ],
    });

    expect(
      screen.getByLabelText(/FORMS.LABELS.WHAT_IS_THE_NAME_OF_YOUR_BOAT/i)
    ).toBeInTheDocument();
  });
});
