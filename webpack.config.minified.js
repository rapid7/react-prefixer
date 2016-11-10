const webpack = require('webpack');
const OptimizeJsPlugin = require('optimize-js-plugin');

const defaultConfig = require('./webpack.config');

module.exports = Object.assign({}, defaultConfig, {
  output: Object.assign({}, defaultConfig.output, {
    filename: 'react-prefixer.min.js'
  }),

  plugins: defaultConfig.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        booleans: true,
        conditionals: true,
        drop_console: true,
        drop_debugger: true,
        join_vars: true,
        sequences: true,
        warnings: false
      },
      sourceMap: false
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    })
  ])
});