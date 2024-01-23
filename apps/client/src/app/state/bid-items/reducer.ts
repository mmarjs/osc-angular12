import { bidItemsAdapter, initialState, State } from './state';
import { BidItemsAction, BidItemsActionTypes } from './actions';

export function bidItemsReducer(
  state = initialState,
  action: BidItemsAction
): State {
  switch (action.type) {
    case BidItemsActionTypes.AddBidItems:
      return bidItemsAdapter.setAll(action?.payload ?? [], state);

    case BidItemsActionTypes.AddBidItem:
      return bidItemsAdapter.addOne(action.payload, state);

    case BidItemsActionTypes.UpdateOne:
      return bidItemsAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);

    case BidItemsActionTypes.DeleteBidItem:
      return bidItemsAdapter.removeOne(action.payload, state);

    default:
      return state;
  }
}
