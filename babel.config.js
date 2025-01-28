require.extensions['.css'] = () => undefined;

module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: ['@babel/plugin-transform-runtime', 'lodash'],
};
