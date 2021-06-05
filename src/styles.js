import { readFileSync } from 'fs'
import { resolve } from 'path'
import CleanCSS from 'clean-css'
import config from '../config.js'

export default () => {
  const styles = config.styles
    .map((file) => readFileSync(resolve(config.docyDirectory, file), 'utf8'))
    .join('')

  return new CleanCSS({}).minify(styles).styles
}
