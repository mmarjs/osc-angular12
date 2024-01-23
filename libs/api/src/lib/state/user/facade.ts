import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EditPaymentMethod, UserInputDTO, UserTypeTitle, UserUpdateDTO } from '@ocean/api/shared';
import { UserActions } from './actions';
import { userQuery } from './selectors';
import { PartialState } from './state.partial';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  loggedIn$ = this.store.pipe(select(userQuery.getLoggedIn));
  token$ = this.store.pipe(select(userQuery.getToken));
  userType$ = this.store.pipe(select(userQuery.getUserType));

  user$ = this.store.pipe(select(userQuery.getUser));
  id$ = this.store.pipe(select(userQuery.getId));
  name$ = this.store.pipe(select(userQuery.getName));
  isUpdating$ = this.store.pipe(select(userQuery.getIsUpdating));
  setUpIntentSuccess$ = this.store.pipe(select(userQuery.getPaymentIntent));
  getSavedCards$ = this.store.pipe(select(userQuery.getSavedCards));
  paymentId$ = this.store.pipe(select(userQuery.getPaymentId));
  isLoading$ = this.store.pipe(select(userQuery.getIsLoading));
  editPaymentMethodError$ = this.store.pipe(select(userQuery.getIsPaymentLoading));

  loginSuccess$ = this.actions$.pipe(ofType(UserActions.loginUserSuccess));
  loginError$ = this.actions$.pipe(ofType(UserActions.loginUserFailure));

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<PartialState>
  ) {
  }

  signup(request: UserInputDTO) {
    this.store.dispatch(UserActions.signUpUser({user: request}));
  }

  login() {
    this.store.dispatch(UserActions.loginUser());
  }

  reauth() {
    this.store.dispatch(UserActions.reauth());
  }

  update(data: UserUpdateDTO) {
    this.store.dispatch(UserActions.updateUser({user: data}));
  }

  updateAvatar(data: File) {
    this.store.dispatch(UserActions.updateUserAvatar({file: data}));
  }

  logout() {
    this.store.dispatch(UserActions.logoutUser());
  }

  switchAccount(type: UserTypeTitle) {
    this.store.dispatch(UserActions.switchAccount({title: type}));
  }

  setUpIntent() {
    this.store.dispatch(UserActions.setUpIntent());
  }

  loadSavedCards() {
    this.store.dispatch(UserActions.getUserCards());
  }

  deletePaymentMethod(id: number) {
    this.store.dispatch(UserActions.deletePaymentMethod({id}));
  }

  editPaymentMethod(dbPaymentId: number, editedYearAndMonth: EditPaymentMethod) {
    this.store.dispatch(UserActions.editPaymentMethod({
      edit: {
        dbPaymentId: dbPaymentId,
        editedYearAndMonth: editedYearAndMonth
      }
    }));
  }

  resetPaymentId() {
    this.store.dispatch(UserActions.resetPaymentId());
  }

  openPaymentMethodModal() {
    this.store.dispatch(UserActions.openEditPaymentMethodModal());
  }

}
