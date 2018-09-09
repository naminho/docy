const remark = require('remark')
const recommended = require('remark-preset-lint-recommended')
const html = require('remark-html')
const slug = require('remark-slug')
const headings = require('remark-autolink-headings')
const behead = require('remark-behead')
const highlight = require('remark-highlight.js')
const report = require('vfile-reporter')

module.exports = (content, depth) => {
  const parsed = remark()
    .use(recommended)
    .use(slug)
    .use(headings)
    .use(behead, {
      depth
    })
    .use(highlight)
    .use(html)
    .processSync(content)

  if (parsed.messages.length) {
    console.log(`\n\n${report(parsed)}`)
  }

  return parsed.contents
}
