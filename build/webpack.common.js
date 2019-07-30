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
        test: /\.scss$/,
        use: [
          'style-loader',
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
        use: ['style-loader', 'css-loader', 'postcss-loader']
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
  output: {
    publicPath: '/', //公共路径
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all', //代码分隔 all 同异步分割  async异步分割 iniial同步分割
      minSize: 30000,//分割的最小文件尺寸
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename:'vendors.js' //从node_modules中引入的代码,打包到这个文件中
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
