const fs = require('fs-extra')
const path = require('path')
const os = require('os')

const {log} = require('./utils')
const config = require('./config')
const {findAllReadmeSrc, createTargetReadme} = require('./readme')
const format = require('./format')

async function main() {
  log('building...')
  const srcPathList = await findAllReadmeSrc(config.rootdir)
  const createPromiseList = srcPathList.map(async src => {
    let content = await fs.readFile(src, 'utf-8')
    if (!config.readme.catelogMark.test(content)) {
      const catelog = await format.createCatelog(src)
      const collapsibleCatelog = await format.createCollapsibleCatelog(catelog)
      content = [collapsibleCatelog, content].join(os.EOL)
    } else {
      content = await format.addCollapsibleCatelog(src, content)
    }
    await createTargetReadme(src, content)
    log(`builded ${path.resolve(path.dirname(src), config.readme.output)}`)
  })
  await Promise.all(createPromiseList)
  log('!!!!!! finished !!!!!!')
}

if (require != null && require.main === module) {
  main()
}
