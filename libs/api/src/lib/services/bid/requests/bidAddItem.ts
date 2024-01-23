/**
 * BidAddItemRequest
 */

import { BidItemDTO } from '@ocean/api/shared';

export interface BidAddItemRequest {
  id: number;
  dto: BidItemDTO;
}
