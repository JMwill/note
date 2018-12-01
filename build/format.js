const fs = require('fs-extra')
const path = require('path')
const config = require('./config')
const os = require('os')

module.exports = {
  createCatelog,
  createCollapsibleCatelog,
  addCatelog,
  addCollapsibleCatelog,
}

function createCollapsibleCatelog(content, summary = '目录') {
  return [
    '',
    '<details>',
    `<summary>${summary}</summary>`,
    '',
    content,
    '',
    '</details>',
    '',
  ].join(os.EOL)
}

async function createCatelog(src) {
  const srcContainer = path.dirname(src)
  const dirs = await fs.readdir(srcContainer)
  const rootContainer = path.dirname(config.rootdir)
  const linkList =
  dirs
    .filter(i => i != config.readme.input && i != config.readme.output)
    .map(i => path.relative(rootContainer, path.resolve(srcContainer, i)))
    .map(i => `- [${path.basename(i)}](${i})`)
  return linkList.join(os.EOL)
}

async function addCatelog(src, content) {
  const catelog = await createCatelog(src)
  return content.replace(config.readme.catelogMark, catelog)
}

async function addCollapsibleCatelog(src, content, summary = '目录') {
  const catelog = await createCatelog(src)
  return content.replace(
    config.readme.catelogMark,
    createCollapsibleCatelog(catelog, summary)
  )
}

function main() {
  const src = path.resolve(__dirname, '..', 'notebook/_readme.md')
  const content = [
    'prefix content',
    '<!-- readme catelog -->',
    'postfix content',
    '',
  ].join(os.EOL)
  createCatelog(src).then(r => console.log(r))
  addCatelog(src, content).then(r => console.log(r))
  addCollapsibleCatelog(src, content).then(r => console.log(r))
}

if (require != null && require.main === module) {
  main()
}
