import { boatsQuery } from './selectors';
import { PartialState } from './state.partial';

describe('Boats Selectors', () => {
  let storeState: PartialState;

  beforeEach(() => {
    storeState = {
      boats: {
        total: 3
      }
    };
  });

  describe('Boats Selectors', () => {
    it("getTotal() should return the current 'total'", () => {
      const result = boatsQuery.getTotal(storeState);

      expect(result).toBe(3);
    });
  });
});
