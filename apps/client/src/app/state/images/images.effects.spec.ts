import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { ImagesEffects } from './images.effects';
import { MockProvider } from 'ng-mocks';
import { NotifierService } from '@ocean/shared/services';
import { JobProvider } from '@ocean/api/services';
import { MediaParamsMultiple, MediaService } from '@ocean/api/client';
import { UserFacade } from '@ocean/api/state';
import { TestScheduler } from 'rxjs/testing';
import { uploadImages } from '@ocean/client/state/images/images.actions';
import { provideMockStore } from '@ngrx/store/testing';

describe('ImagesEffects', () => {
  let actions$: Observable<any>;
  let effects: ImagesEffects;
  let jobProvider: JobProvider;
  let mediaService: MediaService;

  const testScheduler = new TestScheduler((actual, expected) => {
    // asserting the two objects are equal - required
    // for TestScheduler assertions to work via your test framework
    // e.g. using chai.
    expect(actual).toEqual(expected);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImagesEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        MockProvider(NotifierService),
        MockProvider(JobProvider),
        MockProvider(MediaService, { getFilesByTags: () => of([]) }),
        MockProvider(UserFacade, {
          id$: of('1')
        })
      ]
    });

    jobProvider = TestBed.inject(JobProvider);
    mediaService = TestBed.inject(MediaService);
    effects = TestBed.inject(ImagesEffects);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('uploadImages$ should be success', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable, flush} = helpers;

      jest.spyOn(mediaService, 'uploadMultipleFilesWithTransformation')
        .mockImplementationOnce(({ files, transformations, tags, title }: MediaParamsMultiple) => {
        return of([]);
      });

      jest.spyOn(jobProvider, 'associateMedia')
        .mockImplementationOnce((jobId: number, fileIds: string[]) => {
          return of({jobId, fileIds});
        });

      const action = uploadImages({files: [new File([], 'name')], entityId: 1, entityName: 'entityName'});
      // const completion = action;
      actions$ = hot('a', {a: action});
      const expected = cold('b', {b: {jobId: 1, fileIds: []}});

      expectObservable(effects.uploadImages$).toEqual(expected);
      flush();
    });
  });

  it('uploadImages$ should be fail', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable, flush} = helpers;

      jest.spyOn(mediaService, 'uploadMultipleFilesWithTransformation')
        .mockImplementationOnce(({ files, transformations, tags, title }: MediaParamsMultiple) => {
          return of(null);
        });

      const action = uploadImages({files: [new File([], 'name')], entityId: 1, entityName: 'entityName'});
      // const completion = action;
      actions$ = hot('a', {a: action});
      const expected = cold('#', {}, expect.any(Error));

      expectObservable(effects.uploadImages$).toEqual(expected);
      flush();
    });
  });
});
