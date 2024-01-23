/**
 * FeeRefundCollection
 */

import { FeeRefund } from './feeRefund';
import { RequestOptions } from './requestOptions';

export interface FeeRefundCollection {
  count?: number;
  data?: Array<FeeRefund>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
