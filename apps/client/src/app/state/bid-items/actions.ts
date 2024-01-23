import { Action } from '@ngrx/store';
import { BiddingTableFormModel } from '@ocean/api/shared';

export enum BidItemsActionTypes {
  AddBidItems = '[Bid Item] Add Bid Items',
  AddBidItem = '[Bid Item] Add Bid Item',
  UpdateOne = '[Bid Item] Update Bid Item',
  DeleteBidItem = '[Bid Item] Delete Bid Item'
}

export class AddBidItems implements Action {
  readonly type = BidItemsActionTypes.AddBidItems;
  constructor(public payload: BiddingTableFormModel[]) { }
}

export class AddBidItem implements Action {
  readonly type = BidItemsActionTypes.AddBidItem;
  constructor(public payload: BiddingTableFormModel) { }
}

export class UpdateOne implements Action {
  readonly type = BidItemsActionTypes.UpdateOne;
  constructor(public payload: BiddingTableFormModel) { }
}

export class DeleteBidItem implements Action {
  readonly type = BidItemsActionTypes.DeleteBidItem;
  constructor(public payload: number) { }
}

export type BidItemsAction = AddBidItems
  | AddBidItem
  | UpdateOne
  | DeleteBidItem;

export const fromBidItemsActions = {
  AddBidItems,
  AddBidItem,
  UpdateOne,
  DeleteBidItem
};
