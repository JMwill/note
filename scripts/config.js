const path = require('path')
const rootdir = './notebook'
const ignoreFile = '.gitignore'

module.exports = {
  rootdir: path.resolve(__dirname, '..', rootdir),
  ignoreFile: path.resolve(__dirname, '..', ignoreFile),
  readme: {
    input: '_readme.md',
    output: 'README.md',
    catelogMark: /<!--\s*readme catelog\s*-->/m,
  },
}
