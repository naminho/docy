import { mkdirSync, existsSync } from 'fs'
import config from '../config.js'
import log from './log.js'
import template from './template.js'
import createStructure from './structure.js'

// Set the dist filename if multiple files to be generated.
const setDistFilename = (structure, first) => {
  if (!config.single) {
    if (first) {
      structure.id = 'index'
    }
    structure.dist = config.result.replace(
      config.fileNamePlaceholder,
      structure.id
    )
  }
}

// Recursively generates a template for each group. Only top level groups get
// their own template.
const templates = (structure, substructure) => {
  // Top level => continue recursion
  if (substructure instanceof Array && substructure[0].depth === 1) {
    substructure.forEach((group, index) => setDistFilename(group, index === 0))
    return substructure.forEach((group) => templates(structure, group))
  }

  // Generate template only after recursion has added necessary info everywhere.
  if (substructure.html || substructure.entries) {
    template(structure, [substructure])
  }
}

export default () => {
  const structure = createStructure()

  log('start')

  if (!existsSync(config.dist)) {
    mkdirSync(config.dist)
  }

  if (config.single) {
    template(structure)
  } else {
    templates(structure, structure, 0)
  }

  log('end')
}
