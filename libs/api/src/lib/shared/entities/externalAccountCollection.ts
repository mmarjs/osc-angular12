/**
 * ExternalAccountCollection
 */

import { ExternalAccount } from './externalAccount';
import { RequestOptions } from './requestOptions';

export interface ExternalAccountCollection {
  count?: number;
  data?: Array<ExternalAccount>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
