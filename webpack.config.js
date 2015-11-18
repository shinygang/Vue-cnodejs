'use strict'

var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vue = require("vue-loader");
var isProduction = function() {
    return process.env.NODE_ENV === 'production';
}

//webpck插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    //将样式统一发布到style.css中
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    })
];
var entry = ['./src/main'],
    cdnPrefix = "",
    buildPath = "/dist/",
    publishPath = cdnPrefix + buildPath;
//生产环境js压缩和图片cdn
if (isProduction()) {
    //plugins.push(new webpack.optimize.UglifyJsPlugin());
    cdnPrefix = "";
    publishPath = cdnPrefix;
}
//编译输出路径
module.exports = {
    debug: true,
    entry: entry,
    output: {
        path: __dirname + buildPath,
        filename: 'build.js',
        publicPath: publishPath
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: vue.withLoaders({
                css: ExtractTextPlugin.extract(
                    "style-loader", "css-loader?sourceMap!sass-loader!cssnext-loader")
            }),
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", 'css-loader?sourceMap!sass-loader!cssnext-loader')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!cssnext-loader")
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: "file-loader?name=images/[hash].[ext]"
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }]
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        //别名
        alias: {
            filter: path.join(__dirname, 'src/filters')
        }
    },
    plugins: plugins,
    devtool: '#source-map'
};
