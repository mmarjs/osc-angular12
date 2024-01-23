/**
 * PaymentRefundRequest
 */

import { RefundDTO } from '@ocean/api/shared';

export interface PaymentRefundRequest {
  id: number;
  refundDTO: RefundDTO;
}
