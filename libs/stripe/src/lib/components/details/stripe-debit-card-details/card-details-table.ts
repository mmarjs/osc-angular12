import { DebitCard } from '@ocean/api/shared/entities/stripe/debit-card';

export interface CardDetailsTable {
  title: string;
  key: keyof DebitCard;
}

export const cardDetailsTables: CardDetailsTable[] = [
  {
    title: 'FORMS.LABELS.ACCOUNT_HOLDER_NAME',
    key: 'cardHolderName',
  },
  {
    title: 'FORMS.LABELS.BRAND',
    key: 'brand',
  },
  {
    title: 'FORMS.LABELS.CURRENCY',
    key: 'currency',
  },
];
