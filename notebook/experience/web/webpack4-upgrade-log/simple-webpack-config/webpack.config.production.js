const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // devtool: 'source-map',
  output: {
    chunkFilename: '[name].[chunkhash:8].js',
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [{
      test: /\.(png|jpg|svg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:8].[ext]'
        }
      }
    }, {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        fallback: 'style-loader'
      }),
    }]
  },
  plugins: [new ExtractTextPlugin({
    filename: '[name].[chunkhash:8].css'
  })]
}
