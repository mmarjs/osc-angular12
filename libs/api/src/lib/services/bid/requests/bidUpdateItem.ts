/**
 * BidUpdateItemRequest
 */

import { BidItemDTO } from '@ocean/api/shared';

export interface BidUpdateItemRequest {
  id: number;
  itemId: number;
  dto: BidItemDTO;
}
