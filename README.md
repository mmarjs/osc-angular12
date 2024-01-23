# Ocean Service Center

[![CircleCI](https://circleci.com/bb/oceanservercenter/nxclient/tree/qa.svg?style=svg)](https://circleci.com/bb/oceanservercenter/nxclient/tree/qa)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

## Links

- [Production](https://www.oceanservicecenter.com)
- [QA server](https://ui.qa.oceanservicecenter.com)
- [Swagger](https://api.qa.oceanservicecenter.com/swagger-ui/index.html)
- [Figma](https://www.figma.com/file/zPWP1WC06FlAFnqQb7R5oL/OSC)

## Client

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`.  
The app will automatically reload if you change any of the source files.

## Build

Run `yarn build --prod` to build the project.  
The build artifacts will be stored in the `dist/` directory.  
Use the `--prod` flag for a production build.

## Running unit tests

Run `yarn affected:test` to execute the unit tests with Jest.

## Running end-to-end tests

Run `yarn e2e` to execute the end-to-end tests with Cypress.

## Environments

This app is deployed as a service to:

| Environment | |
| ----- | |
| QA | http://client.qa.oceanservicecenter.internal/ |
| STAGE | http://client.stage.oceanservicecenter.com/ |

## Stripe Account Creation

- **SSN** - 0000 (USA only)
- **TaxId** - 00000000
- **dob** - 1901-01-01
- See more info at https://stripe.com/docs/connect/testing
