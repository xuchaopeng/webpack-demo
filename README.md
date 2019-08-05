## webpack

- 1. webpack一个模块化打包工具
- 2. wepack内置默认支持commonjs esModule AMD CMD
- 3. loader打包方
  loader执行顺序从下到上，从右到左的顺序。
  file-loader 打包文件 改名称 返回相对dist下的地址名称 大尺寸
  url-loader  将图片文件打包到js中 小尺寸 ,相对file-loader，多一个limit参数
  css-loader  打包css内容
  style-loader将得到的css内容挂载style标签到页面
  sass-loader
  postcss-loader 使用postcss.config.js,引用了autoprefixer插件，必须设置支持的浏览器才会自动添加添加浏览器兼容。

- 4. plugins
  plugin 可以在webpack运行到某个时刻做一些事情.
  html-webpack-plugin 打包后运行的，生成html文件,并打包后的结果文件注入到html中（也可根据配置模板来生成）
  clean-webpack-plugin 是在打包前运行的，删除配置目录下的文件, 已更新写法

- 5. output
  publicPath:''
  占位符 => 多出口

- 6. entry
  多入口

- 7. sourceMap 它是一个映射关系，能知道dist目录下某文件某行对应src目录下的某文件某行。 能检查源代码错误位置
  devtool: cheap-source-map eval 只管业务代码
           cheap-module-source-map 业务代码+第三方库的错误
  7.1 一般mode:production环境，不需要devtoll，要么devtool:'cheap-module-source-map'
  7.2 一般mode:development环境，一般devtool:cheap-module-eval-source-map，打包速度快，能定位问题
  7.3 打包原理

- 8. webpack-dev-server
  webpack --watch 监听文件改动打包,不好用
  proxy: {
      '/api': 'http://localhost:3000' //支持地址跨域代理
  },
  open:true,
  port:8080,
  contentBase: path.join(__dirname, 'public'),
  host:'127.0.0.1',
  public: 'myapp.test:80',
  hot:true, //热更新，改动的文件才刷新  结合webpack.HotModuleReplacementPlugin插件使用
  hotOnly:true  //即使hml出异常，也不刷新页面，配合hot使用

- 9. webpack-dev-middleware
  nodejs使用webpack 官网

- 10. babel
  babel-loader webpack通过babel-loader与babel建立桥梁，并不会翻译es6 => es5
  @babel/core 它是babel的核心库 抽象语法树，转化成新的语法
  @babel/preset-env

  @babel/polyfill 低版本浏览器，缺失的对象。如：promise的实现，map方法的实现，加入到打包文件中。import '@babel/proyfill'；全局注入的方式，如果是组件库的时候，需注意。

  组件库代码: 会以闭包的形式注入
  optinos: {
    "plugins" : [["@babel/plugin-transform-runtime",{
      "corejs":2,
      "helpers":true,
      "regenerator":true,
      "useESModules":true
    }]]
  }

  cnpm i -D react react-dom
  cnpm i -D @babel/preset-react
  @babel/preset-react 打包react代码

- 11. tree shaking
  注意，只支持静态模式的引入，不支持动态模式引入
  支持es6, 不支持commonjs
  package.json => {
    sideEffects:['*css'] //忽略掉css,其他模块tree shaking
    sideEffects:false //
  }
  webpack.config.js => {
    optimization: {
      usedExports: true
    }
  }

- 12. code splitting 其本身与wenpack无关
  //webpack中实现代码分割，两种方式同步分割 异步分割
  1. 同步代码，只需webpack.common.js中做optimization配置即可
  optimization: {
    splitChunks: {
      chunks: 'all' //代码分隔 code splitting  webpack默认只对异步代码分割 async
    }
  }
  2. 异步代码(import) ：无需做任何配置，会自动进行代码分割，放置带新的文件中；
     实现import异步，安装babel-plugin-dynamic-import-webpack，并借助babel配置plugins：["dynamic-import-webpack"]

  3. 文件利用率越高，网站性能越高  所以webpack默认异步打包分割
      如果网站能充分利用空闲时间，去做异步代码的加载，这样性能有质的提升
      import(/* webpackPrefetch: true */'./click.js').then() webpackPrefet: 会等待核心文件加载之后，空闲再去加载
      webpackLoad: 会和主文件一起去加载的
    一般最优webpackPrefet  注意，某些浏览器兼容问题
  4、多页面 通过使用import异步加载模块实现 懒加载lazyloading

    **SplitChunksPlugin在vendors下加入filename报错

- 13. webpack打包分析
  https://github.com/webpack/analyse
  webpack --profile --json > stats.json 生成的json文件，在翻墙环境下,访问（http://webpack.github.io/analyse/），里面有关这次打包的依赖关系。
  有关webpack的其它分析工具，像Bundle Analysis等.

- 14. mini-css-extract-plugin css打包
  抽出css成  单个文件, 分入口打包

- 15. shimmimg
   new webpack.ProvidePlugin({
    $ : 'jquery'   //webpack提供的垫片, 全局的变量
    _join:['loadsh','join']
  })

  可以去官网的guides
- 16. 全局变量
  webpack --env.production --config ./build/webpack.common.js
  env.production = true
  webpack --env production --config ./build/webpack.common.js

