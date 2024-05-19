import { STRIPE_DETAILS_EXIT_TYPE, StripeDetailsExit } from '../shared/types';

export const exitDetailsWithStatus = (
  status: STRIPE_DETAILS_EXIT_TYPE,
  id?: string
): StripeDetailsExit | undefined => {
  if (typeof id !== 'string') {
    return;
  }

  return {
    id,
    status: status,
  };
};
