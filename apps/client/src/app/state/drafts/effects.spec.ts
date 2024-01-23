import { TestBed } from '@angular/core/testing';
import { mockEnvironment, StoreTesting } from '@ocean/testing';
import { DraftsEffects } from '@ocean/client/state/drafts/effects';
import { fromDraftsActions, LoadDrafts, LoadDraftsSuccess } from '@ocean/client/state';
import { TestScheduler } from 'rxjs/testing';
import { API_ENVIRONMENT, Draft, DraftDTO, Job, JobDTO, Pageable, PagedResponse } from '@ocean/api/shared';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockProvider } from 'ng-mocks';
import { NotifierService } from '@ocean/shared/services';
import { Observable, of } from 'rxjs';
import { LocalizationService } from '@ocean/internationalization';
import { JobProvider } from '@ocean/api/services';
import { ImageFacadeService } from '@ocean/client/state/images/image-facade.service';

describe('DraftsEffects', () => {
  let actions$: Observable<any>;
  let effects: DraftsEffects;
  let notifier: NotifierService;
  let localizationService: LocalizationService;
  let jobProvider: JobProvider;
  let imageFacadeService: ImageFacadeService;

  const testScheduler = new TestScheduler((actual, expected) => {
    // asserting the two objects are equal - required
    // for TestScheduler assertions to work via your test framework
    // e.g. using chai.
    expect(actual).toEqual(expected);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...StoreTesting],
      providers: [
        DraftsEffects,
        provideMockActions(() => actions$),
        { provide: API_ENVIRONMENT, useValue: mockEnvironment },
        MockProvider(NotifierService),
        MockProvider(LocalizationService),
        MockProvider(JobProvider),
        MockProvider(ImageFacadeService)
      ]
    });

    effects = TestBed.inject(DraftsEffects);
    notifier = TestBed.inject(NotifierService);
    localizationService = TestBed.inject(LocalizationService);
    jobProvider = TestBed.inject(JobProvider);
    imageFacadeService = TestBed.inject(ImageFacadeService);
    jest.spyOn(localizationService, 'translate').mockImplementationOnce((v) => {
      return v.toString();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call SaveDraftSuccess and call notifier.success if saveDraft$ effect is called', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable, flush} = helpers;

      const draftJob: DraftDTO<Job> = {
        content: null,
        link: {
          path: '/path',
          meta: null
        },
        name: 'name'
      };

      const draft: Draft<Job> = {
        content: null,
        link: {
          path: '/path',
          meta: null
        },
        name: 'name',
        id: '1'
      };

      const jobDTO: JobDTO = {
        id: 1,
        name: 'name'
      };

      jest.spyOn(jobProvider, 'createJob').mockImplementationOnce(() => {
        return of(jobDTO);
      });

      jest.spyOn(imageFacadeService, 'updateImages').mockImplementationOnce((files, id, name) => {
        return of(null);
      });

      jest.spyOn(notifier, 'success').mockReturnValueOnce(null);

      const action = new fromDraftsActions.SaveDraft({draft: draftJob, files: []});
      const completion = new fromDraftsActions.SaveDraftSuccess(draft);
      actions$ = hot('a', {a: action});
      const expected = cold('b', {b: completion});

      expectObservable(effects.saveDraft$).toEqual(expected);
      flush();

      expect(notifier.success).toHaveBeenCalledWith('DRAFTS.SAVED');
    });
  });

  it('should call SaveDraftFailure if saveDraft$ effect is called', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable} = helpers;

      const draftJob: DraftDTO<Job> = {
        content: null,
        link: {
          path: '/path',
          meta: null
        },
        name: 'name'
      };

      jest.spyOn(jobProvider, 'createJob').mockImplementationOnce(() => {
        return of(null);
      });
      jest.spyOn(imageFacadeService, 'updateImages').mockImplementationOnce((files, id, name) => {
        return of(null);
      });

      const action = new fromDraftsActions.SaveDraft({draft: draftJob, files: [new File([], 'new file')]});
      const completion = new fromDraftsActions.SaveDraftFailure(new TypeError('Cannot read properties of null (reading \'id\')'));
      actions$ = hot('a|', {a: action});
      const expected = cold('(b|)', {b: completion});

      expectObservable(effects.saveDraft$).toEqual(expected);

      // expect(imageFacadeService.updateImages).toHaveBeenCalled();
    });
  });

  it('should call UpdateDraftSuccess if updateDraft$ effect is called', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable, flush} = helpers;

      const jobObj = {
        id: 1,
        name: 'nameJob'
      };

      const draftJob: Partial<DraftDTO<JobDTO>> = {
        content: jobObj,
        link: {
          path: '/path',
          meta: null
        },
        name: 'name'
      };

      jest.spyOn(jobProvider, 'editJob').mockImplementationOnce((v) => {
        return of(v.job);
      });
      jest.spyOn(imageFacadeService, 'updateImages').mockImplementationOnce((files, id, name) => {
        return of(null);
      });

      jest.spyOn(notifier, 'success').mockReturnValueOnce(null);

      const action = new fromDraftsActions.UpdateDraft({draft: draftJob, files: []});
      const completion = new fromDraftsActions.UpdateDraftSuccess(jobObj);

      actions$ = hot('a', {a: action});
      const expected = cold('b', {b: completion});

      expectObservable(effects.updateDraft$).toEqual(expected);
      flush();

      expect(notifier.success).toHaveBeenCalledWith('DRAFTS.UPDATED');
    });
  });

  it('should call DeleteDraftSuccess if deleteDraft$ effect is called', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable, flush} = helpers;

      const draftId = '1';

      jest.spyOn(jobProvider, 'markAsCancel').mockImplementationOnce(() => {
        return of(null);
      });

      jest.spyOn(notifier, 'success').mockReturnValueOnce(null);

      const action = new fromDraftsActions.DeleteDraft(draftId);
      const completion = new fromDraftsActions.DeleteDraftSuccess(draftId);

      actions$ = hot('a', {a: action});
      const expected = cold('b', {b: completion});

      expectObservable(effects.deleteDraft$).toEqual(expected);
      flush();

      expect(jobProvider.markAsCancel).toHaveBeenCalledWith(draftId);
      expect(notifier.success).toHaveBeenCalledWith('DRAFTS.REMOVED');
    });
  });

  it('should call LoadDraftsSuccess if loadDrafts$ effect is called', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable} = helpers;

      const pageable: Pageable = {
        page: 1,
        size: 20
      };

      const pagedResponse: PagedResponse<Job> = {
        currentPageNo: 1,
        data: [
          {
            id: 2,
            name: 'name'
          }
        ],
        totalPages: 5,
        totalRecords: 100
      };

      const pagedResponseOne: PagedResponse<JobDTO> = {
        currentPageNo: 1,
        data: [
          {
            id: 2,
            name: 'name'
          }
        ],
        totalPages: 5,
        totalRecords: 100
      };

      jest.spyOn(jobProvider, 'getAuctions').mockImplementationOnce(() => {
        return of(pagedResponseOne);
      });

      const action = new LoadDrafts(pageable);
      const completion = new LoadDraftsSuccess(pagedResponse);

      actions$ = hot('a', {a: action});
      const expected = cold('b', {b: completion});

      expectObservable(effects.loadDrafts$).toEqual(expected);
    });
  });
});
