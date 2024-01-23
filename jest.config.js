const { getJestProjects } = require('@nrwl/jest');

/** @type {import('jest').Config} */
module.exports = {
  maxWorkers: '50%',
  slowTestThreshold: 2,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  projects: getJestProjects(),
};
