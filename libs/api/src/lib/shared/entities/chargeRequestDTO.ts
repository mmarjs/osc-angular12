/**
 * ChargeRequestDTO
 */

export interface ChargeRequestDTO {
  amount?: number;
  currency?: string;
  description?: string;
  stripeEmail?: string;
  stripeToken?: string;
}
