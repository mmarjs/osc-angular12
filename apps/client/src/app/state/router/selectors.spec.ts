import { routerQuery } from './selectors';
import { PartialState } from './state.partial';

describe('Router Selectors', () => {
  let storeState: PartialState;

  beforeEach(() => {
    storeState = {
      router: {
        navigationId: 1,
        state: {
          route: '/dashboard',
          url: '/dashboard',
          queryParams: {},
          params: {}
        }
      }
    };
  });

  describe('Router Selectors', () => {
    it("getUrl() should return the current 'url'", () => {
      const result = routerQuery.getUrl(storeState);

      expect(result).toBe('/dashboard');
    });
  });
});
