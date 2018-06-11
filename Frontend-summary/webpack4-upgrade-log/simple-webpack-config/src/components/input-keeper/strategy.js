const _ = require('lodash/fp')
const util = require('./util')

const db = {}
let config = {
  limit: 10,
  max_size: 500,
  storage: {
    get(id) {
      return db[id] || []
    },
    save(id, data) {
      db[id] = data
    },
  },
  cache: true,
}

const sortBy = (a, b) => {
  // 最新的
  if (a.updated_at > b.updated_at) {
    return -1
  } else if (a.updated_at < b.updated_at) {
    return 1
  } else {
    //  录入次数最多的
    if (a.hit > b.hit) {
      return -1
    } else if (a.hit < b.hit) {
      return 1
    } else {
      return 0
    }
  }
}

module.exports = (id, options) => {
  config = _.defaults(config)(options)

  let default_key = []
  if (options.default_key) {
    default_key = options.default_key
  }

  if (!config.cache) {
    db[id] = config.storage.get(id)
  } else {
    if (!db[id]) {
      db[id] = config.storage.get(id)
    } else {
      db[id] = []
    }
  }

  db[id] = db[id].sort(sortBy)

  return {
    getKeys(keyword = '') {
      let result = db[id]

      result = _.map(_.prop('key'))(result)

      _.forEach(x => {
        if (_.indexOf(x, result) === -1) {
          result.push(x)
        }
      })(default_key)

      result = _.compose(
        _.take(config.limit),
        _.filter(_.startsWith(keyword))
      )(result)

      return result
    },
    getValues(key, keyword = '') {
      let result = db[id]
      result = _.compose(
        _.take(config.limit),
        _.filter(_.startsWith(keyword)),
        _.map(_.prop('key')),
        _.propOr([], 'children'),
        _.find(x => x.key === key)
      )(result)
      return result
    },
    recommend(key) {
      let result = db[id]
      result = _.compose(
        _.propOr('', 'key'),
        _.propOr({}, '[0]'),
        _.propOr([], 'children'),
        _.find(x => x.key === key)
      )(result)
      return result
    },
    add(key, value) {
      let result = db[id]
      let today = util.getDateTimestamp()

      let parent = _.find(x => x.key === key)(result)
      if (!parent) {
        parent = {
          key: key,
          hit: 1,
          updated_at: today,
          children: [],
        }
        result.unshift(parent)
      } else {
        parent.hit += 1
        parent.updated_at = today
      }

      let child = _.find(x => x.key === value)(parent.children)
      if (!child) {
        child = {
          key: value,
          hit: 1,
          updated_at: today,
        }
        parent.children.unshift(child)
      } else {
        child.hit += 1
        child.updated_at = today
      }

      parent.children.sort(sortBy)
      result = result.sort(sortBy)

      if (result.length > config.max_size) {
        result.pop()
      }

      db[id] = result

      config.storage.save(id, result)
    },
    remove(key, value) {
      let result = db[id]
      let parent = _.find(x => x.key === key)(result)
      if (parent) {
        parent.hit -= 1

        let child = _.find(x => x.key === value)(parent.children)
        if (child) {
          child.hit -= 1
          parent.children.sort(sortBy)
        }

        result = result.sort(sortBy)
        config.storage.save(id, result)
      }
    },
  }
}
