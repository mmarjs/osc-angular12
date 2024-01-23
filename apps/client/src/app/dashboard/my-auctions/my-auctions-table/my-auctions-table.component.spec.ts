import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';
import { JobProvider } from '@ocean/api/services';
import { IconsModule } from '@ocean/icons';
import { LocalizationService } from '@ocean/internationalization';
import { MatDataSourceModule } from '@ocean/material';
import { LinkDirective } from '@ocean/shared';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MockDirective, MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { MyAuctionsTableComponent } from './my-auctions-table.component';

const fakeAuction = {
  id: 2764110,
  name: 'Vlad test 07/03',
  description: 'test',
  status: 'JOB_IN_PROGRESS',
  type: 'REPAIR',
  currencyCode: 'USD',
  jobItems: [
    {
      id: 2764111,
      title: 'a',
      description: '1',
    },
  ],
  auctionStartDate: '2023-03-07T13:37:36.993488Z',
  auctionEndDate: '2023-03-08T22:00:00Z',
  boatId: 2760160,
  boat: {
    id: 2760160,
    name: 'Blue Miracle',
    makeModelYear: '1987',
    type: 'Small Boat',
    length: '35',
    address: 'wd',
    address2: 'awd',
    city: 'awd',
    state: 'awd',
    zipCode: null,
    country: 'AFG',
    timeZone: 'Europe/Kiev',
    about: 'wwd',
    model: null,
    flag: 'AFG',
    officialNumber: null,
    loa: null,
    beam: null,
    draft: null,
    displacement: null,
    hullId: 'CNV1234AC',
    electricalRequirements: null,
    boatClass: '',
    insuranceNumber: null,
    damage: null,
    images: [],
  },
  bidders: 1,
  commissionPaid: 10,
};

const makeFakeDataSource = (data: any[]) => ({
  setSort: jest.fn(),
  setFilter: jest.fn(),
  setPaginator: jest.fn(),
  datasource: data,
  rawResult: () => data,
  rawTotal: () => data.length,
  filteredData: () => data,
  sortData: () => data,
  connect: () => of(data),
  disconnect: () => {},
  refresh: () => {},
  rawDefault: () => ({
    data: data,
    currentPageNo: 0,
    totalPages: 1,
    totalRecords: 0,
  }),
});

describe('MyAuctionsTableComponent', () => {
  it('should render data properly', async () => {
    const cmp = await render(MyAuctionsTableComponent, {
      imports: [
        MatTableModule,
        MatDialogModule,
        MatDataSourceModule,
        MatPaginatorModule,
        MatIconModule,
        IconsModule,
      ],
      declarations: [MockPipe(TranslatePipe, (value) => value), LinkDirective],
      providers: [
        MockProvider(JobProvider),
        MockProvider(LocalizationService, {
          translate: (key) => key as string,
        }),
      ],
      componentProperties: {
        source: makeFakeDataSource([fakeAuction]) as any,
      },
    });

    expect(
      screen.queryByRole('cell', { name: 'Vlad test 07/03' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('cell', { name: 'Mar 7, 2023' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('cell', { name: 'APPLICATION.REPAIR' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('cell', { name: 'AUCTIONS.STATUS.JOB_IN_PROGRESS' })
    ).toBeInTheDocument();
  });

  it('should delete properly', async () => {
    const source = makeFakeDataSource([fakeAuction]) as any;
    const cmp = await render(MyAuctionsTableComponent, {
      imports: [
        MatTableModule,
        MatDialogModule,
        MatDataSourceModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        IconsModule,
      ],
      declarations: [
        MockPipe(TranslatePipe, (value) => value),
        MockDirective(LinkDirective),
      ],
      providers: [
        MockProvider(JobProvider, {
          markAsCancel: jest.fn().mockReturnValue(of({})),
        }),
        MockProvider(LocalizationService, {
          translate: (key) => key as string,
        }),
      ],
      componentProperties: {
        source: source,
      },
    });

    const jobMock = TestBed.inject(JobProvider);
    const dilogMock = TestBed.inject(MatDialog);

    jest.spyOn(dilogMock, 'open').mockReturnValue({
      afterClosed: () => of(true),
    } as any);
    jest.spyOn(source, 'refresh').mockImplementation(() => {});

    await userEvent.click(screen.queryByRole('button', { name: 'Delete' }));

    await waitFor(() => expect(jobMock.markAsCancel).toHaveBeenCalled());
    await waitFor(() => expect(source.refresh).toHaveBeenCalled());
  });
});
