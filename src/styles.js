const fs = require('fs')
const path = require('path')
const config = require('../config')
const CleanCSS = require('clean-css')

module.exports = () => {
  const styles = config.styles.map(file =>
    fs.readFileSync(path.resolve(config.docyDirectory, file), {encoding: 'utf8'})
  ).join('')

  return (new CleanCSS({})).minify(styles).styles
}
