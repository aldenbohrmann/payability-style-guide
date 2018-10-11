payability-styles
=================

Bower component that provides .less files with Payability's styles, also our living style guide.

## Use

Go to your front-end payability project and, if not already, set `payability-styles` as dependency into your `bower.json` file:

```json
{
  ...
  "dependencies": {
    "payability-styles": "git@github.com:Payability/payability-styles.git"
  },
  ...
}
```

Then install it:

```shell
$ bower install
```

Then you can import payability's styles into your `.less` file:

```css
@import "bower_components/payability-styles/main.less";
```

You are done. Start hacking on top of Bootstrap and Payability's styles.

### Notes

If you use `https` with git (like Stefan does), put this somewhere inside your `~/.gitconfig` file:

```
[url "https://bitbucket.org/"]
  insteadOf = git@bitbucket.org:
```

## Contributing

### Requirements

You will need `node.js`, `npm` and `bower`. Test them:

```shell
$ node -v
v0.10.35

$ npm -v
1.4.28

$ bower -v
1.3.12
```

### Optional

Install the [LiveReload plugin](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) to your favorite web browser.


### Download the necessary

```shell
$ npm install; bower install
```

### Launch the docs

Run:

```shell
$ npm start
```

It will:

* load Bootstraps' docs from Github (if they were not already downloaded)
* unzip it to `_docs/`
* patch it to use payability's styles, `main.css` file
* compile `main.less` to `main.css`
* watch for changes to `.less` files
* launch a static server (`node-static`) at port `8080` with `_docs` as source
* launch a `livereload` server.

Now you can navigate to [localhost:8080](http://localhost:8080/) and start hacking live (if you enable the LiveReload plugin).

### Problems?

Try the `npm run clean` script.

### .editorconfig

Befor you start hacking, you must know we have a `.editorconfig` file. Please be nice and install the [EditorConfig plugin](http://editorconfig.org/#download) on your favorite text editor/IDE.

### Some guidelines

* Hex colors are lowercase: `#fff`, `#a0dc4d`, `#ccc`
* Make stand-alone modules. i.g. `floating-label.less`. That also means:
    - LESS use [lazy variable loading](http://lesscss.org/features/#variables-feature-lazy-loading), so:
        + Declare defaults for the variables you use on each module. Last declared variables on LESS compilation time will be the ones used.
        + We know that it doesn't matter where you declare the variables, but declare them at the top of the file for each module.
* Use [git tags](http://git-scm.com/book/en/v2/Git-Basics-Tagging) every time you want your changes to be distributed across our repos.
    - Remember to push the tags with `git push --tags`
* Use [Semantic Versioning](http://semver.org/) for those tags. `v0.1.3`
# payability-style-guide
