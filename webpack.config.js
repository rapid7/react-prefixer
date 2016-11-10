'use strict';

const path = require('path');
const webpack = require('webpack');

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  cache: true,

  devtool: '#source-map',

  entry: path.join(__dirname, 'src', 'index.js'),

  eslint:{
    configFile: './.eslintrc',
    emitError: true,
    failOnError: true,
    failOnWarning: true,
    formatter: require('eslint-friendly-formatter')
  },

  module: {
    preLoaders: [
      {
        cacheable: true,
        include: [
          /src/
        ],
        loader: 'eslint',
        test: /\.js$/
      }
    ],

    loaders: [
      {
        cacheable: true,
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js?$/
      }
    ]
  },

  output: {
    filename: 'react-prefixer.js',
    library: 'react-prefixer',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new LodashModuleReplacementPlugin()
  ]
};
