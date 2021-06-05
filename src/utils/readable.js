import capitalizeTitle from 'capitalize-title'

// NOTE Avoid the g flag, as it would store the lastIndex.
const removeExtensionRegex = /(.*)\.[^.]+$/
const removeOrderingRegex = /[^a-zA-Z]+(.+)/

// Removes an optional extension for file names
// intro.md => intro
const removeExtension = (name) => {
  const regexResult = removeExtensionRegex.exec(name)

  if (regexResult && regexResult[1]) {
    return regexResult[1]
  }

  return name
}

// Removes the ordering in front.
// 1-intro => intro
const removeOrdering = (name) => {
  const regexResult = removeOrderingRegex.exec(name)

  if (regexResult && regexResult[1]) {
    return regexResult[1]
  }

  return name
}

// Removes the the characters used to help with ordering.
// 1-intro => intro
//
// Replaces dashes with spaces.
// hello-world => hello world
//
// Capitalizes the title
// hello-to-the-world => Hello to the World
export default (name) => {
  let cleanName = removeOrdering(name)
  cleanName = removeExtension(cleanName)
  cleanName = cleanName.replace('-', ' ')

  return capitalizeTitle(cleanName)
}
