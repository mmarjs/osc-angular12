import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MediaService } from '@ocean/api/client';
import { ErrorHandlingService } from '@ocean/api/client/error-handling.service';
import { DraftDialogs } from '@ocean/api/data';
import { JobProvider } from '@ocean/api/services';
import { JobTypes } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { CancelListingComponent } from '@ocean/client/common/components/cancel-listing/cancel-listing.component';
import { FormActionsWrapperComponent } from '@ocean/client/common/forms';
import {
  AuctionsFacade,
  BoatsFacade,
  DraftsFacade,
  RouterFacade,
} from '@ocean/client/state';
import { IconsModule } from '@ocean/icons';
import { LocalizationService } from '@ocean/internationalization';
import { LayoutComponentsModule } from '@ocean/layout';
import { CapitalizePipe } from '@ocean/shared';
import { NotifierService } from '@ocean/shared/services';
import { mockAuctionsFacade } from '@ocean/testing/helpers/auctionsTestFacade';
import { mockBoatsFacade } from '@ocean/testing/helpers/boatTestFacade';
import { mockDraftsFacade } from '@ocean/testing/helpers/draftsTestFacade';
import {
  imageTransFormData,
  selectedAuctionTestData,
} from '@ocean/testing/helpers/Models/testData';
import {
  TestModule,
  TestStoreEnvModule,
} from '@ocean/testing/helpers/test.module';
import { mockUserFacade } from '@ocean/testing/helpers/userTestFacade';
import { render, screen } from '@testing-library/angular';
import { MockPipe, MockProvider, ngMocks } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { BoatInfoComponent } from './boat-info';
import { AuctionCreateComponent } from './create.component';
import { PreviewComponent } from './preview';

const moment = require('moment');

describe('CreateComponent', () => {
  let component: AuctionCreateComponent;
  let fixture: ComponentFixture<AuctionCreateComponent>;
  jest.mock('moment', () => () => '2018–01–30T12:34:56+00:00');

  const mockMediaService = {
    uploadImages: jest.fn(),
    getFilesByTags: (obj: any) => of(imageTransFormData),
    uploadMultipleFilesWithTransformation: (obj: any) => of(imageTransFormData),
    deleteMultipleFiles: () => of(true),
  };

  const mockDraftsDialogs = {
    addDraftNamePrompt: () => of({ name: 'test' }),
  };

  const mockRouterFacade = {
    queryParams$: of({ draft: 'draft' }),
    go: jest.fn(),
  };

  const mockNotifierService = {
    success: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestModule,
        TestStoreEnvModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      declarations: [AuctionCreateComponent],
      providers: [
        { provide: AuctionsFacade, useValue: mockAuctionsFacade },
        { provide: UserFacade, useValue: mockUserFacade },
        { provide: RouterFacade, useValue: mockRouterFacade },
        { provide: DraftsFacade, useValue: mockDraftsFacade },
        { provide: MediaService, useValue: mockMediaService },
        { provide: ErrorHandlingService, useValue: {} },
        { provide: NotifierService, useValue: mockNotifierService },
        { provide: BoatsFacade, useValue: mockBoatsFacade },
        { provide: DraftDialogs, useValue: mockDraftsDialogs },
      ],
    })
      .overrideTemplate(AuctionCreateComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const formBuilder = TestBed.inject(FormBuilder);
    component.boat = { id: 123, name: 'some boat name', images: [] };
    component.form = formBuilder.group({
      description: new FormGroup({
        type: new FormControl('description type'),
        medias: new FormGroup({
          files: new FormControl([{ file: { name: 'pp.png' } }]),
        }),
      }),
      information: new FormGroup({
        jobItems: new FormArray([]),
      }),
      auctionStartDate: new FormControl(),
      auctionEndDate: new FormControl(),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should init getters', () => {
    component.ngOnInit();
    expect(component.description).toBeTruthy();
    expect(component.auctionType).toEqual('REPAIR');
    expect(component.mediasForm).toBeTruthy();
    expect(component.files).toBeTruthy();
  });

  describe('moment', () => {
    it('should return today date in a specific format', () => {
      const date = moment().format('YYYY-MM-DD');
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      expect(date).toEqual(`${year}-${month}-${day}`);
    });
  });

  describe('on Init', () => {
    it('should init Auction facade', () => {
      const init = jest.spyOn(mockAuctionsFacade, 'init');
      component.ngOnInit();
      expect(init).toBeCalled();
    });
  });

  describe('on handleAuctionFormRender if router query param is not draft', () => {
    beforeAll(() => {
      TestBed.inject(RouterFacade).queryParams$ = of({ draft: false });
    });
    it('should be edit mode', () => {
      expect(component.isEditMode).toBe(true);
      expect(component.auction).toStrictEqual(selectedAuctionTestData);
    });
  });

  describe('on saveJob if edit mode', () => {
    it('should call auctionFacade.edi', () => {
      const edit = jest.spyOn(mockAuctionsFacade, 'edit');
      component.saveJob();
      expect(edit).toBeCalled();
    });
  });
  describe('on saveJob if create mode', () => {
    it('should call auctionFacade.create', () => {
      component.isEditMode = false;
      const create = jest.spyOn(mockAuctionsFacade, 'create');
      component.saveJob();
      expect(create).toBeCalled();
    });
  });

  describe('on onLater', () => {
    it('should call mockRouterFacade.go', () => {
      const spy = jest.spyOn(mockRouterFacade, 'go');
      component.onLater();
      expect(spy).toBeCalled();
    });
  });

  describe('on ngOnDestroy', () => {
    it('should call mockAuctionsFacade.setSelectedAuction and mockBoatFacade.setSelectedBoat', () => {
      const spy = jest.spyOn(mockAuctionsFacade, 'setSelectedAuction');
      const spy2 = jest.spyOn(mockBoatsFacade, 'setSelectedBoat');
      component.ngOnDestroy();
      expect(spy).toBeCalled();
      expect(spy2).toBeCalled();
    });
  });

  describe('on saveAsDraft', () => {
    it('checking if isDraftMode is true', () => {
      component.updateDraft = true;
      const spy = jest.spyOn(mockDraftsFacade, 'updateDraft');
      component.saveAsDraft();
      expect(spy).toBeCalled();
    });
    it('checking if isDraftMode is not true', () => {
      component.updateDraft = false;
      const spy = jest.spyOn(component, 'onLater');
      component.saveAsDraft();
      expect(spy).toBeCalled();
    });
  });
});

