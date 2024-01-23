import { TestDirective } from './directive';

describe('TestDirective', () => {
  it('should create an instance', () => {
    const Mock = TestDirective('test-directive', {
      inputs: ['input']
    });
    expect(Mock).toBeTruthy();
  });
});
