import { ISO2 } from '@ocean/shared/utils/iso-mapper';

export interface BankAccount {
  id: string;
  stripeId: string;
  accountHolderName: string;
  bankName: string;
  country: ISO2;
  currency: string;
  last4: string;
  routingNumber: string;
  isDefaultForCurrency: boolean;
}

export type RawBankAccountData = Pick<
  BankAccount,
  'accountHolderName' | 'bankName' | 'country' | 'currency' | 'routingNumber'
> & { accountNumber: string };
