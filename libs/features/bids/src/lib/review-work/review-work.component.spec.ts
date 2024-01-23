import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppComponentsModule } from '@ocean/client/common/components/components.module';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuctionsFacade, BidsFacade } from '@ocean/client/state';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SurveyItemsTableComponent } from '@ocean/components';
import { IconsModule } from '@ocean/icons';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LayoutComponentsModule } from '@ocean/layout';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { render, screen, waitFor } from '@testing-library/angular';
import { MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { ReviewWorkComponent } from './review-work.component';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PromptDialogComponent } from '@ocean/shared/dialogs';
import { LocalizationService } from '@ocean/internationalization';
import { JobStatus } from '@ocean/api/services';

describe('ReviewWorkComponent', () => {
  it('should render with no job items', async () => {
    await render(ReviewWorkComponent, {
      imports: [
        MatDialogModule,
        MatTableModule,
        IconsModule,
        LayoutComponentsModule,
        AppComponentsModule,
        PartialsModule,
      ],
      routes: [],
      declarations: [MockPipe(TranslatePipe, (v) => v)],
      providers: [
        MockProvider(BidsFacade, { loadBid: jest.fn(), bid$: of({}) }),
        MockProvider(LocalizationService, {
          translate: (v) => (Array.isArray(v) ? v[0] : v),
        }),
        provideMockStore({
          initialState: { auctions: { selectedAuction: { jobItems: [] } } },
        }),
      ],
    });

    expect(screen.queryByText(/REVIEW_WORK.NO_JOB_ITEMS/i)).toBeInTheDocument();
  });

  it('should render with job items', async () => {
    await render(ReviewWorkComponent, {
      imports: [
        MatDialogModule,
        MatTableModule,
        IconsModule,
        LayoutComponentsModule,
        AppComponentsModule,
        PartialsModule,
        TranslateModule.forRoot(),
      ],
      routes: [],
      declarations: [
        SurveyItemsTableComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        MockProvider(LocalizationService, {
          translate: (v) => (Array.isArray(v) ? v[0] : v),
        }),
        provideMockStore({
          initialState: {
            auctions: {
              selectedAuction: {
                jobItems: [
                  {
                    id: '1',
                    title: 'Test Job',
                    quantity: 1,
                    description: 'Test Description',
                  },
                ],
              },
            },
          },
        }),
        MockProvider(BidsFacade, { loadBid: jest.fn(), bid$: of({}) }),
      ],
    });

    expect(
      screen.queryByText(/REVIEW_WORK.NO_JOB_ITEMS/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Test Job/i)).toBeInTheDocument();
  });

  it('should render accept work button', async () => {
    await render(ReviewWorkComponent, {
      imports: [
        MatDialogModule,
        MatTableModule,
        IconsModule,
        LayoutComponentsModule,
        AppComponentsModule,
        PartialsModule,
        TranslateModule.forRoot(),
      ],
      routes: [],
      declarations: [
        SurveyItemsTableComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        MockProvider(LocalizationService, {
          translate: (v) => (Array.isArray(v) ? v[0] : v),
        }),
        provideMockStore({
          initialState: {
            auctions: {
              selectedAuction: {
                id: 1,
                status: JobStatus.JOB_IN_PROGRESS,
                jobItems: [
                  {
                    id: '1',
                    title: 'Test Job',
                    quantity: 1,
                    description: 'Test Description',
                  },
                ],
              },
            },
          },
        }),
        MockProvider(BidsFacade, { loadBid: jest.fn(), bid$: of({}) }),
      ],
    });

    expect(
      screen.queryByText(/REVIEW_WORK.ACCEPT_WORK_MESSAGE/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /REVIEW_WORK.ACCEPT_WORK_BTN/i })
    ).toBeInTheDocument();
  });

  it('should render accept work button', async () => {
    await render(ReviewWorkComponent, {
      imports: [
        MatTableModule,
        IconsModule,
        LayoutComponentsModule,
        AppComponentsModule,
        PartialsModule,
        TranslateModule.forRoot(),
      ],
      routes: [],
      declarations: [
        SurveyItemsTableComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        MockProvider(LocalizationService, {
          translate: (v) => (Array.isArray(v) ? v[0] : v),
        }),
        MockProvider(BidsFacade, { loadBid: jest.fn(), bid$: of({}) }),
        MockProvider(AuctionsFacade, {
          markAsCompleted: jest.fn(),
          selectedAuction$: of({
            id: 1,
            status: JobStatus.JOB_IN_PROGRESS,
          } as any),
        }),
        MockProvider(MatDialog, {
          open: jest.fn().mockImplementation(() => {
            return {
              afterClosed: () => of(true),
            };
          }),
        }),
      ],
    });

    await userEvent.click(
      screen.getByRole('button', { name: /REVIEW_WORK.ACCEPT_WORK_BTN/i })
    );

    expect(TestBed.inject(MatDialog).open).toHaveBeenCalledWith(
      PromptDialogComponent,
      {
        data: {
          title: 'REVIEW_WORK.ACCEPT_WORK_CAUTION_TITLE',
          content: 'REVIEW_WORK.ACCEPT_WORK_CAUTION_MESSAGE',
        },
      }
    );

    await waitFor(() => {
      expect(
        TestBed.inject(AuctionsFacade).markAsCompleted
      ).toHaveBeenCalledWith(1);
    });
  });
});
