[![Build Status](https://img.shields.io/github/actions/workflow/status/RedhatInsights/sed-frontend/test.yml?branch=master)](https://github.com/RedHatInsights/sed-frontend/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/RedHatInsights/sed-frontend/branch/master/graph/badge.svg?token=XC4AD7NQFW)](https://codecov.io/gh/RedHatInsights/sed-frontend)

# Remote Host Configuration Manager

## First time setup
1. Make sure you have [`Node.js`](https://nodejs.org/en/) version >= 18 installed
2. Run [script to patch your `/etc/hosts`](https://github.com/RedHatInsights/insights-proxy/blob/master/scripts/patch-etc-hosts.sh)
3. Make sure you are using [Red Hat proxy](http://hdn.corp.redhat.com/proxy.pac)

## Running locally
1. Make sure you are connected to the Red Hat VPN
2. Install dependencies with `npm install`
3. Run development server with `npm run start:proxy` and select desired environment (`stage` is recommended)
4. Local version of the app will be available at URL printed out to the console (https://stage.foo.redhat.com:1337/insights/connector/ if you selected `stage`)

### Testing
- ```npm run test``` - run all Jest tests
- ```npm run lint``` - run linter
- Travis is used to test the build for this code.

## Deploying
The app uses containerized builds which are configured in [`app-interface`](https://gitlab.cee.redhat.com/service/app-interface/-/blob/master/data/services/insights/config-manager/deploy.yml).

| Environment | Available at                     | Deployed version
| :---------- | :--------------------------------| :----------
| stage       | https://console.stage.redhat.com | master branch
| production  | https://console.redhat.com       | up to the commit configured in `app-interface`

## Design System
This project uses [Patternfly React](https://github.com/patternfly/patternfly-react).

## Insights Components
This app imports components from [Insights Front-end Components library](https://github.com/RedHatInsights/frontend-components). ESI tags are used to import [Insights Chrome](https://github.com/RedHatInsights/insights-chrome) which takes care of the header, sidebar, and footer. These libraries are described in the [Platform experience documentation](http://front-end-docs-insights.apps.ocp4.prod.psi.redhat.com/).
