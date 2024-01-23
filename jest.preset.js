const nxPreset = require('@nrwl/jest/preset');
const { projects, ...defaultConfig } = require('./jest.config');

module.exports = {
  ...nxPreset,
  ...defaultConfig,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'mjs', 'html'],
  coverageReporters: ['html', 'lcov'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  moduleNameMapper: {
    "^lodash-es$": "lodash"
  }
};
