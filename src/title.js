const unified = require('unified')
const markdown = require('remark-parse')
const log = require('./log')
const readable = require('./utils/readable')

/**
 * Get the main heading of a markdown file.
 **/
module.exports = (content, file) => {
  // Get an MDAST from the markdown file: https://github.com/syntax-tree/mdast
  const tree = unified()
    .use(markdown)
    .parse(content)

  // Check a node to see if it's a heading and if not continue walking the tree.
  const walkTree = (node) => {
    // If a heading is found, return it's value
    // Headings of depth 2 are also accepted
    if (
      node.type === 'heading' &&
      node.depth < 3 &&
      node.children &&
      node.children.length > 0
    ) {
      return node.children[0].value
    }

    // Continue checking children and return the first heading found.
    if (node.children) {
      const headings = node.children
        .map((child) => walkTree(child))
        .filter(Boolean)

      if (headings.length > 0) {
        return headings[0]
      }
    }

    return false
  }

  let title = walkTree(tree)

  if (!title) {
    // Use filename as title if none found in file contents.
    log('title', null, file)
    title = readable(file)
  }

  return title
}
