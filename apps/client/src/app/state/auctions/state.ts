import { BidDTO, JobDTO } from '@ocean/api/shared';
import { Document } from 'libs/documents/src/lib/state/models';

export const KEY = 'auctions';

export interface State {
  isCreating?: boolean;
  isCreateSuccess?: boolean;
  isBidCreating?: boolean;
  isBidCreated?: boolean;
  selectedAuction?: JobDTO;
  selectedBid?: BidDTO;
  selectedDocument?: Document
}

export const initialState: State = {
  isCreating: false,
  isCreateSuccess: false,
  isBidCreating: false,
  isBidCreated: false,
};
