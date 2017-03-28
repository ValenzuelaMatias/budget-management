const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  loader: ['css-loader', 'sass-loader'],
  publicPath: '/dist'
})

let cssConfig = isProd ? cssProd : cssDev;

// Plugins
const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  disable: !isProd,
  allChunks: true
});

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Focus Gestor de Orçamentos',
  template: './src/index.ejs'
});

const inlineManifest = new InlineManifestWebpackPlugin({
  name: 'webpackManifest'
});

const commonChunks = new webpack.optimize.CommonsChunkPlugin({
  names: ['vendor'],
  minChunks: Infinity
});

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true
});

const loaderOptions = new webpack.LoaderOptionsPlugin({
  minimize: true
});

const provider = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
});

module.exports = {
  entry: {
    main: './main.js',
    vendor: ['jquery']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only',
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.css$/
        // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader?name=images/[hash].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ],
  },
  plugins: [
    extractSass,
    commonChunks,
    htmlWebpackPlugin,
    inlineManifest,
    uglifyJs,
    loaderOptions,
    provider
  ]
}
