/**
 * TransferCollection
 */

import { RequestOptions } from './requestOptions';
import { Transfer } from './transfer';

export interface TransferCollection {
  count?: number;
  data?: Array<Transfer>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
