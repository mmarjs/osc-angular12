import { TestBed } from '@angular/core/testing';
import { BoatProvider } from '@ocean/api/services';
import { BoatsFacade } from '@ocean/client/state';
import { MockProvider } from 'ng-mocks';
import { BoatResolver } from './boat.resolver';

describe('BoatResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [MockProvider(BoatProvider), MockProvider(BoatsFacade)],
    })
  );

  it('should be created', () => {
    const service: BoatResolver = TestBed.get(BoatResolver);
    expect(service).toBeTruthy();
  });
});
