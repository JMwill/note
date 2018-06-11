const ExtractTextPlugin = require('mini-css-extract-plugin')
module.exports = {
  plugins: [
    new ExtractTextPlugin({
      filename: './[name].css',
    }),
  ],
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: [
        ExtractTextPlugin.loader,
        'css-loader',
      ],
    }],
  },
}
