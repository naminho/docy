const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const minify = require('html-minifier').minify
const log = require('./log')
const config = require('./../config')
const style = require('./styles')()

/**
 * Minify the generated template and write it's contents to the approprite file.
 **/
const writeTemplate = (error, result, structure) => {
  if (error) {
    return log('template', error)
  }

  if (config.minify) {
    result = minify(result, {
      collapseWhitespace: true
    })
  }

  const distFileName = (structure[0] && structure[0].dist) || config.result

  fs.writeFileSync(path.join(config.dist, distFileName), result)
}

module.exports = (structure, substructure) => ejs.renderFile(
  config.templatePath,
  {
    title: config.title,
    footer: config.footer,
    structure,
    substructure: substructure || structure,
    style
  },
  {},
  (error, result) => writeTemplate(error, result, substructure || structure)
)
