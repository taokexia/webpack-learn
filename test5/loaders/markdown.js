const marked = require('marked')
const loaderUtils = require('loader-utils')

module.exports = function(markdown) {
  const options = loaderUtils.getOptions(this)

  this.cacheable()

  marked.setOptions(options)

  const result = marked(markdown)
  return result
}