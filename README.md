
# Webpack-giao

## 2020-08-07
> 已经忘记这是打起决心要把webpack ~~学精通~~ ~~熟练掌握~~ 会简单使用(´;︵;`) 的第n次，不能这么下去了，即使还得这么下去，我也不想每次都从头开始了，现在就做出一点点改变吧，记录下来，~~鞭笞？？~~ ~~鞭挞？？~~ 激励自己吧！！加油！！！giao~ giao~

#### 万恶的开头
> 我是谁，我要干什么

node npm 啥玩意的就不说了，问就是我不会，直接安装啊，香啊，皂啊，吃完吐泡泡啊~

##### 空白文件
> 总得找个空白文件夹吧
> 咱也装个逼，要啥右键新建文件夹？mkdir听着不牛逼吗？

```
mkdir webpack-giao

npm init // 想写个注释，却不知道说些什么，反正就初始化吧啊
// 一路回车懂不懂？为啥回车自己看提示，刚开始用，没啥花里胡哨，初始化啥我就用啥，
```

#### 开始webpack
> 文件夹建好了，npm初始化好了，大功告成，关机下班！！！
> ಠ౪ಠ 

1. 安装webpack
```
npm install webpack -D 
npm i webpack-cli -D
npm webpack-dev-server -D // 本地服务器啊
```
-D在开发环境中使用，-S在生产环境中使用，他俩有哈区别啊？   **不知道，以后知道了再回来写**（我说的，知道了不改这里我就从楼上跳下去）

2. 写配置文件
> webpack.config.js 自己新建啊，不会自动生成的，webpack4好像不写也行，就是这么牛B
> 建个入口文件 /src/index.js 随便写个几千行代码
```
module.exports={
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'dingst'), // 都叫dist,那我就叫它dingst
        filename:'[name].[hash].js'
    },
    devServer:{
        port:'9011',
        host:'localhost',
        overlay:true,
        compress:true// 服务器返回启动gzip压缩
    }
}
```
修改package.json
```
"scripts": {
    "build": "webpack --mode development", // 开发模式
    "start": "webpack-dev-server --open --mode development" // 调试模式
},
```
mode两种模式，之后再说,现在npm run build就会打包，npm run start 就会开启本地服务器了，如果不行，那就换个电脑试试。

好了，到这webpack就配置好了，也能用了，就酱~byebye（啪！(ノ๑`ȏ´๑)ノ︵⌨）
3. 自动生成html
> 我不想每次打包完都得手动引一下打包文件，尤其打包文件名称带hash的，懒人成就世界
```npm i html-webpack-plugin -D ```
然后添加plugin，还有每次打包完之前的打包文件还存在，太碍事，删掉
```npm i clean-webpack-plugin -D```
```
plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ["app"],
      minify: {
        collapseWhitespace: true // 压缩
      }
    }),
    new CleanWebpackPlugin(),
]
```
每次打包完,删除之前代码！完美

4. 配置loader
> 这样配置只是个js合并器，不能打包css，不能打包图片、font也不能直接写react,呵呵。

**支持css，图片**
``` npm i style-loader css-loader file-loader -D ```
修改webpack.config.js
```
module:{
    rules:[
        {
            test:/\.css$/,
            use:['style-loader','css-loader'],// 转换的时候是从右往左转换的，顺序执行，css-loader处理css中url的路径,style-loader将css文件变成style标签插入head里
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        }
    ]
},
```

**支持react**
先不说react
不配置babel,写的es6代码浏览器看不懂啊，还有react的jsx语法，这锅谁背。加loader吧
``` npm i babel-loader @babel/core @babel/preset-env @babel/polyfill -D ```
```
module:{
    rules:[{
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
        }
    }]
},
```
还得崽根目录下新建.babelrc文件配置，好像也可以直接写在webpack配置里，大概就是那样，反正要配置!profill引入后包变超大，所以得解决
```npm i @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2 -D```
修改.babelrc
```
{
    "presets": [
        [
        "@babel/preset-env",
        {
            "targets": {
                "browsers": ["> 1%", "last 2 versions"]
            },
            "corejs": 3,
            "useBuiltIns": "usage"
        }]
    ],
    "plugins": [
        [
          "@babel/plugin-transform-runtime",
          {
            "corejs": false,
            "helpers": true,
            "regenerator": true,
            "useESModules": false
          }
        ]
    ]
}
```
npm run build,按需引入，短小精悍~~

**引入react**
```
    npm install react react-dom -S
    npm install @babel/preset-react -D 
```
添加react 入口文件 -> src/app.js
```

import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
    render(){
        return (
            <div>1232123</div>
        )
    }
}

ReactDom.render(<App />,document.getElementById('myPro'))
```
同时，在public/index.html中添加```<div id="myPro"></div>```元素
修改配置文件.balbelrc

```
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": ["> 1%", "last 2 versions"]
                },
                "corejs": 3,
                "useBuiltIns": "usage"
            }
        ],
    ++  "@babel/preset-react" 
    ],
```
```npm run start```应该能看到页面了，看不到就带上眼镜再看看。

**至此，一个简单的react应用就构建好了**
> 当然,只有这样的是远远不够的，我知道的后续还需要添加less等css预处理器,autoprefixer自动前缀,resolve 配置,react-router,redux等等


## 2020-08-10
> 线上看了一下，我写的md文档真尸米，难受，写完在美化吧

**后续优化：**
- ~~css预处理器~~ (**完成，有小坑**)
- ~~autoprefixer自动前缀~~ (**完成**)
- resolve快捷配置
- 压缩 提取 CSS
- 代码规范
- DLL优化
- 开发、打包配置拆分
- react-router
- redux
看缘分添加吧，今天争取加两条，啊~~西巴。

### css预处理器+模块化+自动前缀

```
npm install autoprefixer postcss-loader less-loader node-sass sass sass-loader -D

```
修改webpack.config.js
```
{
                test:/\.css$/,
                use:['style-loader',{
                    loader:'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[name]-[hash:base64:5]'
                        },
                      }
                },'postcss-loader'],
                exclude: /node_modules/
            },
            {
                test:/\.less$/,
                use:['style-loader',{
                    loader:'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[name]-[hash:base64:5]'
                        },
                      }
                },'postcss-loader','less-loader'],
                exclude: /node_modules/
            },
            {
                test:/\.scss$/,
                use:['style-loader',{
                    loader:'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[name]-[hash:base64:5]'
                        // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        },
                      }
                },'postcss-loader','sass-loader'],
                exclude: /node_modules/
            },
```
之后考虑复用。
> 有个坑，之前没有开启cssmodule模式，使用import styles from './index.less'运行,代码中并没有添加class，原来是要配置开启module,然后老版cssmodule直接在css-loader?module...这么写，新版cssloader需要分开写，详情见上述代码，完毕吼收工。

同时增加postcss.config.js
```
module.exports = {
    plugins: [require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})],
};
```
开启自动添加样式前缀







