import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { boatsReducer } from './boats/reducer';
import { State } from './state';
import { auctionsReducer } from './auctions/reducer';
import { errorReducer } from './ngrx-error/reducer';
import { draftsReducer } from './drafts/reducer';
import { bidItemsReducer } from './bid-items/reducer';
import { bidsReducer } from './bids/reducer';
import { myAuctionsReducer } from './my-auctions/reducer';
import { imagesReducer } from '@ocean/client/state/images/images.reducer';
import { PROGRESS_INDICATOR_KEY } from '@ocean/client/state/progress-indicator/state';
import { progressIndicatorReducer } from '@ocean/client/state/progress-indicator/reducer';

export const reducers: ActionReducerMap<State> = {
  auctions: auctionsReducer,
  myAuctions: myAuctionsReducer,
  router: routerReducer,
  boats: boatsReducer,
  error: errorReducer,
  drafts: draftsReducer,
  bidItems: bidItemsReducer,
  bids: bidsReducer,
  images: imagesReducer,
  [PROGRESS_INDICATOR_KEY]: progressIndicatorReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
