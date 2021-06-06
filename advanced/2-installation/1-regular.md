# Regular Installation

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
