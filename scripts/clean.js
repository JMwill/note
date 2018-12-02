const fs = require('fs-extra')
const path = require('path')
const {log} = require('./utils')
const config = require('./config')
const {findAllReadmeSrc} = require('./build/readme')

const specialType = ['input', 'output']
async function main() {
  const type = process.argv[2]

  log('!!!!!! cleaning... !!!!!!')
  if (!specialType.includes(type)) {
    await fs.remove(path.resolve(__dirname, '..', type))
    log(`${type} cleared`)
  } else {
    const srcPathList = await findAllReadmeSrc(config.rootdir)
    const createPromiseList = srcPathList.map(async src => {
      const target = path.resolve(path.dirname(src), config.readme[type])
      await fs.remove(target)
      log(`${target} cleared`)
    })
    await Promise.all(createPromiseList)
  }
  log('!!!!!! finished !!!!!!')
}

if (require != null && require.main === module) {
  main()
}
