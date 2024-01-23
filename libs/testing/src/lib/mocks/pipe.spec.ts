import { TestPipe } from './pipe';

describe('TestPipe', () => {
  // TODO set a test component

  it('should create an instance', () => {
    const Mock = TestPipe('test-pipe', (v: string) => v.toLowerCase());
    expect(Mock).toBeTruthy();
  });
});
