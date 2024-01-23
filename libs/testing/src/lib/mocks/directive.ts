import { Directive, EventEmitter, OnInit, Type } from '@angular/core';
import { isFunction } from 'util';

interface Options {
  onInit?: () => void;
}

/**
 * Examples:
 * TestDirective({selector: '[some-directive]'});
 * TestDirective({selector: '[some-directive]', inputs: ['some-input', 'some-other-input']});
 */
export function TestDirective(
  selector: string,
  options: Directive & Options = {}
): Type<Directive> {
  const metadata: Directive = {
    selector,
    inputs: options.inputs || [],
    outputs: options.outputs || [],
    providers: options.providers || [],
    exportAs: options.exportAs || ''
  };

  @Directive()
class Mock implements OnInit {
    constructor() {
      metadata.outputs.forEach(method => {
        this[method] = new EventEmitter<any>();
      });
    }

    ngOnInit() {
      if (isFunction(options.onInit)) {
        options.onInit.bind(this)();
      }
    }
  }

  return Directive(metadata)(Mock as any);
}
