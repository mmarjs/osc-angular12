import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { BoatsEffects } from './effects';
import { BoatsFacade } from './facade';
import { API_ENVIRONMENT } from '@ocean/api/shared';
import { mockEnvironment } from '@ocean/testing';
import { boatsReducer } from './reducer';
import { initialState } from './state';
import { PartialState } from './state.partial';
import { MockProvider } from 'ng-mocks';
import { TranslateService } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { TestModule } from '@ocean/testing/helpers/test.module';

describe('BoatsFacade', () => {
  let facade: BoatsFacade;
  let store: Store<PartialState>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          MatDialogModule,
          MatSnackBarModule,
          NxModule.forRoot(),
          StoreModule.forRoot(
            { boats: boatsReducer },
            { initialState: { boats: initialState } }
          ),
          EffectsModule.forRoot([BoatsEffects]),
          TestModule
        ],
        providers: [
          { provide: API_ENVIRONMENT, useValue: mockEnvironment },
          provideMockStore({
            initialState: { boats: initialState }
          }),
          MockProvider(TranslateService),
          MockProvider(BoatsEffects)
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(BoatsFacade);
    });

    it('should be created', () => {
      expect(facade).toBeTruthy();
    });
  });
});
