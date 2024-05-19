import { BankAccount } from '@ocean/api/shared/entities/stripe/bank-account';

export interface BankDetailsTable {
  title: string;
  key: keyof BankAccount;
}

export const bankDetailsTables: BankDetailsTable[] = [
  {
    title: 'FORMS.LABELS.ACCOUNT_HOLDER_NAME',
    key: 'accountHolderName',
  },
  {
    title: 'FORMS.LABELS.COUNTRY',
    key: 'country',
  },
  {
    title: 'FORMS.LABELS.CURRENCY',
    key: 'currency',
  },
  {
    title: 'FORMS.LABELS.ROUTING_NUMBER',
    key: 'routingNumber',
  },
];
