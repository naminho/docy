const fs = require('fs')
const path = require('path')
const watch = require('watch')
const config = require('./../config')
const render = require('./render')

const watchFile = (file) => {
  fs.watchFile(file, (curr, prev) => {
    if (!(prev === null && curr === null)) {
      render()
    }
  })
}

const watchDirectory = (directory) => {
  watch.watchTree(
    directory,
    {
      ignoreDirectoryPattern: new RegExp(`${config.dist}|node_modules`, 'i'),
    },
    (f, curr, prev) => {
      if (!(typeof f == 'object' && prev === null && curr === null)) {
        render()
      }
    }
  )
}

module.exports = () => {
  // User directory
  watchDirectory(config.contentDirectory)
  // Development directories
  watchDirectory(path.resolve(config.docyDirectory, 'styles'))
  // Template
  watchFile(config.templatePath)
}
