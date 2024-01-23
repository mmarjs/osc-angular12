/**
 * BidFindByIdRequest
 */

import { PageableWithoutDirection } from "@ocean/api/shared";

export interface BidFindByIdRequest {
  id?: number;
}

export interface GetMyBids{
  pageable:PageableWithoutDirection
}