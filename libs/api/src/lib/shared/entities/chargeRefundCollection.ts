/**
 * ChargeRefundCollection
 */

import { Refund } from './refund';
import { RequestOptions } from './requestOptions';

export interface ChargeRefundCollection {
  count?: number;
  data?: Array<Refund>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
