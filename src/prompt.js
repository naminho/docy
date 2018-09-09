const inquirer = require('inquirer')

module.exports = (watch, open) => {
  const questions = []

  if (!open) {
    questions.push({
      type: 'confirm',
      name: 'open',
      message: 'Do you want to open the generated documentation in the browser?'
    })
  }

  if (!watch) {
    questions.push({
      type: 'confirm',
      name: 'watch',
      message: 'Do you to watch for changes?'
    })
  }

  const promise = new Promise((resolve, reject) => {
    inquirer.prompt(questions).then(answers => {
      if (watch) {
        answers.watch = watch
      }

      if (open) {
        answers.open = open
      }

      resolve(answers)
    }, error => reject(error))
  })

  return promise
}
