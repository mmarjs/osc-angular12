import { BidDTO } from '@ocean/api/shared';

export interface BidParams {
  item: BidDTO;
  readonly?: boolean;
}
