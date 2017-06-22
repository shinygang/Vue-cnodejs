var utils = require('./utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: false,
    extract: true
  })
}
