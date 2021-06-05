import { writeFileSync } from 'fs'
import { join } from 'path'
import ejs from 'ejs'
import { minify } from 'html-minifier'
import log from './log.js'
import config from '../config.js'
import style from './styles.js'

// Minify the generated template and write it's contents to the approprite file.
const writeTemplate = (error, result, structure) => {
  let content = result
  if (error) {
    log('template', error)
    return
  }

  if (config.minify) {
    content = minify(content, {
      collapseWhitespace: true,
    })
  }

  const distFileName = (structure[0] && structure[0].dist) || config.result

  writeFileSync(join(config.dist, distFileName), content)
}

export default (structure, substructure) =>
  ejs.renderFile(
    config.templatePath,
    {
      title: config.title,
      footer: config.footer,
      structure,
      substructure: substructure || structure,
      style: style(),
    },
    {},
    (error, result) => writeTemplate(error, result, substructure || structure)
  )
