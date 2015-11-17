#用Vue.js重写了cnode.js前端

###安装

项目地址：（`git clone`）

```shell
git clone https://github.com/shinygang/Vue-cnodejs.git
```

通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动服务(http://localhost:8090)

```
node server.js
```
发布代码
```
npm run dist
```

###开发

###目录结构
<pre>
.
├── README.md           
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 各种组件
│   ├── views          // 各种页面
│   ├── filters.js     // 各种过滤器
│   └── main.js        // Webpack 预编译入口
├── server.js          // webpack-dev-server服务配置
└── webpack.config.js  // Webpack 配置文件
</pre>


##todo list
1. []localStorage 隐私模式
2. []文本编辑器

