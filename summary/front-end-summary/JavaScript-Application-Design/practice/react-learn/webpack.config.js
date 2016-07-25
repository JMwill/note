var path = require('path');

module.exports = {
    entry: './app/entry.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?presetsp[]=es2015&presets[]=react'}
        ]
    }
};