describe('CreateComponent integration', () => {
  it('should render', async () => {
    const action = new Observable<any>();

    const dependencies = ngMocks.guts(
      [
        AuctionCreateComponent,
        provideMockStore({
          initialState: {
            auctions: {
              selectedAuction: {
                type: JobTypes.SURVEY,
                name: 'Test Job Name',
                description: 'Test Job Description',
                jobItems: [
                  {
                    title: 'Test Job Item 1 Title',
                    description: 'Test Job Item 1 Description',
                  },
                ],
                auctionEndDate: new Date(2022, 2, 12),
              },
            },
            boats: {
              selectedBoat: { id: 123, name: 'some boat name', images: [] },
            },
            drafts: {
              drafts: {},
            },
            router: {
              state: {
                queryParams: {},
              },
            },
            myAuctions: {},
            shipyards: {},
            surveyors: {},
            error: {},
            bidItems: {},
            bids: {},
          },
        }),
        DraftsFacade,
        AuctionsFacade,
        RouterFacade,
        BoatsFacade,
        UserFacade,
        provideMockActions(() => action),
        MockPipe(TranslatePipe, (v) => v),
        MockPipe(CapitalizePipe, (v) => v.toUpperCase()),
        MockProvider(MediaService, {
          getFilesByTags: jest.fn(() => of([])),
        }),
        MatStepperModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        FormActionsWrapperComponent,
        IconsModule,
        LayoutComponentsModule,
        BoatInfoComponent,
        PreviewComponent,
        CancelListingComponent,
      ],
      [LocalizationService, ErrorHandlingService, NotifierService, JobProvider]
    );

    await render(AuctionCreateComponent, {
      ...dependencies,
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {},
    });

    expect(
      screen.queryByText(/AUCTIONS.CREATE.STEPS.WORK_DESCRIPTION/i)
    ).toBeInTheDocument();
  });
});
