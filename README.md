#基于vue.js重写Cnodejs.org社区的webapp [线上访问地址](http://shinygang.coding.me/)

## 注意：当前项目代码已经升级到2.0，均采用vue-cli搭建的程序，非vue-cli的版本请看分支：not-vue-cli
 * master分支采用vue-cli构建的2.0版本。
 * ssr分支采用服务端渲染
 * 1.x代码请看1.x分支。
 * not-vue-cli则是没有采用vue-cli搭建的原始版本

-------
#### ` 如果对你有帮助，恳请给作者累积一个大保健的机会，欢迎扫码`
![](http://ww1.sinaimg.cn/large/79462090ly1flmcqgz0xwj21080q2anh.jpg)

###安装

项目地址：（`git clone`）

```shell
git clone https://github.com/shinygang/Vue-cnodejs.git
```

通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```

启动服务(http://localhost:8020)

```
npm run dev
```

发布代码
```
npm run build
```

###开发

###目录结构
<pre>
.
├── README.md           
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 各种组件
│   ├── views          // 各种页面
│   ├── vuex           // vuex状态管理器
│   ├── filters.js     // 各种过滤器
│   └── main.js        // Webpack 预编译入口
</pre>


