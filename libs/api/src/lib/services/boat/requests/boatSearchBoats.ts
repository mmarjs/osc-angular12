/**
 * BoatSearchBoatsRequest
 */

import { Pageable } from '@ocean/api/shared';

export interface BoatSearchBoatsRequest {
  searchKey?: string;
  pageable?: Pageable;
}
