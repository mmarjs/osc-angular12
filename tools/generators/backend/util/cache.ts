import { Dictionary } from './interfaces';

// control vars
export const modNames: { [modname: string]: string } = {};
// export const apiNames: Array<string> = [];

// parsing
export const typesMap: Dictionary<string> = {};
export const coreTypes = [
  'any',
  'boolean',
  'null',
  'number',
  'string',
  'void',
  'Array'
];
// TODO parse this in a Rule
export const sharedTypes = ['MappedResponse', 'PagedResponse', 'Pageable'];

// importing
export const entList: Array<string> = [];
export const entUsed: Array<string> = [];
