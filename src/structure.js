import { readFileSync } from 'fs'
import glob from 'fast-glob'
import GithubSlugger from 'github-slugger'
import config from '../config.js'
import title from './title.js'
import parse from './parse.js'
import readable from './utils/readable.js'

const slugger = new GithubSlugger()

// Recursively add links and dist files to the entries in the structure.
const enhance = (entry, parent) => {
  if (!entry) {
    return
  }

  entry.link = `#${entry.id}`

  // Add dist file if multiple files desired.
  if (!config.single) {
    if (entry.depth === 1) {
      // If multiple files are configured the top level items get their own file.
      entry.dist = config.result.replace(config.fileNamePlaceholder, entry.id)
      entry.link = entry.dist
    } else {
      // Contents are found in the top-level file.
      entry.dist = parent.dist
      entry.link = `${entry.dist}${entry.link}`
    }
  }

  // Continue recursion if there are subentries.
  if (entry.entries instanceof Array) {
    entry.entries.forEach((item) => enhance(item, entry))
  }
}

// Creates an entry stub for a folder.
const createEntryForFolder = (folders, entry) => {
  slugger.reset()
  const groupName = folders[folders.length - 1]
  return {
    name: groupName,
    id: slugger.slug(groupName),
    entries: [entry],
    depth: folders.length,
  }
}

// Helper to find elements by the name property in an array.
const findByName = (values, name) =>
  values.filter((value) => value.name === name)[0]

// Place the entry at the appropriate place inside the structure.
const place = (structure, folders, entry, previousEntry) => {
  // There are folders, add stubs for them first.
  if (folders.length) {
    // Check if the folder has already been added.
    let group = findByName(structure, folders[folders.length - 1])

    if (!group) {
      // Folder hasn't been added yet, push it as a new entry.
      group = createEntryForFolder(folders, previousEntry)
    } else {
      // Folder was found, add the entry there.
      group.entries.push(previousEntry)
    }

    const foldersWithoutLastItem = folders.slice(0, -1)
    return place(structure, foldersWithoutLastItem, entry, group)
  }

  const group = findByName(structure, previousEntry.name)

  if (!group) {
    structure.push(previousEntry)
  }
}

export default () => {
  const entries = glob
    .sync(['**/*.md'], {
      ignore: ['node_modules', config.dist],
    })
    .sort() // Sort, otherwise files come before folders

  const structure = []

  entries.forEach((file) => {
    const content = readFileSync(file, { encoding: 'utf8' })
    const folders = file.split('/').slice(0, -1).map(readable)
    const depth = file.split('/').length
    const name = title(content, file)
    const entry = {
      file,
      id: slugger.slug(name),
      name,
      source: content,
      depth: folders.length + 1,
      html: parse(content, depth),
    }

    place(structure, folders, entry, entry)
  })

  if (!config.single) {
    structure[0].id = 'index'
  }

  // Add dist files and links.
  structure.forEach((group) => enhance(group))

  return structure
}
