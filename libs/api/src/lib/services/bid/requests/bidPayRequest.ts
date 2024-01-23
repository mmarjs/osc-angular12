export interface BidPayRequest {
  offSession: boolean;
  autoConfirm: boolean;
  stripePaymentMethodId: string;
}
