const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');

const insightsProxy = {
  https: false,
  ...(process.env.BETA && { deployment: 'beta/apps' }),
};

const webpackProxy = {
  deployment: process.env.BETA ? 'beta/apps' : 'apps',
  useProxy: true,
  // localChrome: '/Users/rkaluzik/rh/insights-chrome/build/',
  appUrl: process.env.BETA
    ? ['/beta/settings/connector']
    : ['/settings/connector'],
  // routes: {
  //   '/beta/config': {
  //     host: 'http://localhost:8889',
  //   },
  // },
};

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  https: true,
  useFileHash: false,
  ...(process.env.PROXY ? webpackProxy : insightsProxy),
});

plugins.push(
  require('@redhat-cloud-services/frontend-components-config/federated-modules')(
    {
      root: resolve(__dirname, '../'),
      useFileHash: false,
    }
  )
);

plugins.push(
  new (require('webpack').DefinePlugin)({
    IS_DEV: true,
  })
);

module.exports = {
  ...webpackConfig,
  plugins,
};
