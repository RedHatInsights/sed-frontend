const { resolve } = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = {
  appUrl: '/insights/connector',
  useProxy: process.env.PROXY === 'true',
  proxyVerbose: true,
  devtool: 'hidden-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: process.env.NODE_ENV === 'development',
    }),
    // Put the Sentry Webpack plugin after all other plugins
    ...(process.env.ENABLE_SENTRY
      ? [
          sentryWebpackPlugin({
            ...(process.env.SENTRY_AUTH_TOKEN && {
              authToken: process.env.SENTRY_AUTH_TOKEN,
            }),
            org: 'red-hat-it',
            project: 'sed-frontend-rhc',
            moduleMetadata: ({ release }) => ({
              dsn: `https://08c275222a74229dda763dec7c7c2fa8@o490301.ingest.us.sentry.io/4508683268128768`,
              org: 'red-hat-it',
              project: 'sed-frontend-rhc',
              release,
            }),
          }),
        ]
      : []),
  ],
  hotReload: process.env.HOT === 'true',
  ...(process.env.port ? { port: parseInt(process.env.port) } : {}),
  moduleFederation: {
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          version: packageJson.dependencies['react-router-dom'],
          requiredVersion: '>=6.0.0 <7.0.0',
        },
      },
    ],
    exposes: {
      './RootApp': resolve(__dirname, './src/AppEntry'),
    },
  },
};
