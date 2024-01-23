import { PrimaryRoute } from '../definitions';

export const SHIPYARDS: PrimaryRoute = {
  key: 'SHIPYARDS',
  path: 'shipyards',
  breadcrumb: 'Shipyards',
  data: {
    title: 'My Shipyards'
  },
  children: [
    {
      key: 'SHIPYARDS_CREATE',
      path: 'create',
      breadcrumb: 'Create',
      data: {
        title: 'Add a Shipyard'
      }
    },
    {
      key: 'SHIPYARDS_DISPLAY',
      path: ':id',
      data: {
        title: 'Shipyard Details'
      },
      children: [
        {
          key: 'SHIPYARDS_EDIT',
          path: 'edit',
          data: {
            title: 'Edit Shipyard'
          }
        }
      ]
    }
  ]
};
