const path = require('path');
const webpack = require('webpack');

const appDir = path.resolve(__dirname, '../src');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    `${appDir}/client.js`
  ],

  output: {
    path: appDir,
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({'process.env': {
      NODE_ENV: JSON.stringify('development'),
      WEBPACK: true }
    })
  ],

  resolve: {
    root: appDir,
    modulesDirectories: [ 'node_modules' ],
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: appDir
        // query: { presets: [ 'react-hmre' ] }
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!sass?sourceMap&sourceComments',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap!sass?sourceMap&sourceComments'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?name=[path][name].[ext]'
      },
      {
        test: /\.svg/,
        loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
      },
      {
        test: /\.(woff|woff2|ttf|eot)/,
        loader: 'url-loader?limit=1'
      }
    ]
  }
};
