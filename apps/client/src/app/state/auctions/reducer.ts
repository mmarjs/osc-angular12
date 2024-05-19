import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import { AuctionsActions } from './actions';

export const auctionsReducer = createReducer(
  initialState,
  on(AuctionsActions.initAuction, (state) => ({
    ...state,
    ...initialState,
  })),
  on(AuctionsActions.createAuction, AuctionsActions.editAuction, (state) => ({
    ...state,
    isCreating: true,
    isCreateSuccess: false,
  })),
  on(
    AuctionsActions.createAuctionSuccess,
    AuctionsActions.editAuctionSuccess,
    (state, { auction }) => ({
      ...state,
      selectedAuction: auction,
      isCreating: false,
      isCreateSuccess: true,
    })
  ),
  on(AuctionsActions.resetSelectedBid, (state) => ({
    ...state,
    selectedBid: undefined,
    hasBid: false,
  })),
  on(
    AuctionsActions.createAuctionFailure,
    AuctionsActions.editAuctionFailure,
    (state) => ({
      ...state,
      isCreating: false,
      isCreateSuccess: false,
    })
  ),
  on(AuctionsActions.setSelectedAuction, (state, { auction }) => ({
    ...state,
    selectedAuction: auction,
  })),
  on(AuctionsActions.createBidOnAuction, (state) => ({
    ...state,
    isBidCreating: true,
    isBidCreated: false,
  })),
  on(AuctionsActions.getBidByAuctionSuccess, (state, { bid, hasBid }) => ({
    ...state,
    isBidCreating: false,
    isBidCreated: true,
    selectedBid: bid,
    hasBid: hasBid,
  })),
  on(AuctionsActions.createBidOnAuctionSuccess, (state, { bid }) => ({
    ...state,
    isBidCreating: false,
    isBidCreated: true,
    selectedBid: bid,
    hasBid: true,
  })),
  on(AuctionsActions.createBidOnAuctionFailure, (state) => ({
    ...state,
    isBidCreating: false,
    isBidCreated: false,
    selectedBid: undefined,
    hasBid: false,
  })),
  on(AuctionsActions.getDocumentsSuccess, (state, { document }) => ({
    ...state,
    selectedDocument: document,
  })),
  on(AuctionsActions.setSelectedDocument, (state, { document }) => ({
    ...state,
    selectedDocument: document,
  })),
  on(AuctionsActions.extendEndDateSuccess, (state, { auction }) => ({
    ...state,
    selectedAuction: auction,
  })),
  on(AuctionsActions.refresh, (state, { status }) => ({
    ...state,
    refresh: status,
  }))
);
