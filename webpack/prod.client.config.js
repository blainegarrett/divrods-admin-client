require('babel-polyfill');

// Webpack config for creating the production bundle.
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var combineLoaders = require('webpack-combine-loaders');
var path = require('path');
var webpack = require('webpack');
var projectRootPath = path.resolve(__dirname, '..');


module.exports = {
  target: 'web',
  context: projectRootPath,
  cache: false,
  devtool: 'source-map',
  entry: [ path.resolve(projectRootPath, './src/client/index.js')],
  output: {
    path: path.resolve(projectRootPath, './static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production')}}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
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
      //{
      //  test: /\.css$/,
      //  //include: [helpers.root('src', 'app')],
      //  use: [
      //    { loader: 'raw-loader' },
      //    { loader: 'postcss-loader' }
      //  ]
      //},
      {
        test: /\.scss$/,
        //exclude: [helpers.root('src', 'app')],
        //include: [/node_modules/, '../src'],
        use: ExtractTextPlugin
          .extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', query: { localIdentName: 'xxx[hash:base64]-[name]-[local]', modules: true, sourceMaps: true } },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader', query: { sourceMaps: true } }
            ]
          })
      },
      //{
      //  test: /\.scss$/,
      //  include: [/node_modules/],
      //  use: [
      //    //{ loader: 'raw-loader' },
      //    { loader: 'sass-loader', query: { sourceMaps: true } },
      //    { loader: 'postcss-loader' }
      //  ]
      //}

      //{
      //  test: /(\.scss|\.css)$/,
      //  loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]&importLoaders=2&sourceMap!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      //},
    ],
  },
  //sassLoader: {
  //  data: '@import "' + path.resolve(__dirname, '../src/theme/_globals.scss') + '";'
  //},
  resolve: {
    //modulesDirectories: [
    //  'src',
    //  'node_modules'
    //],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx']
  }
}