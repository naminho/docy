import { watchFile } from 'fs'
import { resolve } from 'path'
import chokidar from 'chokidar'
import config from '../config.js'
import render from './render.js'

const watchTemplate = (file) =>
  watchFile(file, (current, previous) => {
    if (!(current === null && previous === null)) {
      render()
    }
  })

const watchDirectory = (directory) => {
  chokidar
    .watch(directory, {
      ignoreInitial: true,
      ignored: new RegExp(`${config.dist}|node_modules`, 'i'),
    })
    .on('all', render)
}

export default () => {
  // User directory
  watchDirectory(config.contentDirectory)
  // Development directories
  watchDirectory(resolve(config.docyDirectory, 'styles'))
  // Template
  watchTemplate(config.templatePath)
}
