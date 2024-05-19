import { exitDetailsWithStatus } from './exit-details-with-status';
import { STRIPE_DETAILS_EXIT_TYPE } from '../shared/types';

describe('exitDetailsWithStatus', () => {
  it.each([undefined, 50, jest.fn(), false])(
    `should return undefined (value: %s)`,
    (value) => {
      expect(
        // @ts-ignore
        exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.MARK, value)
      ).toEqual(undefined);
    }
  );

  it('should be valid', () => {
    expect(
      exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.MARK, '2031-23654')
    ).toEqual({
      id: '2031-23654',
      status: STRIPE_DETAILS_EXIT_TYPE.MARK,
    });
  });
});
