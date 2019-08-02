const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const proConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module:{
    rules:[
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //单独打包成css
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, //文件里面嵌套文件，依然走前前两个loader
              modules: true //开启css的模块化打包
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'[name].css',
      chunkFilename:'[id].css'
    })
  ],
  output:{
    filename: '[name].[contenthash].js', //入口文件占位名称
    chunkFilename: '[name].[contenthash].js', //间接文件占位名称
  }
};
module.exports = merge(commonConfig, proConfig);
