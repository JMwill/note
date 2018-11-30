const path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.(png|jpg|svg|gif)$/,
      use: {
        loader: 'url-loader'
      }
    }, {
      test: /\.(css|scss)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  }
}
