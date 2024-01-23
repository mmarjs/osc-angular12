import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BiddingTableFormModel } from '@ocean/api/shared';

export const KEY = 'bidItems';

export const bidItemsAdapter: EntityAdapter<BiddingTableFormModel> = createEntityAdapter<BiddingTableFormModel>({
  selectId: model => model.id
});

export interface State extends EntityState<BiddingTableFormModel> {
}

export const initialState: State = bidItemsAdapter.getInitialState();
