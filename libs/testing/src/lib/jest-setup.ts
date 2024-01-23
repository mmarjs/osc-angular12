export function jestSetup() {
  Error.stackTraceLimit = 2;

  Object.defineProperty(window, 'CSS', { value: null });
  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      getPropertyValue: () => '',
    }),
  });

  Object.defineProperty(document.body.style, 'transform', {
    value: () => ({ enumerable: true, configurable: true }),
  });
  // mock match media
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
    }),
  });

  const webStorageMock = () => {
    let storage = {};

    return {
      getItem: (key) => (key in storage ? storage[key] : undefined),
      setItem: (key, value) => (storage[key] = value || ''),
      removeItem: (key) => delete storage[key],
      clear: () => (storage = {}),
    };
  };

  Object.defineProperty(window, 'localStorage', { value: webStorageMock() });

  Object.defineProperty(window, 'sessionStorage', { value: webStorageMock() });

  Object.defineProperty(document, 'doctype', {
    value: '<!DOCTYPE html>',
  });

  /**
   * ISSUE: https://github.com/angular/material2/issues/7101
   * Workaround for JSDOM missing transform property
   */
  Object.defineProperty(document.body.style, 'transform', {
    value: () => {
      return {
        enumerable: true,
        configurable: true,
      };
    },
  });

  Object.defineProperty(window, 'DragEvent', { value: class DragEvent {} });
}

jestSetup();
