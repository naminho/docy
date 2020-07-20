#!/usr/bin/env node

const contentDirectory = process.cwd()

const path = require('path')
const { program } = require('commander')
let package = {}
try {
  package = require(path.resolve(contentDirectory, 'package.json'))
} catch(error) {}
const render = require('./src/render')
const prompt = require('./src/prompt')
const watch = require('./src/watch')
const open = require('./src/open')

// Generate CLI
program
  .version(package.version || '0.0.0')
  .option('-b, --build', 'Build only, no watch and open.')
  .option('-w, --watch', 'Watch filesystem for changes.')
  .option('-o, --open', 'Open the generated documentation in the browser.')
  .parse(process.argv)

if (program.build) {
  return render()
}

// Ask if watch and open are desired, then render.
const promptmise = prompt(program.watch, program.open)

promptmise.then((answers) => {
  if (answers.watch) {
    watch()
  }

  render()

  if (answers.open) {
    open()
  }
}, () => {})
