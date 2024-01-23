/**
 * OrderReturnCollection
 */

import { OrderReturn } from './orderReturn';
import { RequestOptions } from './requestOptions';

export interface OrderReturnCollection {
  count?: number;
  data?: Array<OrderReturn>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
