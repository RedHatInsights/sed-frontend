const { resolve } = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
  appUrl: '/insights/connector',
  useProxy: process.env.PROXY === 'true',
  proxyVerbose: true,
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: process.env.NODE_ENV === 'development',
    }),
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
