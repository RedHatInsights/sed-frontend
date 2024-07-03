const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  appUrl: '/insights/connector',
  debug: true,
  useProxy: process.env.PROXY === 'true',
  proxyVerbose: true,
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: process.env.NODE_ENV === 'development',
    }),
  ],
  ...(process.env.HOT
    ? { hotReload: process.env.HOT === 'true' }
    : { hotReload: true }),
  ...(process.env.port ? { port: parseInt(process.env.port) } : {}),
  moduleFederation: {
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          version: '^6.8.1',
          requiredVersion: '>=6.0.0 <7.0.0',
        },
      },
    ],
    exposes: {
      './RootApp': resolve(__dirname, './src/AppEntry'),
    },
  },
};
