import { createReducer, on } from '@ngrx/store';
import * as BidsActions from './actions';
import { bidsAdapter, initialState } from './state';

export const bidsReducer = createReducer(
  initialState,

  on(BidsActions.loadBids, () => ({
    ...initialState,
    isLoading: true,
  })),
  on(BidsActions.loadBidSuccess, (state, action) => ({
    ...state,
    selectedBid: action.data,
  })),
  on(BidsActions.setAcceptedBid, (state, action) => ({
    ...state,
    selectedBid: action.bid,
  })),
  on(BidsActions.loadBidsSuccess, (state, action) =>
    bidsAdapter.addMany(action.data, {
      ...state,
      isLoading: false,
    })
  ),
  on(BidsActions.loadMyBidsSuccess, (state, action) =>
    bidsAdapter.addMany(action.data, {
      ...state,
      isLoading: false,
      pagedDataOfMyBids:action
  })
),
  on(BidsActions.acceptBidSuccess, (state, action) =>
    bidsAdapter.updateOne(
      {
        id: action.data.id,
        changes: action.data,
      },
      state
    )
  ),
  on(BidsActions.loadBidsFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(BidsActions.loadMyBidsFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(BidsActions.rejectBidSuccess, (state,action) => ({
    ...state,
    rejectedBid: action.data,
  })),
  on(BidsActions.payBidSuccess, (state, action) => ({
    ...state,
    winningBid: action.data,
  })),
);
