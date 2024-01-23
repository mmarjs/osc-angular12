export type ISO3 = keyof typeof countryISOMapping;
export type ISO2 = typeof countryISOMapping[keyof typeof countryISOMapping];
export type ISO = Uppercase<ISO2> | Lowercase<ISO2> | Uppercase<ISO3> | Lowercase<ISO3>;

export interface CountryAdministrativeUnits {
  states: boolean;
  provinces: boolean;
  regions: boolean;
}

const countryISOMapping = {
  AFG: 'AF', ALA: 'AX', ALB: 'AL', DZA: 'DZ', ASM: 'AS', AND: 'AD', AGO: 'AO', AIA: 'AI', ATA: 'AQ',
  ATG: 'AG', ARG: 'AR', ARM: 'AM', ABW: 'AW', AUS: 'AU', AUT: 'AT', AZE: 'AZ', BHS: 'BS', BHR: 'BH',
  BGD: 'BD', BRB: 'BB', BLR: 'BY', BEL: 'BE', BLZ: 'BZ', BEN: 'BJ', BMU: 'BM', BTN: 'BT', BOL: 'BO',
  BES: 'BQ', BIH: 'BA', BWA: 'BW', BVT: 'BV', BRA: 'BR', VGB: 'VG', IOT: 'IO', BRN: 'BN', BGR: 'BG',
  BFA: 'BF', BDI: 'BI', KHM: 'KH', CMR: 'CM', CAN: 'CA', CPV: 'CV', CYM: 'KY', CAF: 'CF', TCD: 'TD',
  CHL: 'CL', CHN: 'CN', HKG: 'HK', MAC: 'MO', CXR: 'CX', CCK: 'CC', COL: 'CO', COM: 'KM', COG: 'CG',
  COD: 'CD', COK: 'CK', CRI: 'CR', CIV: 'CI', HRV: 'HR', CUB: 'CU', CUW: 'CW', CYP: 'CY', CZE: 'CZ',
  DNK: 'DK', DJI: 'DJ', DMA: 'DM', DOM: 'DO', ECU: 'EC', EGY: 'EG', SLV: 'SV', GNQ: 'GQ', ERI: 'ER',
  EST: 'EE', ETH: 'ET', FLK: 'FK', FRO: 'FO', FJI: 'FJ', FIN: 'FI', FRA: 'FR', GUF: 'GF', PYF: 'PF',
  ATF: 'TF', GAB: 'GA', GMB: 'GM', GEO: 'GE', DEU: 'DE', GHA: 'GH', GIB: 'GI', GRC: 'GR', GRL: 'GL',
  GRD: 'GD', GLP: 'GP', GUM: 'GU', GTM: 'GT', GGY: 'GG', GIN: 'GN', GNB: 'GW', GUY: 'GY', HTI: 'HT',
  HMD: 'HM', VAT: 'VA', HND: 'HN', HUN: 'HU', ISL: 'IS', IND: 'IN', IDN: 'ID', IRN: 'IR', IRQ: 'IQ',
  IRL: 'IE', IMN: 'IM', ISR: 'IL', ITA: 'IT', JAM: 'JM', JPN: 'JP', JEY: 'JE', JOR: 'JO', KAZ: 'KZ',
  KEN: 'KE', KIR: 'KI', PRK: 'KP', KOR: 'KR', KWT: 'KW', KGZ: 'KG', LAO: 'LA', LVA: 'LV', LBN: 'LB',
  LSO: 'LS', LBR: 'LR', LBY: 'LY', LIE: 'LI', LTU: 'LT', LUX: 'LU', MKD: 'MK', MDG: 'MG', MWI: 'MW',
  MYS: 'MY', MDV: 'MV', MLI: 'ML', MLT: 'MT', MHL: 'MH', MTQ: 'MQ', MRT: 'MR', MUS: 'MU', MYT: 'YT',
  MEX: 'MX', FSM: 'FM', MDA: 'MD', MCO: 'MC', MNG: 'MN', MNE: 'ME', MSR: 'MS', MAR: 'MA', MOZ: 'MZ',
  MMR: 'MM', NAM: 'NA', NRU: 'NR', NPL: 'NP', NLD: 'NL', ANT: 'AN', NCL: 'NC', NZL: 'NZ', NIC: 'NI',
  NER: 'NE', NGA: 'NG', NIU: 'NU', NFK: 'NF', MNP: 'MP', NOR: 'NO', OMN: 'OM', PAK: 'PK', PLW: 'PW',
  PSE: 'PS', PAN: 'PA', PNG: 'PG', PRY: 'PY', PER: 'PE', PHL: 'PH', PCN: 'PN', POL: 'PL', PRT: 'PT',
  PRI: 'PR', QAT: 'QA', REU: 'RE', ROU: 'RO', RUS: 'RU', RWA: 'RW', BLM: 'BL', SHN: 'SH', KNA: 'KN',
  LCA: 'LC', MAF: 'MF', SPM: 'PM', VCT: 'VC', WSM: 'WS', SMR: 'SM', STP: 'ST', SAU: 'SA', SEN: 'SN',
  SRB: 'RS', SYC: 'SC', SLE: 'SL', SGP: 'SG', SXM: 'SX', SVK: 'SK', SVN: 'SI', SLB: 'SB', SOM: 'SO',
  ZAF: 'ZA', SGS: 'GS', SSD: 'SS', ESP: 'ES', LKA: 'LK', SDN: 'SD', SUR: 'SR', SJM: 'SJ', SWZ: 'SZ',
  SWE: 'SE', CHE: 'CH', SYR: 'SY', TWN: 'TW', TJK: 'TJ', TZA: 'TZ', THA: 'TH', TLS: 'TL', TGO: 'TG',
  TKL: 'TK', TON: 'TO', TTO: 'TT', TUN: 'TN', TUR: 'TR', TKM: 'TM', TCA: 'TC', TUV: 'TV', UGA: 'UG',
  UKR: 'UA', ARE: 'AE', GBR: 'GB', USA: 'US', UMI: 'UM', URY: 'UY', UZB: 'UZ', VUT: 'VU', VEN: 'VE',
  VNM: 'VN', VIR: 'VI', WLF: 'WF', ESH: 'EH', YEM: 'YE', ZMB: 'ZM', ZWE: 'ZW', XKX: 'XK'
} as const;

