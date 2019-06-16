const path = require('path');

module.exports = function(api) {
  if (api) api.cache(true);

  const resolver = {
    cwd: 'babelrc',
    root: [path.resolve(__dirname, 'app')],
    alias: {
      app: path.resolve(__dirname, 'app'),
      assets: path.resolve(__dirname, 'assets'),
      atoms: path.resolve(__dirname, 'app/components/atoms'),
      molucules: path.resolve(__dirname, 'app/components/molucules'),
      containers: path.resolve(__dirname, 'app/containers'),
      core: path.resolve(__dirname, 'app/core'),
    }
  };

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', resolver]
    ],
  };
};
