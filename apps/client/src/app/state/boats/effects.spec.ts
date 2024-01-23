import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';
import { API_ENVIRONMENT, BoatInputDTO, BoatOutputDTO } from '@ocean/api/shared';
import { mockEnvironment, StoreTesting } from '@ocean/testing';
import { Observable, of } from 'rxjs';
import { BoatsEffects } from './effects';
import { TestScheduler } from 'rxjs/testing';
import { MockProvider } from 'ng-mocks';
import { BoatProvider } from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { BoatActions } from './actions';

describe('BoatsEffects', () => {
  let actions$: Observable<any>;
  let effects: BoatsEffects;
  let notifier: NotifierService;
  let boat: BoatProvider;
  let translate: TranslateService;

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, ...StoreTesting],
      providers: [
        BoatsEffects,
        provideMockActions(() => actions$),
        {provide: API_ENVIRONMENT, useValue: mockEnvironment},
        MockProvider(NotifierService),
        MockProvider(BoatProvider),
        MockProvider(TranslateService),
      ],
    });

    effects = TestBed.inject(BoatsEffects);
    notifier = TestBed.inject(NotifierService);
    boat = TestBed.inject(BoatProvider);
    translate = TestBed.inject(TranslateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('boatCreate$ success', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable, flush} = helpers;

      const boatInputDTO: BoatInputDTO = {
        id: 0,
        name: 'name'
      };

      const boatOutputDTO: BoatOutputDTO = {
        id: boatInputDTO.id,
        name: boatInputDTO.name
      };

      jest.spyOn(boat, 'addBoat').mockImplementationOnce(() => {
        return of(boatOutputDTO);
      });

      jest.spyOn(notifier, 'success').mockReturnValue(null);

      jest.spyOn(translate, 'instant').mockImplementationOnce((key: string) => {
        return key;
      });

      const action = BoatActions.createBoat({boat: boatInputDTO});
      const completion = BoatActions.createBoatSuccess({boat: boatOutputDTO});

      actions$ = hot('a', {a: action});
      const expected = cold('b', {b: completion});

      expectObservable(effects.boatCreate$).toEqual(expected);
      flush();

      expect(notifier.success).toHaveBeenCalledWith('BOATS.BOAT_CREATED_NOTIFICATION');
    });
  });

  it('boatUpdate$ success', () => {
    testScheduler.run(helpers => {
      const {hot, cold, expectObservable, flush} = helpers;

      const boatInputDTO: BoatInputDTO = {
        id: 0,
        name: 'name'
      };

      const boatOutputDTO: BoatOutputDTO = {
        id: boatInputDTO.id,
        name: boatInputDTO.name
      };

      jest.spyOn(boat, 'updateBoatInfo').mockImplementationOnce(() => {
        return of(boatOutputDTO);
      });

      jest.spyOn(notifier, 'info').mockReturnValue(null);
      jest.spyOn(translate, 'instant').mockImplementationOnce((key: string) => {
        return key;
      });

      const action = BoatActions.updateBoat({boat: boatInputDTO});
      const completion = BoatActions.updateBoatSuccess({boat: boatOutputDTO});

      actions$ = hot('a', {a: action});
      const expected = cold('b', {b: completion});

      expectObservable(effects.boatUpdate$).toEqual(expected);
      flush();

      expect(notifier.info).toHaveBeenCalledWith('BOATS.BOAT_UPDATED_NOTIFICATION');
    });
  });
});
