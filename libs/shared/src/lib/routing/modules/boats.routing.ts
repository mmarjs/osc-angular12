import { PrimaryRoute } from '../definitions';

export const BOATS: PrimaryRoute = {
  key: 'BOATS',
  path: 'boats',
  breadcrumb: 'Boats',
  data: {
    title: 'My Boats'
  },
  children: [
    {
      key: 'BOATS_CREATE',
      path: 'create',
      breadcrumb: 'Create',
      data: {
        title: 'Add a Boat'
      }
    },
    {
      key: 'BOATS_DISPLAY',
      path: ':id',
      data: {
        title: 'Boat Details'
      },
      children: [
        {
          key: 'BOATS_EDIT',
          path: 'edit',
          data: {
            title: 'Edit Boat'
          }
        }
      ]
    }
  ]
};
