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
  抽出css成 单个文件, 分入口打包
