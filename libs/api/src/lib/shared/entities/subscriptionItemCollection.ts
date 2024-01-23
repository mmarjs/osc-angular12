/**
 * SubscriptionItemCollection
 */

import { RequestOptions } from './requestOptions';
import { SubscriptionItem } from './subscriptionItem';

export interface SubscriptionItemCollection {
  count?: number;
  data?: Array<SubscriptionItem>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
