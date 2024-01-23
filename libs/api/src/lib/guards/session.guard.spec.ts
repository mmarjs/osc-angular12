import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreTesting } from '@ocean/testing';
import { SessionGuard } from './session.guard';

describe('SessionGuard', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreTesting]
    })
  );

  it('should be created', () => {
    const service: SessionGuard = TestBed.get(SessionGuard);
    expect(service).toBeTruthy();
  });
});
