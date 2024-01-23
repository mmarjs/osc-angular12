import { Country } from '@angular-material-extensions/select-country';

export const countryEntityToISO = (entity: string | Country): string => {
  switch (typeof entity) {
    case 'string':
      if (entity.length < 2 || entity.length > 3) {
        return '';
      }
      return entity;
    case 'object':
      return entity?.alpha3Code ?? '';
    default:
      return '';
  }
};
