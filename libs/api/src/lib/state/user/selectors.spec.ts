import { userQuery } from './selectors';
import { PartialState } from './state.partial';

describe('User Selectors', () => {
  let storeState: PartialState;

  beforeEach(() => {
    storeState = {
      api: {
        user: {
          loggedIn: true
        }
      }
    };
  });

  describe('User Selectors', () => {
    it("getLoggedIn() should return the current 'loggedIn' state", () => {
      const result = userQuery.getLoggedIn(storeState);

      expect(result).toBe(true);
    });
  });
});
