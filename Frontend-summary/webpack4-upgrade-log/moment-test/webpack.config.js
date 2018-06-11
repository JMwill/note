const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  plugins: [
    new ExtractTextPlugin({
      filename: './[name].css',
    }),
  ],
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
        ],
        fallback: 'style-loader',
      }),
    }],
  },
}
