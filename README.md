# docy

Documentation generator for your plugin, library or framework.

## Quick Start

The get started quickly create one or more Markdown `.md` files and inside that
folder run the following from the console having [node](http://nodejs.org) installed:

```
npm install -g docy
docy
```

You'll be asked whether you want open the result in the browser and watch for changes.

## Regular Installation

To get started set up a `package.json` in the folder where you want to keep the documentation.

```
{
  "name": "my-documentation",
  "scripts": {
    "start": "docy",
    "develop": "docy --watch --open",
    "build": "docy --build"
  }
}
```

If you already have a `package.json` add the script that matches your needs best.

First install `docy` by running `npm install docy` and then generate the documentation running `npm start`.

## Structure

The documentation is stored inside markdown files.

`Simple`

```
docy
├── 1-intro.md
├── 2-installation.md
├── 3-usage.md
└── 4-license.md
```

Files inside a folder will be ordered alphabetically, to avoid this and keep
the desired order add numbers in front. The filename will only be used for the
purpose of ordering the contents.

`Groups`

```
docy
├── 1-introduction
│   ├── 1-welcome.md
│   └── 2-intro.md
├── 2-installation
|   ├── 1-regular.md
│   └── 2-global.md
├── 3-usage.md
└── 4-license.md
```

For more complex documentations the files can be nested inside folders to
represent different levels.

## Contents

Here's how an example `.md` file could look like:

```
# Installation

to install run `npm i docy`.
```

## Usage

### Options

The plugin can be configured by setting options in the `package.json` file.

```
{
  "name": "my-documentation",
  "scripts": {
    "start": "docy"
  },
  "docy": {
    "title": "My Documentation"
  }
}
```

The following options are available:

`title` default `package.name`

Set the title of the documentation.

`footer` default `empty`

Set the footer content.

`result` default `index.html`

Name of the resulting documentation file.

`dist` default `./dist`

Folder where the generated documentation should be placed.

`single` default `true`

Generate a single HTML file for the whole documentation. Set to `false` to generate a separate HTML file for every source file. Currently this will only generate separate files for the top level.

`template` default `template.html`

Path relative to the documentation directory pointing to an `ejs` template.

## License

MIT
