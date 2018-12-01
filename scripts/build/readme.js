const fs = require('fs-extra')
const path = require('path')

const config = require('../config')
const ignore = require('./ignore')
const {log} = require('../utils')

module.exports = {
  findAllReadmeSrc,
  createTargetReadme,
}

async function includeReadmeSrc(dirPath) {
  const src = config.readme.input
  const result = await fs.readdir(dirPath)
  return result.includes(src)
}

async function findAllReadmeSrc(rootdir) {
  const storage = []
  await findReadmeSrc(rootdir, storage, rootdir)
  return storage
}

async function findReadmeSrc(dir, storage, rootdir) {
  const [isInclude, subdirContentList] =
    await Promise.all([
      includeReadmeSrc(dir),
      fs.readdir(dir),
    ])

  if (isInclude) { storage.push(path.resolve(dir, config.readme.input)) }

  const subdir = await getSubdir(dir, subdirContentList, rootdir)
  const subdirFindReadmeSrcList = subdir.map(i => findReadmeSrc(path.resolve(dir, i), storage, rootdir))
  await Promise.all(subdirFindReadmeSrcList)
}

async function getSubdir(dir, contentList, rootdir) {
  const ig = await ignore.get()
  const subdir = []
  const resolveContentList =
    contentList
      .map(i => path.relative(rootdir, path.resolve(dir, i)))
      .filter(ig.createFilter())
      .map(i => path.resolve(rootdir, i))

  const stats = await Promise.all(resolveContentList.map(i => fs.stat(i)))
  stats.forEach((s, i) => {
    if (s && s.isDirectory()) {
      subdir.push(resolveContentList[i])
    }
  })
  return subdir
}

async function createTargetReadme(src, content) {
  const output = config.readme.output
  const dir = path.dirname(src)
  const outputPath = path.resolve(dir, output)
  await fs.writeFile(outputPath, content)
}

async function main() {
  log(`========= Find ${config.rootdir} =========`)
  const srcPaths = await findAllReadmeSrc(config.rootdir)
  log(srcPaths)
  log(`========= Find ${config.rootdir} =========`)
  log(`========= Create ${srcPaths[0]} =========`)
  createTargetReadme(srcPaths[0], 'readme.js test content')
}

if (require != null && require.main === module) {
  main()
}
