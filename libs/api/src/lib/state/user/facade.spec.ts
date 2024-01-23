import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { UserFacade } from './facade';
import { API_ENVIRONMENT } from '@ocean/api/shared';
import { mockEnvironment } from '@ocean/testing';
import { KEY } from '../state';
import { UserActions } from './actions';
import { userReducer } from './reducer';
import { initialState } from './state';
import { PartialState } from './state.partial';

describe('UserFacade', () => {
  let facade: UserFacade;
  let store: Store<PartialState>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          RouterTestingModule,
          StoreModule.forFeature(
            KEY,
            {user: userReducer},
            {initialState: {user: initialState}}
          ),
          EffectsModule.forFeature([]),
        ],
        providers: [
          {provide: API_ENVIRONMENT, useValue: mockEnvironment},
          UserFacade,
        ],
      })
      class CustomFeatureModule {
      }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {
      }

      TestBed.configureTestingModule({imports: [RootModule]});

      store = TestBed.get(Store);
      facade = TestBed.get(UserFacade);
    });

    /**
     * Use `LoginSuccess` to manually submit the user for state management
     */
    it('name$ should return the the loggedin name', async () => {
      let userName = await readFirst<string>(facade.name$ as any);

      store.dispatch(
        UserActions.loginUserSuccess({
          user: {
            authId: '1',
            firstName: 'admin',
            userTypes: []
          },
        })
      );

      userName = await readFirst<string>(facade.name$ as any);

      expect(userName).toBe('admin');
    });
  });
});
