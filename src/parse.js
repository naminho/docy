import remark from 'remark'
import recommended from 'remark-preset-lint-recommended'
import html from 'remark-html'
import slug from 'remark-slug'
import headings from 'remark-autolink-headings'
import behead from 'remark-behead'
import highlight from 'remark-highlight.js'
import { reporter } from 'vfile-reporter'

export default (content, depth) => {
  const parsed = remark()
    .use(recommended)
    .use(slug)
    .use(headings)
    .use(behead, {
      depth,
    })
    .use(highlight)
    .use(html)
    .processSync(content)

  if (parsed.messages.length) {
    console.log(`\n\n${reporter(parsed)}`)
  }

  return parsed.contents
}
