const PepePlugin = require('./pepe-plugin')
const webpackMerge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const externalAssets = [
  ['bootstrap/dist/css/bootstrap.min.css', 'dist/css/bootstrap.min.css'],
  ['bootstrap/dist/fonts', 'dist/fonts'],
  ['pace-js/pace.min.js', 'dist/pace.min.js'],
  ['pace-js/themes/blue/pace-theme-flash.css', 'dist/css/pace.css'],
]
const mapExternalAssets = p =>
  ({from: path.join(__dirname, 'node_modules/', p[0]), to: path.join(__dirname, p[1])})
const copyPlugin = new CopyWebpackPlugin(externalAssets.map(mapExternalAssets))

module.exports = env => webpackMerge({
  mode: env,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [
    new PepePlugin(),
    copyPlugin,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
}, require(`./webpack.config.${env}.js`))

