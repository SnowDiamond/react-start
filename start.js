require('babel-core/register');
require('babel-polyfill');
const extensions = ['.css', '.scss', '.less', '.sass', '.ttf', '.woff', '.woff2', '.jpg', '.png'];

extensions.forEach((ext) => require.extensions[ext] = () => {});
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack/development');
const path = require('path');
const express = require('express');
const server = require('./src/server.js').default;

const app = express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, 'src')));
} else if (process.env.NODE_ENV  === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
}

app.get('*', server);

app.listen(3001, '0.0.0.0', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('Listening at http://localhost:3001');
  }
});
