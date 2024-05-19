import { stripeCardFields } from '@ocean/forms-config';
import { RawDebitCardData } from '@ocean/api/shared/entities/stripe/debit-card';

type FormRawData = {
  [K in keyof typeof stripeCardFields]: string;
};

export const normalizeFormRawCardData = (
  data?: FormRawData
): RawDebitCardData | undefined => {
  if (
    typeof data !== 'object' ||
    typeof data?.number !== 'string' ||
    typeof data?.expireDate !== 'string' ||
    !data.expireDate.match(/^\d\d\/\d\d$/)
  ) {
    return;
  }

  const { expireDate, ...destructedData } = data;
  const [expiryMonth, expiryYear] = expireDate.split('/');

  return {
    ...destructedData,
    number: data.number.replace(/\s/g, ''),
    expiryMonth: +(expiryMonth as string),
    expiryYear: +(expiryYear as string),
  };
};
