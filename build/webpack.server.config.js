const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssImport = require('postcss-import')
const precss = require('precss')
const cssnext = require('postcss-cssnext')

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [ // 里面是我们要用的插件
            postcssImport({ addDependencyTo: webpack }),
            precss,
            cssnext({ autoprefixer: { browsers: 'last 4 versions' } })
          ]
        },
        context: '/'
      }
    }),
    new ExtractTextPlugin({
      filename: 'common.css',
      allChunks: true
    }),
    new VueSSRServerPlugin()
  ]
})
