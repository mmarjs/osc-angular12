import { Injectable } from '@angular/core';
import { ClientService, Params } from '@ocean/api/client';
import { PaymentDTO } from '@ocean/api/shared';

import {
  PaymentChargeRequest,
  PaymentDepositRequest,
  PaymentRefundRequest,
  PaymentRegisterChargeMethodRequest,
  PaymentRegisterPayoutMethodRequest
} from './requests';

@Injectable({
  providedIn: 'root'
})
export class PaymentProvider {
  public constructor(private readonly api: ClientService) {}

  /**
   * Deposit
   * Responses: 200, 201, 401, 403, 404
   */
  public deposit(request?: PaymentDepositRequest) {
    const params = new Params(request, [], [], ['depositDTO']);

    return this.api.request<PaymentDTO>({
      url: `/api/payments/deposit`,
      method: 'POST',
      data: params.forBody
    });
  }

  /**
   * Charge
   * Responses: 200, 201, 401, 403, 404
   */
  public charge(request: PaymentChargeRequest) {
    return this.api.request<PaymentDTO>({
      url: `/api/payments/jobs/${request.id}`,
      method: 'POST'
    });
  }

  /**
   * Refund
   * Responses: 200, 201, 401, 403, 404
   */
  public refund(request: PaymentRefundRequest) {
    const params = new Params(request, ['id'], [], ['refundDTO']);

    return this.api.request<PaymentDTO>({
      url: `/api/payments/jobs/${request.id}/refund`,
      method: 'POST',
      data: params.forBody
    });
  }

  /**
   * RegisterChargeMethod
   * Responses: 200, 201, 401, 403, 404
   */
  public registerChargeMethod(request: PaymentRegisterChargeMethodRequest) {
    return this.api.request({
      url: `/api/payments/register-charge/${request.token}`,
      method: 'POST'
    });
  }

  /**
   * RegisterPayoutMethod
   * Responses: 200, 201, 401, 403, 404
   */
  public registerPayoutMethod(request: PaymentRegisterPayoutMethodRequest) {
    return this.api.request({
      url: `/api/payments/register-payout/${request.token}`,
      method: 'POST'
    });
  }
}
