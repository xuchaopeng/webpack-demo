const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //错误映射 inline-source-map，会将map文件加入到打包文件中
  devServer: {
    contentBase: './dist', //指定根目录
    open: true, //自动打开浏览器，访问地址
    port: 8090,
    hot: true,
    host:'xcp.com'
  },
  module:{
    rules:[
      {
        test: /\.scss$/,
        use: [
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
        use: ['css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
module.exports = merge(commonConfig, devConfig);