- 17. 开发库
   webpack.config.js =>
   output: {
     path:path.resolve(__dirname,'dist'),
     filename:'library.js',
     library: 'root',    //全局script标签引入
     libraryTarget:'umd' //支持esModule require 等方式  global this window
   }
   externals: 'lodash' //库文件打包过程，忽略lodash的打包，可以通过引入的业务代码来引入
   17-2
   上传npm
   package.json => {
     "name": "library-xcp-2019" , //名字不能相同
     "main" : "./dist/library.js" //定义入口文件
   }
   npm官网注册登录
   npm adduser   //添加用户名 密码
   npm publish   //发布到npm上  ==== over
   使用  npm install library-xcp-2019 --save 使用这个库文件了

- 18. PWA
  服务器崩掉，浏览器缓存支持访问
  18-1. 在webpack.pro.js =>
    cosnt WorkboxPlugin = require("workbox-webpack-plugin");

    {
      plugins: [
        new WorkboxPlugin.GenerateSw({
          clientsClaim : true,
          skipWaiting : true
        })
      ]
    }
  18-2. 在业务代码运用 serviceWork
    if ('serviceWorker' in navigator) {
       window.addEventListener('load', () => {
         navigator.serviceWork.register('/service-worker.js')
            .then(registration => {
              console.log('service-worker registed')
            }).catch(error => {
               console.log('service-worker registed error')
            })
       })
    }

  18.3 PWA 真正使用到，这因该是入门基础 随时在文件下(./dist)，启动服务器 http-server

- 19. typescript
  webpack.config.js => {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
  //配置tsconfig
  tsconfig.json => {
    "compilerOpitions" : {
      "outDir" : "./dist",
      "module": "es6", //引入模块方式 ，commjs es6
      "target": "es5", //生成es5
      "allowsJs" : true
    }
  }
  //注意 使用typescript书写，应用到外部的库. 需要安装这些库的类型文件

- 20. proxy : {

}

- 21. eslint-loader
  21-1.
  webpack官网上有关exlint-loader的配置
  第一步，npm install --save-dev eslint eslint-loader
  第二步：
  通过在devServer增加配置参数 {
    overlay: true //可以显性在浏览器看到错误
  }
  第三步：增加eslint-loader的配置
  rules: [
    {
      test:/\.js$/,
      use: ['babel-loader',{
        loader : 'eslint-loader',
        options: {
          fix : true
        },
        force : 'pre'
      }]
    }
  ]
  可以在浏览器实现代码不规范的提示功能；不过这个过程会印象打包速度；
  所以，一般来说，真实的项目中，通过git 钩子 eslint src 来检测代码是否符合规范，不规范的话，不会规范的话是提交不了的


  21-2.
  npm install eslint --save-dev
  npx eslint --init //快速搭建配置规范
    .eslintrc.js  => {
      "extends" : "aribnb", //使用的aribnb的规范
      "parser": "babel-eslint" //配置解析器
      "rules" : {
        "react/prefer-stateless-function" : 0  //我不遵循这个规范要求
      }
    } //自动生成
    npx eslint src //通过eslint 检测src目录下的语法规范

    npm install babel-eslint --save-dev  //常用的eslint解析器

    npx eslint src //解析出代码不规范的地方

  使用vscode编辑器，安装eslint插件, 在编辑器中来显性的提示错误的地方

- 22. webpack性能优化
  1 plugin插件合理使用，尽可能使用官方推荐，社区推荐的插件
  2 尽可能loader缩小文件打包检测范围，exclude include
  3 尽可能webpack node版本号新
  4 webpack.config.js => {
    resolve : {
      extensions: ['js','jsx'],  //引入文件无结尾，会先child.js  child.jsx
      mainFiles: ['index'],     //默认文件名
      alias: {
         child : path.resolve(__dirname,'../src/a/b/c/child')  //文件引入的别名
      }
    }
  }
  尽可能合理的配置 resolve
  5 第三方模块只打包一次

   1. 另开命令 webpack.dll.js 只用来打包第三方库文件, 暴露全局方法
   {
     mode:'production',
     entry: {
       vendors : ['lodash'],
       react: ['react','react-dom'],
       jquery: ['jquery']
     },
     output: {
       filename: [name].dll.js,
       path:path.reolve(__dirname,'../dll'),
       library: '[name]'
     }
   }
   npm run build:dll

   2. add-asset-html-webpack-plugin 往hwp插件上增加静态资源的作用
    这里以上面的lodash为列：
    const AddAssetHtmlWebpackPlugin = require('...');
    plugins: [
      new AddAssetHtmlWebpackPlugin({
        filepath:path.resolve(__dirname,'../dll/vendors.dll.js')
      }),
      new webpack.DllReferencePlugin({
        mainfest: path.resolve(__dirname,'../dll/vendors.mainifest.json')
      })
    ]
    针对大型项目，很多第三模块非常多，一个个配置就很lOW, 这可以工程化:

  3. fs = require('fs')
    可以详情见文档

  6 thread-loader parallel-webpack happypack 多进程打包
    sourcemap
    结合stats分析打包结果
    开发环境内存编译  内存的读取，肯定比文件读取快的多
    开发环境无用插件剔除

- 23. 多页面打包
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  webpack.config.js => {
    entry: {
      main: './src/index.js',
      list: './src/list.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        chunks : ['runtime','vendors', 'main']
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'list.html',
        chunks : ['runtime','vendors', 'list']
      }),
    ]
  }
  多页面打包，无非就是配置多个HtmlWebpackPlugin

- 24.自己写一个plugin loader
  开启node的调试
  debug : "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js"

  --inspect 第一个参数，指开启node的调试工具
  --inspect-brk 第二个参数, 第一行打个断点

- 25.手写Bundler源码编写(模块分析部分)
  npm install --save @babel/parser highlight
  ast 抽象语法树
  .... 需要手写实践，力争能自己构建一个类webpack的esModule模块化打包工具

