import { Component, EventEmitter, Type } from '@angular/core';

/**
 * Examples:
 * TestComponent({selector: 'some-component'});
 * TestComponent({selector: 'some-component', inputs: ['some-input', 'some-other-input']});
 */
export function TestComponent(
  selector: string,
  options: Component = {}
): Type<Component> {
  const metadata: Component = {
    selector,
    template: options.template || '',
    inputs: options.inputs || [],
    outputs: options.outputs || [],
    providers: options.providers || [],
    exportAs: options.exportAs || ''
  };

  class Mock {
    constructor() {
      metadata.outputs.forEach(method => {
        this[method] = new EventEmitter<any>();
      });
    }
  }

  return Component(metadata)(Mock as any);
}
