const ignore = require('ignore')
const fs = require('fs-extra')

const config = require('../config')

let singleton

async function get() {
  if (singleton) return Promise.resolve(singleton)
  else return create()
}

async function create() {
  const ignoreFile = config.ignoreFile
  const existFile = await fs.exists(ignoreFile)
  const ig = ignore()

  singleton = ig

  if (existFile) {
    const ignoreContent = await fs.readFile(ignoreFile, 'utf-8')
    ig.add(ignoreContent)
  }
  return Promise.resolve(ig)
}

module.exports = {
  get,
  create,
  update: create,
}
