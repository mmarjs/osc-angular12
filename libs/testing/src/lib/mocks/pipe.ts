import { Pipe, PipeTransform } from '@angular/core';

/**
 * Examples:
 * TestPipe('some-pipe');
 * TestPipe('some-pipe', () => 'foo');
 */
export function TestPipe(name: string, transform?: any): Pipe {
  class Mock implements PipeTransform {
    transform = transform || (() => undefined);
  }

  return Pipe({ name })(Mock as any);
}
