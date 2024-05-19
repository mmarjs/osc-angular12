export interface DebitCard {
  id: string;
  cardHolderName: string;
  currency: string;
  stripeId: string;
  last4: string;
  expYear: number;
  expMonth: number;
  brand: string;
  isDefaultForCurrency: boolean;
}

export type RawDebitCardData = Pick<
  DebitCard,
  'cardHolderName' | 'currency'
> & {
  number: string;
  expiryMonth: number;
  expiryYear: number;
  cvc: string;
};
