const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "../build/css/bundle.css"
});

const PROD = JSON.parse(process.env.PROD_ENV || 'false');

module.exports = {
  context: __dirname,
  entry: ["babel-polyfill", "./src/entry.jsx"],
  output: {
    path: path.resolve('./build/js'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve('/node_modules'),
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    alias:{
      '~': path.resolve('./src')
    },
    extensions: [".js", ".jsx"]
  },
  plugins: PROD ? [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin("../css/bundle.css"),
  ] : [
    new ExtractTextPlugin("../css/bundle.css"),
  ]
};
