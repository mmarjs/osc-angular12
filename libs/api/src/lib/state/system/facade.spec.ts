import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { SystemEffects } from './effects';
import { SystemFacade } from './facade';

import { KEY } from '../state';
import { SystemActions } from './actions';
import { systemReducer } from './reducer';
import { initialState } from './state';
import { PartialState } from './state.partial';

describe('SystemFacade', () => {
  let facade: SystemFacade;
  let store: Store<PartialState>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            KEY,
            { system: systemReducer },
            { initialState: { system: initialState } }
          ),
          EffectsModule.forFeature([SystemEffects]),
        ],
        providers: [SystemFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(SystemFacade);
    });

    /**
     * Use `SystemLoaded` to manually submit list for state management
     */
    it('loaded$ should return the loaded flag == true', async () => {
      let isLoaded = await readFirst<string>(facade.loaded$ as any);

      store.dispatch(SystemActions.loadSystemSuccess());

      isLoaded = await readFirst<string>(facade.loaded$ as any);

      expect(isLoaded).toBe(true);
    });
  });
});
