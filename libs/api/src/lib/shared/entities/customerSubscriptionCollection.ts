/**
 * CustomerSubscriptionCollection
 */

import { RequestOptions } from './requestOptions';
import { Subscription } from './subscription';

export interface CustomerSubscriptionCollection {
  count?: number;
  data?: Array<Subscription>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
