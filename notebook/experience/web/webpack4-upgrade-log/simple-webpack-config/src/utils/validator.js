import _ from 'lodash'

export function makeSimpleValidator(keys, custom = {}, customValidator = {}) {
  return (obj) => {
    return _.reduce(
      keys,
      (ret, field) => {
        if (customValidator[field]) {
          const errMsg = customValidator[field](obj[field])
          if (errMsg) {
            ret[field] = errMsg
          }
        } else {
          if (obj[field] == null) {
            ret[field] = custom[field] || '必填'
          } else if ((_.isArray(obj[field]) || _.isString(obj[field])) && obj[field].length === 0) {
            ret[field] = custom[field] || '必填'
          } else if (_.isObject(obj[field]) && obj[field] == null) {
            ret[field] = custom[field] || '必填'
          }
        }
        return ret
      },
      {}
    )
  }
}

export function accountNumberValidator(num) {
  num = num.toString().replace(/\s*/gm, '')

  // 校验卡号是否在 8 位数字以上
  const reg = /^\d{8,}$/

  return reg.test(num)
}

export function isInService(data) {
  const {
    valid_until,
  } = data
  let validUntil = valid_until * 1000 > Date.now()

  return validUntil
}