const countriesWithStatesISO3: readonly ISO3[] = [
  'AUS', 'AUT', 'BRA', 'DEU', 'IND', 'MYS', 'MEX', 'FSM', 'MMR', 'NZL', 'NGA', 'PLW',
  'SSD', 'USA'
];

const countriesWithProvincesISO3: readonly ISO3[] = [
  'AFG', 'DZA', 'AGO', 'ARG', 'ARM', 'BLR', 'BEL', 'BOL', 'BGR', 'BFA', 'BDI', 'KHM',
  'CAN', 'CHL', 'CHN', 'CRI', 'CUB', 'COD', 'DOM', 'ECU', 'GNQ', 'FJI', 'FIN', 'GAB',
  'GEO', 'GRC', 'IDN', 'IRN', 'IRL', 'ITA', 'KAZ', 'KEN', 'KGZ', 'LAO', 'MDG', 'MNG',
  'MOZ', 'NPL', 'NLD', 'PRK', 'NOR', 'OMN', 'PAK', 'PAN', 'PNG', 'PER', 'PHL', 'POL',
  'ROU', 'RWA', 'SAU', 'SLE', 'SLB', 'ZAF', 'KOR', 'ESP', 'LKA', 'SUR', 'TJK', 'THA',
  'TON', 'TUR', 'TKM', 'UKR', 'UZB', 'VUT', 'VNM', 'ZMB', 'ZWE',
];

