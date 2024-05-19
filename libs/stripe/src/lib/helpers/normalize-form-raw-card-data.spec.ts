import { normalizeFormRawCardData } from './normalize-form-raw-card-data';

describe('normalizeFormRawCardData', () => {
  let value;

  beforeEach(() => {
    value = {
      cardHolderName: 'Card Holder Name',
      number: '4544 7854 5412 3214',
      expireDate: '03/23',
      cvc: '777',
      currency: 'USD',
    } as any;
  });

  it.each([null, undefined])(`should return undefined (value: %s)`, (type) => {
    expect(normalizeFormRawCardData(type)).toEqual(undefined);
  });

  it('should return undefined', () => {
    value.number = null;
    expect(normalizeFormRawCardData(value)).toEqual(undefined);
  });

  it.each([undefined, null, '0323', '03/54/54'])(
    `should return undefined (value: %s)`,
    (type) => {
      value.expireDate = type;
      expect(normalizeFormRawCardData(value)).toEqual(undefined);
    }
  );

  it('should return normalized form', () => {
    expect(normalizeFormRawCardData(value)).toEqual({
      cardHolderName: 'Card Holder Name',
      number: '4544785454123214',
      expiryMonth: 3,
      expiryYear: 23,
      cvc: '777',
      currency: 'USD',
    });
  });
});
