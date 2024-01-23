import { paramToNumber } from './parse';

describe('parse', () => {
  it('should parse a string to number', () => {
    expect(paramToNumber('1')).toBe(1);
  });

  it('should parse a string to number', () => {
    expect(paramToNumber('-123')).toBe(-123);
  });

  it('should return null if the string is not a number', () => {
    expect(paramToNumber('foo')).toBeNull();
  });

  it('should not parse boolean', () => {
    expect(paramToNumber(true)).toBeNull();
  });

  it('should not parse object', () => {
    expect(paramToNumber({})).toBeNull();
  });

  it('should always parse in dec base', () => {
    expect(paramToNumber('0123')).toBe(123);
  });
});
