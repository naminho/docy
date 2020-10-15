const fs = require('fs')
const config = require('./../config')
const log = require('./log')
const template = require('./template')

/**
 * Set the dist filename if multiple files to be generated.
 **/
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

/**
 * Recursively generates a template for each group. Only top level groups get
 * their own template.
 **/
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

module.exports = () => {
  const structure = require('./structure')()

  log('start')

  if (!fs.existsSync(config.dist)) {
    fs.mkdirSync(config.dist)
  }

  if (config.single) {
    template(structure)
  } else {
    templates(structure, structure, 0)
  }

  log('end')
}
