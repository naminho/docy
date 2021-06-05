import inquirer from 'inquirer'

export default async (watch, open) => {
  const questions = []

  if (!open) {
    questions.push({
      type: 'confirm',
      name: 'open',
      message:
        'Do you want to open the generated documentation in the browser?',
    })
  }

  if (!watch) {
    questions.push({
      type: 'confirm',
      name: 'watch',
      message: 'Do you to watch for changes?',
    })
  }

  return inquirer.prompt(questions)
}
