var path = require('path')
var config = require('../config')
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var vueLoaderConfig = require('./vue-loader.conf')


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.css', '.js', '.vue'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    module: {
        rules: [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.scss$/,
                include: [resolve('src'), resolve('test')],
                exclude: [/node_modules\/(?!(ng2-.+|ngx-.+))/],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                include: [resolve('src'), resolve('test')],
                exclude: [/node_modules\/(?!(ng2-.+|ngx-.+))/],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'style-loader'
                })
            }
        ]
    }
}