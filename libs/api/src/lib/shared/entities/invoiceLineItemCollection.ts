/**
 * InvoiceLineItemCollection
 */

import { InvoiceLineItem } from './invoiceLineItem';
import { RequestOptions } from './requestOptions';

export interface InvoiceLineItemCollection {
  count?: number;
  data?: Array<InvoiceLineItem>;
  hasMore?: boolean;
  requestOptions?: RequestOptions;
  requestParams?: any;
  totalCount?: number;
  url?: string;
}
