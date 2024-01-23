import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import 'jest-preset-angular/setup-jest';
import '@ocean/testing/jest-setup';

beforeAll(() => {
  userEvent.setup();
});


afterEach(() => {
  jest.clearAllMocks();
});
