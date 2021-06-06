#!/usr/bin/env node
import { program } from 'commander'
import render from './src/render.js'
import prompt from './src/prompt.js'
import watch from './src/watch.js'
import open from './src/open.js'
import { packageContents } from './config.js'

// Generate CLI
program
  .version(packageContents.version || '0.0.0')
  .option('-b, --build', 'Build only, no watch and open.')
  .option('-w, --watch', 'Watch filesystem for changes.')
  .option('-o, --open', 'Open the generated documentation in the browser.')
  .parse(process.argv)

const options = program.opts()

if (options.build) {
  render()
  process.exit(0)
}

let answers = {
  watch: false,
  open: false,
}

// Ask if watch and open are desired, then render.
try {
  answers = await prompt(options.watch, options.open)
} catch (error) {
  console.error('Failed to prompt for watch and open.')
}

if (options.watch || answers.watch) {
  watch()
}

render()

if (options.open || answers.open) {
  open()
}
