module.exports = class FileListPlugin {
  constructor(options) {}
  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      var filelist = 'In this build:\n\n'

      for(var filename in compilation.assets) {
        filelist += ('- ' + filename + '\n')
      }

      compilation.assets['filelist.md'] = {
        source: function() {
          return filelist
        },
        size: function() {
          return filelist.length
        }
      }
    })
  }
}