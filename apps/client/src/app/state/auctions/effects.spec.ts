import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { mockEnvironment, StoreTesting } from '@ocean/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { API_ENVIRONMENT, BidDTO, BidStatus, JobDTO,  } from '@ocean/api/shared';
import { AuctionsEffects } from '@ocean/client/state/auctions/effects';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TestScheduler } from 'rxjs/testing';
import {
  AuctionsActions,
  AuctionsFacade,
  RouterFacade,
} from '@ocean/client/state';
import { MockProvider } from 'ng-mocks';
import { BidProvider, JobProvider, DocumentProvider } from '@ocean/api/services';
import { ImageFacadeService } from '@ocean/client/state/images/image-facade.service';
import { NotifierService } from '@ocean/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { Document, DocumentStatus, UserStatus } from '@ocean/api/services/documents/models';

describe('AuctionsEffects', () => {
  let actions$: Observable<any>;
  let effects: AuctionsEffects;
  let job: JobProvider;
  let document: DocumentProvider;
  let image: ImageFacadeService;
  let notifier: NotifierService;
  let translate: TranslateService;
  let bidProvider: BidProvider;
  let routerFacade: RouterFacade;

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule],
      providers: [
        AuctionsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
        { provide: API_ENVIRONMENT, useValue: mockEnvironment },
        MockProvider(JobProvider),
        MockProvider(DocumentProvider),
        MockProvider(ImageFacadeService),
        MockProvider(NotifierService),
        MockProvider(AuctionsFacade, { selectedAuction$: of({ id: 1 }) }),
        MockProvider(TranslateService),
        MockProvider(BidProvider),
        MockProvider(RouterFacade),
      ],
    });

    effects = TestBed.inject(AuctionsEffects);
    job = TestBed.inject(JobProvider);
    image = TestBed.inject(ImageFacadeService);
    document = TestBed.inject(DocumentProvider);
    notifier = TestBed.inject(NotifierService);
    translate = TestBed.inject(TranslateService);
    bidProvider = TestBed.inject(BidProvider);
    routerFacade = TestBed.inject(RouterFacade);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('getAuction$ success', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable} = helpers;

      const auctionNumber = 2;
      const jobDTO: JobDTO = {
        id: 1,
        name: 'name'
      };

      jest.spyOn(job, 'findById').mockImplementationOnce(() => {
        return of(jobDTO);
      });

      const action = AuctionsActions.getAuctionById({
        id: auctionNumber
      });

      const completion = AuctionsActions.setSelectedAuction({
        auction: jobDTO
      });

      actions$ = hot('a', {a: action});
      const expected = cold('b', {b: completion});

      expectObservable(effects.getAuction$).toEqual(expected);

    });
  });

  it('getAuction$ error', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, flush } = helpers;

      jest
        .spyOn(job, 'findById')
        .mockImplementationOnce(() => {
          throw new Error('Custom error message');
        });

      jest.spyOn(notifier, 'error');

      actions$ = hot('a', { a: AuctionsActions.getAuctionById({ id: 1 }) });
      const expected = hot('(a|)', {
        a: AuctionsActions.getAuctionByIdFailure({ error: new Error('Custom error message') }),
      });

      expectObservable(effects.getAuction$).toEqual(expected);
      flush();

      expect(notifier.error).toHaveBeenCalledWith(
        'Custom error message'
      );
    });
  });

  it('createAuction$ success', () => {
    testScheduler.run((helpers) => {
      const { hot, cold, expectObservable } = helpers;

      const jobDTO: JobDTO = {
        id: 1,
        name: 'name',
      };

      jest.spyOn(job, 'createJob').mockImplementationOnce(() => {
        return of(jobDTO);
      });

      const action = AuctionsActions.createAuction({
        auction: jobDTO,
        files: [],
      });

      actions$ = hot('a', { a: action });

      expectObservable(effects.createAuction$).toEqual(
        cold('a', {
          a: AuctionsActions.setSelectedAuction({ auction: jobDTO }),
        })
      );
    });
  });

  
  it('createAuction$ error', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, flush } = helpers;
      
      const jobDTO: JobDTO = {
        id: 1,
        name: 'name'
      };

      jest
        .spyOn(job, 'createJob')
        .mockImplementationOnce(() => {
          throw new Error('Custom error message');
        });

      jest.spyOn(notifier, 'error');

      actions$ = hot('a', { a: AuctionsActions.createAuction({ auction: jobDTO, files: [], }) });
      const expected = hot('(a|)', {
        a: AuctionsActions.createAuctionFailure({ error: new Error('Custom error message') }),
      });

      expectObservable(effects.createAuction$).toEqual(expected);
      flush();

      expect(notifier.error).toHaveBeenCalledWith(
        'Custom error message'
      );
    });
  });

  it('editAuction$ success', () => {
    testScheduler.run((helpers) => {
      const { hot, cold, expectObservable, flush } = helpers;

      const jobDTO: JobDTO = {
        name: 'name',
      };

      const resultJobDTO: JobDTO = {
        id: 1,
        name: 'name',
      };

      jest.spyOn(job, 'editJob').mockImplementationOnce((v) => {
        return of(v.job);
      });

      jest.spyOn(notifier, 'success').mockReturnValue(null);
      jest.spyOn(translate, 'instant').mockImplementationOnce((key: string) => {
        return key;
      });

      const action = AuctionsActions.editAuction({
        auction: jobDTO,
        files: [],
      });

      actions$ = hot('a', { a: action });

      expectObservable(effects.editAuction$).toEqual(
        cold('a', {
          a: AuctionsActions.setSelectedAuction({ auction: resultJobDTO }),
        })
      );
      flush();

      expect(notifier.success).toHaveBeenCalledWith('AUCTIONS.AUCTION_UPDATED');
    });
  });

  
  it('editAuction$ error', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, flush } = helpers;
      
      const jobDTO: JobDTO = {
        id: 1,
        name: 'name'
      };

      jest
        .spyOn(job, 'editJob')
        .mockImplementationOnce(() => {
          throw new Error('Custom error message');
        });

      jest.spyOn(notifier, 'error');

      actions$ = hot('a', { a: AuctionsActions.editAuction({ auction: jobDTO, files: [], }) });
      const expected = hot('(a|)', {
        a: AuctionsActions.editAuctionFailure({ error: new Error('Custom error message') }),
      });

      expectObservable(effects.editAuction$).toEqual(expected);
      flush();

      expect(notifier.error).toHaveBeenCalledWith(
        'Custom error message'
      );
    });
  });

  it('bidOnAuction$ success', () => {
    testScheduler.run((helpers) => {
      const { hot, cold, expectObservable, flush } = helpers;

      const bidMock: BidDTO = {
        id: 1,
        jobId: 1,
      };

      const resultJobDTO: BidDTO = {
        id: 1,
        jobId: 1,
        status: BidStatus.IN_REVIEW,
      };

      jest.spyOn(bidProvider, 'createBid').mockImplementationOnce((v) => {
        return of(v.bidDto);
      });

      jest.spyOn(notifier, 'success').mockReturnValue(null);
      jest.spyOn(translate, 'instant').mockImplementationOnce((key: string) => {
        return key;
      });

      const action = AuctionsActions.createBidOnAuction({
        bid: bidMock,
      });

      const completion = AuctionsActions.createBidOnAuctionSuccess({
        bid: resultJobDTO,
      });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: completion });

      expectObservable(effects.bidOnAuction$).toEqual(expected);
      flush();

      expect(notifier.success).toHaveBeenCalledWith('BIDS.BID_CREATED');
    });
  });

  
  it('bidOnAuction$ error', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, flush } = helpers;
      
      const bidMock: BidDTO = {
        id: 1,
        jobId: 1
      };

      jest
        .spyOn(bidProvider, 'createBid')
        .mockImplementationOnce(() => {
          throw new Error('Custom error message');
        });

      jest.spyOn(notifier, 'error');

      actions$ = hot('a', { a: AuctionsActions.createBidOnAuction({ bid: bidMock }) });
      const expected = hot('(a|)', {
        a: AuctionsActions.createBidOnAuctionFailure({ error: new Error('Custom error message') }),
      });

      expectObservable(effects.bidOnAuction$).toEqual(expected);
      flush();

      expect(notifier.error).toHaveBeenCalledWith(
        'Custom error message'
      );
    });
  });

  it('cancelAuction$ success', () => {
    testScheduler.run((helpers) => {
      const { hot, cold, expectObservable, flush } = helpers;

      const auctionId = 1;
      const jobDTO: JobDTO = {
        id: 1,
        name: 'name',
      };

      jest.spyOn(job, 'markAsCancel').mockImplementationOnce(() => {
        return of(jobDTO);
      });

      jest.spyOn(notifier, 'success').mockReturnValue(null);
      jest.spyOn(translate, 'instant').mockImplementationOnce((key: string) => {
        return key;
      });

      jest.spyOn(routerFacade, 'go').mockReturnValue(null);

      const action = AuctionsActions.auctionCancel({
        id: auctionId,
      });

      const completion = AuctionsActions.auctionCancelSuccess({
        auction: jobDTO,
      });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: completion });

      expectObservable(effects.cancelAuction$).toEqual(expected);
      flush();

      expect(notifier.success).toHaveBeenCalledWith(
        'AUCTIONS.AUCTION_CANCELLED'
      );
      expect(routerFacade.go).toHaveBeenCalledWith({
        path: ['/dashboard'],
      });
    });
  });

  
  it('cancelAuction$ error', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, flush } = helpers;

      jest
        .spyOn(job, 'markAsCancel')
        .mockImplementationOnce(() => {
          throw new Error('Custom error message');
        });

      jest.spyOn(notifier, 'error');

      actions$ = hot('a', { a: AuctionsActions.auctionCancel({ id: 1 }) });
      const expected = hot('(a|)', {
        a: AuctionsActions.auctionCancelFailure({ error: new Error('Custom error message') }),
      });

      expectObservable(effects.cancelAuction$).toEqual(expected);
      flush();

      expect(notifier.error).toHaveBeenCalledWith(
        'Custom error message'
      );
    });
  });

  it('getBidByAuction$ success', () => {
    testScheduler.run((helpers) => {
      const { hot, cold, expectObservable } = helpers;

      const auctionNumber = 2;
      const bidDTO: BidDTO = {
        id: 1,
        job: null,
      };

      jest
        .spyOn(bidProvider, 'getBidByAuctionId')
        .mockImplementationOnce(() => {
          return of(bidDTO);
        });

      const action = AuctionsActions.getBidByAuction({
        id: auctionNumber,
      });

      const completion = AuctionsActions.getBidByAuctionSuccess({
        bid: bidDTO,
      });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: completion });

      expectObservable(effects.getBidByAuction$).toEqual(expected);
    });
  });

  it('markForProgress$ success', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, flush } = helpers;

      const auctionId = 1;
      const jobDTO: JobDTO = {
        id: auctionId,
        name: 'name',
      };

      jest
        .spyOn(job, 'markAsInProgress')
        .mockImplementationOnce(() => of(jobDTO));

      actions$ = hot('a', {
        a: AuctionsActions.markAsInProgress({
          id: auctionId,
        }),
      });
      const expected = hot('(abc)', {
        a: AuctionsActions.markAsInProgressSuccess({ auction: jobDTO }),
        b: AuctionsActions.getBidByAuction({ id: auctionId }),
        c: AuctionsActions.getAuctionById({ id: auctionId }),
      });

      expectObservable(effects.markForProgress$).toEqual(expected);
      flush();
    });
  });

  it('markForProgress$ error', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, flush } = helpers;

      jest.spyOn(job, 'markAsInProgress').mockImplementationOnce(() => {
        throw new Error('Custom error message');
      });

      jest.spyOn(notifier, 'error');

      actions$ = hot('a', { a: AuctionsActions.markAsInProgress({ id: 1 }) });
      const expected = hot('(a|)', {
        a: AuctionsActions.markAsInProgressFailure({
          error: new Error('Custom error message'),
        }),
      });

      expectObservable(effects.markForProgress$).toEqual(expected);
      flush();

      expect(notifier.error).toHaveBeenCalledWith('Custom error message');
    });
  });

  it('markForComplete$ success', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, flush } = helpers;

      const auctionId = 1;
      const jobDTO: JobDTO = {
        id: auctionId,
        name: 'name',
      };

      jest
        .spyOn(job, 'markAsCompleted')
        .mockImplementationOnce(() => of(jobDTO));

      actions$ = hot('a', {
        a: AuctionsActions.markAsCompleted({ id: auctionId }),
      });
      const expected = hot('a', {
        a: AuctionsActions.getAuctionById({ id: auctionId }),
      });

      expectObservable(effects.markAsCompleted$).toEqual(expected);
      flush();
    });
  });

  it('getDocumentsByAuctionId$ success', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable} = helpers;

      const auctionNumber = 2;
      const docs: Document[] = [{
        id: "1",
        title: 'name',
        externalDocumentId: "id",
        status: DocumentStatus.New,
        userStatus: UserStatus.Completed
      }];

      jest.spyOn(document, 'getDocumentsForJob').mockImplementationOnce(() => {
        return of(docs);
      });

      const action = AuctionsActions.getDocuments({
        auctionId: auctionNumber
      });

      const completion = AuctionsActions.getDocumentsSuccess({
        document: docs[0]
      });

      actions$ = hot('a', {a: action});
      const expected = cold('b', {b: completion});

      expectObservable(effects.getDocumentsByAuctionId$).toEqual(expected);

    });
  });


  it('markForProgress$ error', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, flush } = helpers;

      jest
        .spyOn(document, 'getDocumentsForJob')
        .mockImplementationOnce(() => {
          throw new Error('Custom error message');
        });

      jest.spyOn(notifier, 'error');

      actions$ = hot('a', { a: AuctionsActions.getDocuments({ auctionId: 1 }) });
      const expected = hot('(a|)', {
        a: AuctionsActions.getDocumentsFailure({ error: new Error('Custom error message') }),
      });

      expectObservable(effects.getDocumentsByAuctionId$).toEqual(expected);
      flush();

      expect(notifier.error).toHaveBeenCalledWith(
        'Custom error message'
      );
    });
  });
});
