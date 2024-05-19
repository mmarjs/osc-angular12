import { progressIndicatorReducer } from './reducer';
import { setProgressIndicatorLoadingStatus } from './actions';

describe('Progress Indicator Reducer', () => {
  const reducer = progressIndicatorReducer({
    status: undefined
  }, setProgressIndicatorLoadingStatus({
    status: true
  }));

  it('should set status', () => {
    expect(reducer).toHaveProperty('status', true);
  });
});
