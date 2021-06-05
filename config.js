import { existsSync, readFileSync } from 'fs'
import { resolve, join, basename } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const docyDirectory = (() => {
  const nodeModulesPath = 'node_modules/docy'
  const pathInNodeModules = join(process.cwd(), nodeModulesPath)

  if (existsSync(pathInNodeModules)) {
    return pathInNodeModules
  }

  if (process.env._) {
    const npxPath = process.env._.replace('.bin/docy', 'docy')

    if (existsSync(npxPath)) {
      return npxPath
    }
  }

  const resolvePath = require.resolve('docy')

  if (resolvePath && resolvePath.includes(nodeModulesPath)) {
    const resolvePathWithoutFile =
      resolvePath.split(nodeModulesPath)[0] + nodeModulesPath

    if (existsSync(resolvePathWithoutFile)) {
      return resolvePathWithoutFile
    }
  }

  console.error('Failed to locate project package.')
  process.exit(0)
  return null
})()

export const packageContents = (() => {
  let pkg = {}
  try {
    pkg = JSON.parse(
      readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')
    )
  } catch (error) {
    const parentFolderName = basename(process.cwd())
    console.error(
      `No package.json found in ${process.cwd()}, using name "${parentFolderName}" as fallback.`
    )
    pkg = {
      // Use current directory as package name.
      name: parentFolderName,
    }
  }
  return pkg
})()

const exmplPath = require.resolve('exmpl')
const options = packageContents.docy || {}

const defaults = {
  styles: [
    join(exmplPath, '../styles-opt-out-no-layout.css'),
    'styles/layout.css',
    'styles/header.css',
    'styles/navigation.css',
    'styles/article.css',
    'styles/footer.css',
  ],
  result: 'index.html',
  template: 'template.html',
  dist: 'dist',
  contentDirectory: process.cwd(),
  docyDirectory,
  title: packageContents.name,
  footer: `Documentation generated with <a href="http://github.com/tobua/docy">docy</a>.`,
  single: true,
  minify: true,
  fileNamePlaceholder: '[name]',
}

const config = Object.assign(defaults, options)

// Derived properties
config.templatePath = resolve(docyDirectory, config.template)
if (
  !config.single &&
  config.result.indexOf(config.fileNamePlaceholder) === -1
) {
  // Replace everything before the extension with the placeholder
  config.result =
    config.fileNamePlaceholder +
    config.result.substr(config.result.lastIndexOf('.'), config.result.length)
}

export default config