const countriesWithRegionsISO3: readonly ISO3[] = [
  'AND', 'ARE', 'AFG', 'ATG', 'AIA', 'ALB', 'ARM', 'ANT', 'AGO', 'ATA', 'ARG', 'ASM',
  'AUT', 'AUS', 'ABW', 'AZE', 'BIH', 'BRB', 'BGD', 'BEL', 'BFA', 'BGR', 'BHR', 'BDI',
  'BEN', 'BMU', 'BRN', 'BOL', 'BRA', 'BHS', 'BTN', 'BVT', 'BWA', 'BLR', 'BLZ', 'CAN',
  'CCK', 'COD', 'CAF', 'COG', 'CHE', 'CIV', 'COK', 'CHL', 'CMR', 'CHN', 'COL', 'CRI',
  'CUB', 'CPV', 'CXR', 'CYP', 'CZE', 'DEU', 'DJI', 'DNK', 'DMA', 'DOM', 'DZA', 'ECU',
  'EST', 'EGY', 'ESH', 'ERI', 'ESP', 'ETH', 'FIN', 'FJI', 'FLK', 'FSM', 'FRO', 'FRA',
  'GAB', 'GBR', 'GRD', 'GEO', 'GUF', 'GHA', 'GIB', 'GRL', 'GMB', 'GIN', 'GLP', 'GNQ',
  'GRC', 'SGS', 'GTM', 'GUM', 'GNB', 'GUY', 'HKG', 'HMD', 'HND', 'HRV', 'HTI', 'HUN',
  'IDN', 'IRL', 'ISR', 'IND', 'IOT', 'IRQ', 'IRN', 'ISL', 'ITA', 'JAM', 'JOR', 'JPN',
  'KEN', 'KGZ', 'KHM', 'KIR', 'COM', 'KNA', 'PRK', 'KOR', 'KWT', 'CYM', 'KAZ', 'LAO',
  'LBN', 'LCA', 'LIE', 'LKA', 'LBR', 'LSO', 'LTU', 'LUX', 'LVA', 'LBY', 'MAR', 'MCO',
  'MDA', 'MDG', 'MHL', 'MKD', 'MLI', 'MMR', 'MNG', 'MAC', 'MNP', 'MTQ', 'MRT', 'MSR',
  'MLT', 'MUS', 'MDV', 'MWI', 'MEX', 'MYS', 'MOZ', 'NAM', 'NCL', 'NER', 'NFK', 'NGA',
  'NIC', 'NLD', 'NOR', 'NPL', 'NRU', 'NIU', 'NZL', 'OMN', 'PAN', 'PER', 'PYF', 'PNG',
  'PHL', 'PAK', 'POL', 'SPM', 'PCN', 'PRI', 'PSE', 'PRT', 'PLW', 'PRY', 'QAT', 'REU',
  'ROU', 'RUS', 'RWA', 'SAU', 'SLB', 'SYC', 'SSD', 'SDN', 'SWE', 'SGP', 'SHN', 'SVN',
  'SJM', 'SVK', 'SLE', 'SMR', 'SEN', 'SOM', 'SUR', 'STP', 'SLV', 'SYR', 'SWZ', 'TCA',
  'TCD', 'ATF', 'TGO', 'THA', 'TJK', 'TKL', 'TKM', 'TUN', 'TON', 'TLS', 'TUR', 'TTO',
  'TUV', 'TWN', 'TZA', 'UKR', 'UGA', 'UMI', 'USA', 'URY', 'UZB', 'VAT', 'VCT', 'VEN',
  'VGB', 'VIR', 'VNM', 'VUT', 'WLF', 'WSM', 'YEM', 'MYT', 'SRB', 'ZAF', 'ZMB', 'MNE',
  'ZWE', 'ALA', 'GGY', 'IMN', 'JEY', 'BLM', 'MAF'
];

const reversedCountryISOMapping =
  Object.entries(countryISOMapping)
    .reduce((acc, cur) => {
      const [key, value] = cur;
      return {
        [value]: key,
        ...acc
      };
    }, {} as Record<ISO2, ISO3>);

const countriesWithStatesISO2: ISO2[] =
  Object.entries(countryISOMapping)
    .filter(([iso3]) => countriesWithStatesISO3.includes(iso3 as ISO3))
    .map(([_, iso2]) => iso2);

const countriesWithProvincesISO2: ISO2[] =
  Object.entries(countryISOMapping)
    .filter(([iso3]) => countriesWithProvincesISO3.includes(iso3 as ISO3))
    .map(([_, iso2]) => iso2);

const countriesWithRegionsISO2: ISO2[] =
  Object.entries(countryISOMapping)
    .filter(([iso3]) => countriesWithRegionsISO3.includes(iso3 as ISO3))
    .map(([_, iso2]) => iso2);

const isISO2 = (iso: ISO): iso is ISO2 => iso?.length === 2;

export const getCountryISO2ByISO3 =
  (iso3Code: Uppercase<ISO3> | Lowercase<ISO3>): ISO2 | string =>
    countryISOMapping?.[iso3Code?.toUpperCase()] ?? '';

export const getCountryISO3ByISO2 =
  (iso2Code: Uppercase<ISO2> | Lowercase<ISO2>): ISO3 | string =>
    reversedCountryISOMapping?.[iso2Code?.toUpperCase()] ?? '';

export const countryHasStates = (iso?: ISO): boolean =>
  isISO2(iso) ?
    countriesWithStatesISO2.includes(iso?.toUpperCase() as ISO2) :
    countriesWithStatesISO3.includes(iso?.toUpperCase() as ISO3);

export const countryHasProvinces = (iso?: ISO): boolean =>
  isISO2(iso) ?
    countriesWithProvincesISO2.includes(iso?.toUpperCase() as ISO2) :
    countriesWithProvincesISO3.includes(iso?.toUpperCase() as ISO3);

export const countryHasRegions = (iso?: ISO): boolean =>
  isISO2(iso) ?
    countriesWithRegionsISO2.includes(iso?.toUpperCase() as ISO2) :
    countriesWithRegionsISO3.includes(iso?.toUpperCase() as ISO3);

export const getCountryAdministrativeUnits = (iso?: ISO): CountryAdministrativeUnits => ({
  states: countryHasStates(iso),
  provinces: countryHasProvinces(iso),
  regions: countryHasRegions(iso),
});
