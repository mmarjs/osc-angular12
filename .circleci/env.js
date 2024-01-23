#!/usr/bin/env node

switch (process.env.CIRCLE_BRANCH) {
  case 'master':
    process.env.NG_ENV = 'production';
    break;

  case 'staging':
    process.env.NG_ENV = 'staging';
    break;

  case 'qa':
    process.env.NG_ENV = 'qa';
    break;

  default:
    process.env.NG_ENV = 'development';
    break;
}

console.log(`export NG_ENV="${process.env.NG_ENV}"`);
