import { TestBed } from '@angular/core/testing';
import { ErrorHandlingService } from '@ocean/api/client/error-handling.service';
import { BidProvider } from '@ocean/api/services';
import { RouterFacade } from '@ocean/client/state';
import { MockProvider } from 'ng-mocks';
import { BidResolver } from './bid.resolver';

describe('BidResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(BidProvider),
        MockProvider(RouterFacade),
        MockProvider(ErrorHandlingService),
      ],
    })
  );

  it('should be created', () => {
    const service: BidResolver = TestBed.inject(BidResolver);
    expect(service).toBeTruthy();
  });
});
