import { Country } from '@angular-material-extensions/select-country';
import {
  getCountryISO2ByISO3,
  getCountryISO3ByISO2,
  ISO2,
  ISO3,
} from './iso-mapper';

export const stringToCountryField = (code?: string): Country => {
  const template = {
    name: '',
    alpha2Code: '',
    alpha3Code: '',
    numericCode: '',
    callingCode: '',
  };

  if (
    code === null ||
    code === undefined ||
    typeof code !== 'string' ||
    code?.length < 2 ||
    code?.length > 3
  ) {
    return template;
  }

  return {
    ...template,
    alpha2Code:
      code.length === 3
        ? getCountryISO2ByISO3(code as ISO3)
        : code?.toUpperCase() ?? '',
    alpha3Code:
      code.length === 2
        ? getCountryISO3ByISO2(code as ISO2)
        : code?.toUpperCase() ?? '',
  };
};
