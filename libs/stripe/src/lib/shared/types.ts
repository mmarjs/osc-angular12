export const enum STRIPE_DETAILS_EXIT_TYPE {
  MARK = 'MARK',
  DELETE = 'DELETE',
}

export interface StripeDetailsExit {
  id?: string;
  status?: STRIPE_DETAILS_EXIT_TYPE;
}
