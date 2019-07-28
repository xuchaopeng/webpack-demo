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
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
};
