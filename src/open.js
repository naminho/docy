import live from 'live-server'
import config from '../config.js'

export default () => {
  live.start({
    root: `./${config.dist}`,
    open: true,
    logLevel: 0,
  })
}
