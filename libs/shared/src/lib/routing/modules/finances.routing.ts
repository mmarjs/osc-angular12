import { PrimaryRoute } from '../definitions';

export const FINANCES: PrimaryRoute = {
  key: 'FINANCES',
  path: 'finances',
  breadcrumb: 'Finances',
  data: {
    title: 'My Finances'
  },
  children: [
    {
      key: 'FINANCES_TRANSFER',
      path: 'transfer',
      breadcrumb: 'Funds',
      data: {
        title: 'Transfer Funds'
      }
    },
    {
      key: 'FINANCES_BANK',
      path: 'bank',
      breadcrumb: 'Bank Information',
      data: {
        title: 'Manage Bank Information'
      }
    },
    {
      key: 'FINANCES_TRANSACTIONS',
      path: 'transactions',
      breadcrumb: 'Transactions',
      data: {
        title: 'View Transactions'
      }
    }
  ]
};
