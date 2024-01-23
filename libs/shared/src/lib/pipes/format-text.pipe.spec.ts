import { FormatTextPipe } from './format-text.pipe';

describe('FormatTextPipe', () => {
  let pipe: FormatTextPipe;

  it('create an instance', () => {
    pipe = new FormatTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('formats a undescored text', () => {
    const result = pipe.transform('STRING_FORMATTED');
    expect(result).toBe('STRING FORMATTED');
  });
});
