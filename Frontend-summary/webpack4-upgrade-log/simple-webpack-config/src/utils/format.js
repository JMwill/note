import _ from 'lodash'
import config from '../config'
import moment from 'moment'

export function toFixedNumber(input) {
  if (_.isString(input)) {
    input = Number(input)
  }

  if (_.isNumber(input) && !_.isNaN(input)) {
    return input.toFixed(2)
  }

  return null
}

export function toFriendlyPrice(input) {
  if (input == null || String(input).length === 0) return '-'
  if (!_.isArray(input)) {
    input = [input]
  }

  input = _.map(input, item => `¥${toFixedNumber(item)}`)

  return input.join('~')
}

export function monthToYear(month) {
  let year = Math.floor(month / 12)
  let leftMonth = month % 12

  return {
    year,
    month: leftMonth,
  }
}

export function compact(input) {
  if (_.isArray(input)) {
    return _.compact(input)
  } else if (_.isObject(input)) {
    return _.omitBy(input, (v) => !v)
  }

  return input
}

const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm:ss'
export function toFriendlyDate(input, dateOnly) {
  const m = moment(input, 'X')
  let format = DATE_FORMAT + ' ' + TIME_FORMAT
  if (dateOnly) {
    format = DATE_FORMAT
  }

  if (m.isValid()) {
    return m.format(format)
  }
  return input
}

export function toUnixTimestap(input, dateOnly) {
  if (_.isString(input)) {
    let format = DATE_FORMAT + ' ' + TIME_FORMAT
    if (dateOnly) {
      format = DATE_FORMAT
    }
    const m = moment(input, format)

    if (m.isValid()) {
      return m.unix()
    }
  }
  return input
}

export function toCSVList(csvString) {
  if (!_.isString(csvString)) return csvString
  if (csvString.length === 0) return []
  return _.map(csvString.split(','), e => { const part = e.split(':'); return ({label: part[0], value: part[1]}) })
}

export function limitChar(input, limit) {
  input = String(input)
  if (limit > input.length) {
    return input
  }

  return input.slice(0, limit) + '...'
}

export function toFormObj(enumName, option = {}) {
  let json = config.getEnums(enumName)
  if (_.isArray(option.excludeKeys)) {
    json = _.filter(json, j => option.excludeKeys.indexOf(j.id) === -1)
  }
  return _.map(json, s => ({label: s.name, value: s.id}))
}

export function toCent(price) {
  let str = String(price)
  str = str.split('.')

  if (str.length === 1) {
    return Number(str[0] + '00')
  }

  return Number(str[0] + _.padEnd(str[1], 2, '0'))
}

export function exchange(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
  return arr
}
