const path = require('path');
const { override, addWebpackPlugin } = require('customize-cra');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = (config, ...args) => {
  const wasmExtensionRegExp = /\.wasm$/;
  /*
    config.resolve.alias = {
    ...config.resolve.alias,
    fs: path.resolve(__dirname, '.storybook', 'fsMock.js'),
  };
  */
  config.resolve.fallback = {
    path: false,
    fs: false,
  };
  config.ignoreWarnings = [];

  config.resolve.extensions.push('.wasm');

  config.module.rules.forEach((rule) => {
    (rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
        // make file-loader ignore WASM files
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });

  // add a dedicated loader for WASM
  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, 'src'),
    use: [{ loader: require.resolve('wasm-loader'), options: {} }],
  });

  config.module.rules.push({
    test: /\.(wasm)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  });
  // remove GenerateSW plugin
  config.plugins.pop();
  const overridenConf = override(
    addWebpackPlugin(
      new InjectManifest({
        swSrc: './src/sw-template.js',
        swDest: './service-worker.js',
      }),
    ),
  )(config, ...args);

  return overridenConf;
};
