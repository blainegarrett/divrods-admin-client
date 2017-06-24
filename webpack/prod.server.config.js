require('babel-polyfill');

// Webpack config for creating the production bundle.
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var combineLoaders = require('webpack-combine-loaders');
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var projectRootPath = path.resolve(__dirname, '..');

var nodeModules = {};

fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        if (mod != 'react-flexbox-grid' && mod != 'flexboxgrid') {
          nodeModules[mod] = 'commonjs ' + mod;
        }
    });

module.exports = {
  target: 'node',
  context: projectRootPath,
  cache: false,
  devtool: 'source-map',
  entry: [ path.resolve(projectRootPath, './src/server/server.js')],
  output: {
    path: path.resolve(projectRootPath, './build/server'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },

      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production')}}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin('styles.css')
  ],
  module: {

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['transform-decorators-legacy']
          }
        }
      },

      {
        test: /\.css$/,
        //include: [/node_modules/, '../src'],
        use: ExtractTextPlugin
          .extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  localIdentName: 'yyy[hash:base64]-[name]-[local]',
                  modules: true,
                  sourceMaps: true
                }
              },
              { loader: 'postcss-loader'  }
            ]
          })
      },
      {
        test: /\.scss$/,
        //exclude: [helpers.root('src', 'app')],
        //include: ['node_modules', '../src'],
        use: ExtractTextPlugin
          .extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { localIdentName: 'xxx[hash:base64]-[name]-[local]', modules: true, sourceMaps: true } },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader', options: { sourceMaps: true } }
            ]
          })
      },
    ],
  },
  externals: nodeModules,
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx']
  },
  node: {
        __dirname: true,
        fs: 'empty'
    }
}

