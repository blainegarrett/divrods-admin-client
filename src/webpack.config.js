var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {

    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        options: {
           presets: [ 'react-hmre' ]
         }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader', options: { localIdentName: '[hash:base64:5]__[name]__[local]', modules: true, sourceMaps: true } // translates CSS into CommonJS
          }, {
            loader: 'sass-loader', options: { sourceMaps: true } // compiles Sass to CSS
          },
          'postcss-loader'
        ],
      }
    ]
  }
}
