/**
 * CustomerCardCollection
 */

import { Card } from './card';
import { RequestOptions } from './requestOptions';

export interface CustomerCardCollection {
  count?: number;
  data?: Array<Card>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
