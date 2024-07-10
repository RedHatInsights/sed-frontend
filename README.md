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
2. Run development server with `npm run start`
3. Local version of the app will be available at https://stage.foo.redhat.com:1337/preview/insights/connector/

### Testing

- `npm run verify` will run linters and tests
- Travis is used to test this code.


## Deploying

The app uses containerized builds which are configured in [`app-interface`](https://gitlab.cee.redhat.com/service/app-interface/-/blob/master/data/services/insights/config-manager/deploy.yml).

| Environment        | Available at                             | Deployed version
| :----------------- | :--------------------------------------- | :----------
| stage preview      | https://console.stage.redhat.com/preview | master branch
| stage stable       | https://console.stage.redhat.com         | master branch
| production preview | https://console.redhat.com/preview       | up to the commit configured in `app-interface`
| production stable  | https://console.redhat.com               | up to the commit configured in `app-interface`

## Patternfly

- This project imports Patternfly components:
  - [Patternfly React](https://github.com/patternfly/patternfly-react)

## Insights Components

Platform experience will deliver components and static assets through [npm](https://www.npmjs.com/package/@redhat-cloud-services/frontend-components). ESI tags are used to import the [chroming](https://github.com/RedHatInsights/insights-chrome) which takes care of the header, sidebar, and footer.

## Technologies

We use [federated modules](https://webpack.js.org/concepts/module-federation/) to seamlessly load multiple application.
