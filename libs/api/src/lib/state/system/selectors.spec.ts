import { systemQuery } from './selectors';
import { PartialState } from './state.partial';

describe('System Selectors', () => {
  let storeState: PartialState;

  beforeEach(() => {
    storeState = {
      api: {
        system: {
          loaded: true
        }
      }
    };
  });

  describe('System Selectors', () => {
    it("getLoaded() should return the current 'loaded' status", () => {
      const result = systemQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });
  });
});
