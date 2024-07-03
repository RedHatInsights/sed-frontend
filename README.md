[![Build Status](https://app.travis-ci.com/RedHatInsights/sed-frontend.svg?branch=master)](https://app.travis-ci.com/RedHatInsights/sed-frontend) [![codecov](https://codecov.io/gh/RedHatInsights/sed-frontend/branch/master/graph/badge.svg?token=XC4AD7NQFW)](https://codecov.io/gh/RedHatInsights/sed-frontend)

# Red Hat Connector Dashboard

## First time setup

### Quick start
1. Make sure you have [`Node.js`](https://nodejs.org/en/) and [`npm`](https://www.npmjs.com/) installed
2. Run [script to patch your `/etc/hosts`](https://github.com/RedHatInsights/insights-proxy/blob/master/scripts/patch-etc-hosts.sh)
3. Make sure you are using [Red Hat proxy](http://hdn.corp.redhat.com/proxy.pac)

### Comprehensive documentation
There is a [comprehensive quick start guide in the Storybook Documentation](https://github.com/RedHatInsights/insights-frontend-storybook/blob/master/src/docs/welcome/quickStart/DOC.md) to setting up an Insights environment.

## Running locally
1. Install dependencies with `npm install`
2. Run development server with `npm run start:proxy`
3. Choose an environment of your choice
3. Local version of the app will be available at respective location and link will be provided in the terminal

### Testing

- `npm run verify` will run linters and tests
- Travis is used to test the build for this code.

## Deploying

- The Platform team is using Travis to deploy the application

### How it works

- any push to the `sed-frontend` `master` branch will deploy to a `sed-frontend-build` `ci-beta` and `qa-beta` branch
- any push to the `sed-frontend` `master-stable` branch will deploy to a `sed-frontend-build` `ci-stable` and `qa-stable` branch
- any push to the `sed-frontend` `prod-beta` branch will deploy to a `sed-frontend-build` `prod-beta` branch
- any push to the `sed-frontend` `prod-stable` branch will deploy to a `sed-frontend-build` `prod-stable` branch
- Pull requests (based on master) will not be pushed to `sed-frontend-build` `master` branch
  - If the PR is accepted and merged, master will be rebuilt and will deploy to `sed-frontend-build` `ci-beta` branch

## Patternfly

- This project imports Patternfly components:
  - [Patternfly React](https://github.com/patternfly/patternfly-react)

## Insights Components

Platform experience will deliver components and static assets through [npm](https://www.npmjs.com/package/@redhat-cloud-services/frontend-components). ESI tags are used to import the [chroming](https://github.com/RedHatInsights/insights-chrome) which takes care of the header, sidebar, and footer.

## Technologies

### Webpack

There is [shared common config](https://www.npmjs.com/package/@redhat-cloud-services/frontend-components-config) with predefined values and lifecycles to build and run your application.

We use [federated modules](https://webpack.js.org/concepts/module-federation/) to seamlessly load multiple application.
