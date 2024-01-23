import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorHandlingService } from '@ocean/api/client/error-handling.service';
import { JobProvider } from '@ocean/api/services';
import { AuctionsFacade, BoatsFacade } from '@ocean/client/state';
import { MockProvider } from 'ng-mocks';
import { JobResolver } from './job.resolver';

describe('JobResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        MockProvider(JobProvider),
        MockProvider(ErrorHandlingService),
        MockProvider(AuctionsFacade),
        MockProvider(BoatsFacade),
      ],
    })
  );

  it('should be created', () => {
    const service: JobResolver = TestBed.get(JobResolver);
    expect(service).toBeTruthy();
  });
});
