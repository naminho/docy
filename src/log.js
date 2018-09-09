const chalk = require('chalk')

const messages = {
  start: {
    text: 'Generating documentation.',
    type: 'info'
  },
  end: {
    text: 'Documentation successfully generated.',
    type: 'info'
  },
  template: {
    text: 'An error occurred while compiling the template.',
    type: 'error'
  },
  title: {
    text: filename => `The file ${filename} does not contain a title, like # Title.`,
    type: 'error'
  }
}

const getText = (message, args) => {
  if (typeof message.text === 'function') {
    return message.text(...args)
  }

  return message.text
}

module.exports = (key, error, ...args) => {
  const message = messages[key]

  if (message.type === 'info') {
    console.log(`${chalk.blue('docy:')} ${getText(message, args)}`)
  }

  if (message.type === 'error') {
    console.log(`${chalk.blue('docy:')} ${chalk.red(getText(message, args))}`)

    if (error) {
      console.error(error)
    }
  }
}
