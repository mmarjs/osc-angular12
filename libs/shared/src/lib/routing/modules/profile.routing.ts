import { PrimaryRoute } from '../definitions';

export const PROFILE: PrimaryRoute = {
  key: 'PROFILE',
  path: 'profile',
  breadcrumb: 'Profile',
  data: {
    title: 'My Profile'
  },
  children: [
    {
      key: 'PROFILE_EDIT',
      path: 'edit',
      breadcrumb: 'Edit',
      data: {
        title: 'Edit Profile'
      }
    },
    {
      key: 'PROFILE_PASSWORD',
      path: 'password',
      data: {
        title: 'Change Password'
      }
    },
    {
      key: 'SERVICES',
      path: 'services',
      breadcrumb: 'Services',
      data: {
        title: 'Services'
      },
      children: [
        {
          key: 'SERVICES_BOATS',
          path: 'boats',
          breadcrumb: 'Boats',
          data: {
            title: 'My Boats'
          },
          children: [
            {
              key: 'SERVICES_BOATS_DISPLAY',
              path: ':id',
              data: {
                title: 'Boat Details'
              },
              children: [
                {
                  key: 'SERVICES_BOATS_EDIT',
                  path: 'edit',
                  data: {
                    title: 'Edit Boat'
                  }
                }
              ]
            }
          ]
        },
        {
          key: 'SERVICES_SHIPYARDS',
          path: 'shipyards',
          breadcrumb: 'Shipyards',
          data: {
            title: 'My Shipyards'
          },
          children: [
            {
              key: 'SERVICES_SHIPYARDS_DISPLAY',
              path: ':id',
              data: {
                title: 'Shipyard Details'
              },
              children: [
                {
                  key: 'SERVICES_SHIPYARDS_EDIT',
                  path: 'edit',
                  data: {
                    title: 'Edit Shipyard'
                  }
                }
              ]
            }
          ]
        },
        {
          key: 'SERVICES_SURVEYORS',
          path: 'surveyors',
          breadcrumb: 'Surveyors',
          data: {
            title: 'My Surveyors'
          },
          children: [
            {
              key: 'SERVICES_SURVEYORS_DISPLAY',
              path: ':id',
              data: {
                title: 'Surveyor Details'
              },
              children: [
                {
                  key: 'SERVICES_SURVEYORS_EDIT',
                  path: 'edit',
                  data: {
                    title: 'Edit Surveyor'
                  }
                }
              ]
            }
          ]
        }
      ],
    },
    {
      key: 'PROFILE_RATINGS',
      path: 'ratings',
      data: {
        title: 'View Ratings'
      }
    }
  ]
};
