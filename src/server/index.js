// This file acts as a shim for babel
// Required due to v8 bug: See: https://github.com/facebook/react/issues/6451
Object.assign = null;
Object.assign = require('object-assign');

if (process.env.NODE_ENV !== 'production') {
    var path = require('path');
    var sassCompiler = require('node-sass');
    //var generateScopedName = '[name]__[local]-[hash:base64:5]'; // This needs to match webpack config

    var hook = require('css-modules-require-hook');
    hook({
      generateScopedName: '[hash:base64:5]__[name]__[local]',
      mode: 'local',
      //rootDir: '../src/', // This changes the hash
      extensions: [ '.scss', '.css' ],
      preprocessCss: (css, filepath) => {
        //console.log('------------------------');
        //console.log(filepath);

        if (filepath.indexOf('.scss') > -1) {
          return sassCompiler.renderSync({
            data: css,
            file: filepath,
            includePaths: [
              path.resolve(__dirname, '../../node_modules'),
              path.resolve(__dirname, '../../src')
            ]
          }).css
        }

        return css;
      }
    });
    require('babel-register');
}
require('./server');