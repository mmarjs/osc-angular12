/**
 * TransferReversalCollection
 */

import { RequestOptions } from './requestOptions';
import { Reversal } from './reversal';

export interface TransferReversalCollection {
  count?: number;
  data?: Array<Reversal>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
