import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';

export function isValidPostcode(postcode: string, country: string): boolean {
  try {
    return postcodeValidator(postcode, country);
  } catch (error) {
    return false;
  }
}

export function postcodeExist(country: string): boolean {
  return postcodeValidatorExistsForCountry(country);
}
