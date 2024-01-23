import { RouterStateType } from './router';

import * as BoatsState from './boats/state';
import * as AuctionsState from './auctions/state';
import * as MyAuctionsState from './my-auctions/state';
import * as ErrorState from './ngrx-error/state';
import * as DraftsState from './drafts/state';
import * as BidItemsState from './bid-items/state';
import * as BidsState from './bids/state';
import * as ImagesState from './images/state';

export interface State {
  auctions: AuctionsState.State;
  myAuctions: MyAuctionsState.State;
  router: RouterStateType;
  boats: BoatsState.State;
  error: ErrorState.ErrorState;
  drafts: DraftsState.State;
  bidItems: BidItemsState.State;
  bids: BidsState.State;
  images: ImagesState.State;
}
