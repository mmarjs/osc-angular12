import { BidDTO } from '@ocean/api/shared';

export interface AuctionBid {
  hasBid: boolean;
  bid: BidDTO | null;
}
