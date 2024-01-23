import { PrimaryRoute } from '../definitions';

export const AUCTIONS: PrimaryRoute = {
  key: 'AUCTIONS',
  path: 'auctions',
  data: {
    title: 'Auctions',
  },
  children: [
    {
      key: 'AUCTION',
      path: ':id',
      data: {
        title: null,
      },
      children: [
        {
          key: 'AUCTION_DETAIL',
          path: 'details',
          data: {
            title: 'Auction Details',
          },
        },
        {
          key: 'AUCTION_DETAIL_EDIT',
          path: 'edit-details/:id',
          data: {
            title: 'Edit Bid',
          },
        },
        {
          key: 'AUCTION_EDIT',
          path: 'edit',
          breadcrumb: 'Edit Auction',
          data: {
            title: 'Edit Auction',
          },
        },
        {
          key: 'AUCTION_PAYMENT',
          path: 'payment',
          data: {
            title: 'Auction Payment',
          },
        },
        {
          key: 'BIDS',
          path: 'bids',
          data: {
            title: 'Bids',
          },
          children: [
            {
              key: 'BID_DEPOSIT',
              path: 'deposit/:bidId',
              breadcrumb: 'Payment',
              data: {
                title: 'BID_DEPOSIT',
              }
            },
            {
              key: 'BID_REVIEW_WORK',
              path: 'review-work/:bidId',
            },
            {
              key: 'BIDS_DOCUMENTS',
              path: 'documents/:bidId',
              breadcrumb:'Documents',
              data: {
                title: 'BIDS_DOCUMENTS',
              }
            },
          ],
        },
      ],
    },
    {
      key: 'LIST_BOAT',
      path: ':id',
      children: [
        {
          key: 'AUCTION_CREATE',
          path: 'create',
          breadcrumb: 'Create Auction',
          data: {
            title: 'Create Auction',
          },
        },
      ],
    },
  ],
};
