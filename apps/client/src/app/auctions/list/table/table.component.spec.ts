// tslint:disable: nx-enforce-module-boundaries
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JobDatasource, JobDialogs } from '@ocean/api/data';
import { API_ENVIRONMENT } from '@ocean/api/shared';
import { BidsFacade } from '@ocean/client/state';
import { LocalizationService } from '@ocean/internationalization';
import { PanelWrapperComponent } from '@ocean/layout';
import { MatDataSourceModule } from '@ocean/material';
import { LinkDirectiveMock } from '@ocean/shared';
import { mockEnvironment } from '@ocean/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AuctionsListTableComponent } from './table.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('AuctionsListTableComponent', () => {
  let component: AuctionsListTableComponent;
  let fixture: ComponentFixture<AuctionsListTableComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatDataSourceModule,
        MatDialogModule
      ],
      declarations: [
        LinkDirectiveMock,
        MockComponent(PanelWrapperComponent),
        AuctionsListTableComponent
      ],
      providers: [
        MockProvider(LocalizationService),
        MockProvider(BidsFacade, {
          bids$: of(null)
        }),
        {provide: API_ENVIRONMENT, useValue: mockEnvironment},
        JobDatasource,
        MockProvider(JobDialogs, {
          acceptPrompt: jest.fn(() => of(true))
        })
      ]
    }).overrideTemplate(AuctionsListTableComponent, '').compileComponents();
  });

  beforeEach(() => {
    // const datasource = TestBed.get(JobDatasource);

    fixture = TestBed.createComponent(AuctionsListTableComponent);
    component = fixture.componentInstance;
    component.source = {
      pageSize: 5,
      setPaginator: () => true
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('check ngOnInit', () => {
    // it('check pageSize',()=>{
    //   component.ngOnInit();
    //   expect(component.source.pageSize).toEqual(5)
    // })
    it('setPaginator to be called', () => {
      const spy = jest.spyOn(component.source, 'setPaginator');
      component.ngOnInit();
      expect(spy).toBeCalled();
    });
  });
  describe('check onAccept', () => {
    const event = {
      preventDefault: () => true,
      stopPropagation: () => true
    } as any;
    const row = {
      'id': 42010,
      'name': 'ssss',
      'description': 'sssss',
      'status': 'DRAFT',
      'type': 'REPAIR',
      'commissionPaid': null,
      'currencyCode': 'USD',
      'jobItems': [
        {
          'id': 42011,
          'title': 'ddd',
          'description': 'dddd'
        }
      ],
      'auctionStartDate': '2022-07-15',
      'auctionEndDate': '2022-07-18',
      'boatId': 4010,
      'boat': {
        'id': 4010,
        'name': 'DDDD',
        'makeModelYear': '2022',
        'type': 'qqqq',
        'length': '122',
        'address': 'Vishakapatnam',
        'address2': '',
        'city': 'Bangalore',
        'state': 'Karnataka',
        'zipCode': '560069',
        'about': 'ddddd',
        'images': []
      },
      'bidders': 0
    } as any;
    it('check preventDefault,stopPropagation to be called', () => {
      const spy = jest.spyOn(event, 'preventDefault');
      const spy2 = jest.spyOn(event, 'stopPropagation');
      component.onAccept(event, row);
      expect(spy).toBeCalled();
      expect(spy2).toBeCalled();
    });
  });
});
