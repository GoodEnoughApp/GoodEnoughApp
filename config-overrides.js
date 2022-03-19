module.exports = function override(config) {
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
  // config.target = 'web';
  return config;
};
