import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { FormGalleryComponent } from '@ocean/client/common/forms';
import { TextFieldComponent } from '@ocean/shared';
import { NotifierService } from '@ocean/shared/services';
import { render, screen } from '@testing-library/angular';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { provideMockStore } from '@ngrx/store/testing';
import { BoatInfoComponent } from './boat-info.component';
import {
  FormBuilderComponent,
  FormBuilderService,
  FormFieldsService,
} from '@ocean/libs/form-builder';
import { LocalizationService } from '@ocean/internationalization';
import { BoatsFacade } from '@ocean/client/state';
import { StoreModule } from '@ngrx/store';
import { JobDialogs } from '@ocean/api/data';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSelectCountryLangToken,
  MatSelectCountryModule,
} from '@angular-material-extensions/select-country';
import { of } from 'rxjs';
import { MediaService } from '@ocean/api/client';
import { CountryComponent } from '@ocean/shared/forms/autocompleters/country/country.component';

describe('BoatInfoComponent', () => {
  let component: BoatInfoComponent;
  let fixture: ComponentFixture<BoatInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoatInfoComponent],
      imports: [
        StoreModule.forRoot(provideMockStore)
      ],
      providers: [
        MockProvider(FormFieldsService, {
          validateWhenCountryChanged: of,
        }),
        BoatsFacade,
        MockProvider(MediaService, {
          getFilesByTags: of
        }),
        MockProvider(NotifierService, {error: jest.fn()}),
        MockProvider(FormBuilderService),
        MockProvider(LocalizationService),
      ],
    })
      .overrideTemplate(BoatInfoComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatInfoComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      name: new FormControl('Test'),
      description: new FormControl('test'),
      medias: new FormGroup({
        files: new FormArray([]),
      }),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check boat', () => {
    it('should update boat', fakeAsync(() => {
      const boat = {
        id: 4010,
        name: 'DDDD',
        makeModelYear: '2022',
        type: 'qqqq',
        length: '122',
        country: 'IND',
        address: 'Vishakapatnam',
        address2: '',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560069',
        about: 'ddddd',
        images: [],
      };
      component.boat = boat;
      tick();
      expect(component.boat).toEqual(boat);
    }));
  });

  describe('check getters', () => {
    it('should get jobName', fakeAsync(() => {
      tick();
      expect(component.jobName).toEqual('Test');
    }));
    it('should get jobDescription', fakeAsync(() => {
      tick();
      expect(component.jobDescription).toEqual('test');
    }));
    it('should get mediasForm', fakeAsync(() => {
      tick();
      expect(component.mediasForm).toEqual(component.form.get('medias'));
    }));
    it('should get files', fakeAsync(() => {
      tick();
      expect(component.files).toEqual(component.mediasForm.get('files'));
    }));
  });
});

describe('BoatInfoComponent integration', () => {
  it('should render boat info', async () => {
    await render(BoatInfoComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSelectCountryModule,
        StoreModule.forRoot(provideMockStore),
      ],
      declarations: [
        MockPipe(TranslatePipe, (v) => v),
        MockComponent(FormGalleryComponent),
        FormBuilderComponent,
        TextFieldComponent,
        CountryComponent,
      ],
      providers: [
        FormBuilderService,
        BoatsFacade,
        MockProvider(NotifierService, { error: jest.fn() }),
        MockProvider(MediaService, {
          getFilesByTags: of
        }),
        MockProvider(NotifierService, {error: jest.fn()}),
        MockProvider(LocalizationService),
        MockProvider(JobDialogs),
        MockProvider(MatSelectCountryLangToken),
      ],
      componentProperties: {
        form: new FormGroup({
          name: new FormControl('Test'),
          description: new FormControl('test'),
          medias: new FormGroup({ files: new FormArray([]) }),
        }),
        boat: {
          id: 4010,
          name: 'Motor Yacht 2022 (Test)',
          makeModelYear: '2022',
          type: 'Motor Yacht',
          length: '123',
          country: 'IND',
          address: 'Rouse Hill',
          address2: '',
          city: 'Miami',
          state: 'Florida',
          zipCode: '560069',
          about: 'yacht is in good condition, ready to sail',
          images: [],
          imageTransforms: [],
        },
      },
    });

    expect(screen.getByLabelText(/FORMS.LABELS.NAME/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/FORMS.LABELS.YEAR/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/FORMS.LABELS.TYPE/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/FORMS.LABELS.LENGTH/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/FORMS.LABELS.ADDRESS/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/FORMS.LABELS.ZIP_CODE/i)).toBeInTheDocument();
    expect(screen.getByText(/FORMS.LABELS.COUNTRY/i)).toBeInTheDocument();
  });
});
