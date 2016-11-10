'use strict';

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const defaultConfig = require('./webpack.config');

const currentLoaders = defaultConfig.module.loaders;
const babelLoaderIndex = currentLoaders.findIndex(({loader}) => {
  return loader === 'babel';
});

const loaders = [
  ...currentLoaders.slice(0, babelLoaderIndex),
  Object.assign({}, currentLoaders[babelLoaderIndex], {
    query: {
      presets: [
        'react'
      ]
    }
  }),
  ...currentLoaders.slice(babelLoaderIndex + 1)
];

module.exports = Object.assign({}, defaultConfig, {
  cache: true,

  devServer: {
    contentBase: './dist',
    inline: true,
    port: 3000,
    stats: {
      assets: false,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: true,
      version: false
    }
  },

  entry: path.join(__dirname, 'DEV_ONLY', 'App.js'),

  eslint: Object.assign({}, defaultConfig.eslint, {
    failOnWarning: false
  }),

  module: Object.assign({}, defaultConfig.module, {
    loaders
  }),

  plugins: defaultConfig.plugins.concat([
    new HtmlWebpackPlugin(),
    new DashboardPlugin()
  ])
});