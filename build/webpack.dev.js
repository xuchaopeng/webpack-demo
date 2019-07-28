const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //错误映射 inline-source-map，会将map文件加入到打包文件中
  devServer: {
    contentBase: './dist', //指定根目录
    open: true, //自动打开浏览器，访问地址
    port: 8080,
    hot: true
  },
  optimization: {
    usedExports: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
module.exports = merge(commonConfig, devConfig);
