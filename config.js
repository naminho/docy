const contentDirectory = process.cwd()
const docyDirectory = __dirname

const path = require('path')
const exmplPath = require.resolve('exmpl')
let package = {}
try {
  package = require(path.resolve(contentDirectory, 'package.json'))
} catch (error) {}
const options = package.docy || {}

const defaults = {
  styles: [
    path.join(exmplPath, '../styles-opt-out-no-layout.css'),
    'styles/layout.css',
    'styles/header.css',
    'styles/navigation.css',
    'styles/article.css',
    'styles/footer.css',
  ],
  result: 'index.html',
  template: 'template.html',
  dist: 'dist',
  contentDirectory,
  docyDirectory,
  title: package.name,
  footer: `Documentation generated with <a href="http://github.com/tobua/docy">docy</a>.`,
  single: true,
  minify: true,
  fileNamePlaceholder: '[name]',
}

const config = Object.assign(defaults, options)

// Derived properties
config.templatePath = path.resolve(docyDirectory, config.template)
if (
  !config.single &&
  config.result.indexOf(config.fileNamePlaceholder) === -1
) {
  // Replace everything before the extension with the placeholder
  config.result =
    config.fileNamePlaceholder +
    config.result.substr(config.result.lastIndexOf('.'), config.result.length)
}

module.exports = config
