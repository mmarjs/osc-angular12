import { createReducer, on } from '@ngrx/store';
import * as MyAuctionsActions from './actions';
import { initialState } from './state';

export const myAuctionsReducer = createReducer(
  initialState,
  on(MyAuctionsActions.loadMyAuctions, (state, action) => ({
    ...state,
    auctions: action.auctions
  })),
  on(MyAuctionsActions.addMyAuction, (state, action) => ({
    ...state,
    auctions: state.auctions ? state.auctions.concat(action.auction) : [action.auction]
  }))
);
