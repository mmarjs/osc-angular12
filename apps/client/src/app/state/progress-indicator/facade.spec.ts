import { ProgressIndicatorFacade } from '@ocean/client/state/progress-indicator/facade';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState, PROGRESS_INDICATOR_KEY } from '@ocean/client/state/progress-indicator/state';
import { firstValueFrom } from 'rxjs';

interface TestStore {
  [PROGRESS_INDICATOR_KEY]: typeof initialState;
}

describe('Progress Indicator Facade', () => {
  let service: ProgressIndicatorFacade;
  let store: MockStore<TestStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [PROGRESS_INDICATOR_KEY]: {
              status: false
            }
          }
        })
      ],
    });

    service = TestBed.inject(ProgressIndicatorFacade);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set status correctly', () => {
    // @ts-ignore
    const nextSpy = jest.spyOn(service.statusChanged$, 'next');

    service.setLoadingStatus(true);
    expect(nextSpy).toHaveBeenCalledWith(true);
  });

  it('should get status correctly', async () => {
    store.setState({
      [PROGRESS_INDICATOR_KEY]: {
        status: true
      }
    });
    store.refreshState();

    const status = await firstValueFrom(service.getStatus$);
    expect(status).toEqual(true);
  });

  it('should complete statusChanged$', () => {
    // @ts-ignore
    const spy = jest.spyOn(service.statusChanged$, 'complete');
    service.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });
});
