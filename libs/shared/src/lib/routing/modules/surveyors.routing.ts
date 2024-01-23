import { PrimaryRoute } from '../definitions';

export const SURVEYORS: PrimaryRoute = {
  key: 'SURVEYORS',
  path: 'surveyors',
  breadcrumb: 'Businesses',
  data: {
    title: 'My Businesses'
  },
  children: [
    {
      key: 'SURVEYORS_CREATE',
      path: 'create',
      breadcrumb: 'Create',
      data: {
        title: 'Add a Business'
      }
    },
    {
      key: 'SURVEYORS_DISPLAY',
      path: ':id',
      data: {
        title: 'Business Details'
      },
      children: [
        {
          key: 'SURVEYORS_EDIT',
          path: 'edit',
          data: {
            title: 'Edit Business'
          }
        }
      ]
    }
  ]
};
