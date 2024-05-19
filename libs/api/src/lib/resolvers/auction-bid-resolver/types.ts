import { BidDTO } from '@ocean/api/shared';

export interface PreloadedDataForAuction {
  bid: BidDTO | null;
  message: string;
  isAbleToSignDocument: boolean;
  isFullAmountPaid: boolean;
  isBidAmountPaid: boolean;
}
