import { Country } from '@angular-material-extensions/select-country';
import { ISO2 } from '@ocean/shared/utils/iso-mapper';

export const countryNameIsoMapping: Record<string, ISO2> = {
  Australia: 'AU', Austria: 'AT', Belgium: 'BE', Brazil: 'BR',
  Bulgaria: 'BG', Canada: 'CA', Croatia: 'HR', Cyprus: 'CY',
  'Czech Republic': 'CZ', Denmark: 'DK', Estonia: 'EE', Finland: 'FI',
  France: 'FR', Germany: 'DE', Gibraltar: 'GI', Greece: 'GR', 'Hong Kong': 'HK',
  Hungary: 'HU', India: 'IN', Ireland: 'IE', Italy: 'IT',
  Japan: 'JP', Latvia: 'LV', Liechtenstein: 'LI', Lithuania: 'LT',
  Luxembourg: 'LU', Malaysia: 'MY', Malta: 'MT', Mexico: 'MX',
  Netherlands: 'NL', 'New Zealand': 'NZ', Norway: 'NO', Poland: 'PL',
  Portugal: 'PT', Romania: 'RO', Singapore: 'SG', Slovakia: 'SK',
  Slovenia: 'SI', Spain: 'ES', Sweden: 'SE', Switzerland: 'CH',
  Thailand: 'TH', 'United Arab Emirates': 'AR', 'United Kingdom': 'GB', 'Unites States': 'US'
} as const;

export const supportedStripeISO2: ISO2[] = Object.values(countryNameIsoMapping);

export const supportedStripeCountries =
  Object.entries(countryNameIsoMapping)
    .reduce((acc, cur) => {
      const [name, iso] = cur;
      return [
        {
          name: `${name}`,
          alpha2Code: `${iso}`,
          alpha3Code: '',
          numericCode: '',
          callingCode: ''
        },
        ...acc
      ];
    }, [] as Country[]);
