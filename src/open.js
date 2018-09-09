const path = require('path')
const opn = require('opn')
const live =  require('live-server')
const config = require('./../config')

module.exports = () => {
  live.start({
    root: `./${config.dist}`,
    open: true,
    logLevel: 0
  })
}
