const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader' //webpack与babel通讯的桥梁，并不会翻译es6
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            //占位符 placeholders
            name: '[name]_[hash].[ext]', //图片文件名不变
            outputPath: 'images/',
            limit: 20480
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            //占位符 placeholders
            name: '[name].[ext]', //图片文件名不变
            outputPath: 'font/'
          }
        }
      }
    ]
  },
  performance:false, //打包文件过大，不提示警告
  output: {
    publicPath: '/', //公共路径
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    runtimeChunk:{
      name:'runtime'
    },  //webpack4以下的版本 ， 需要配置这个，防止代码没改，版本号依然会改变. 业务逻辑与库文件有关联 mainfest 嵌套在各个文件中，每次打包这个可能会变化，这样就导致每次打包会变化。 不过新版w4不需要这个配置
    usedExports: true, //tree shaking
    splitChunks: {
      chunks: 'all', //代码分隔 all 同异步分割  async异步分割 iniial同步分割
      minSize: 30000,//分割的最小文件尺寸
      maxSize: 0,
      minChunks: 1, //打包生成的模块，至少1个用到过才打包分割处理
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
          //filename:'vendors.js' //从node_modules中引入的代码,打包到这个文件中
        },
        default: false
      }
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
};
