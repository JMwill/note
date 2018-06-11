/* eslint-disable */
import { delay } from './utils'
import _ from 'lodash'

const entries = {}
for (var i = 1; i <= 21; i++) {
  entries[i] = {
    id: i,
    name: '主题_' + i,
    discount_price: 999 * i,
    status: (i === 1 ? 'in_use' : ''),
    developer: 'ifanrx',
    cover_image: 'https://mcache.ifanr.cn/static/hydrogen-landing/src/img/demo/baas-demo-lbs-2.jpg'
  }
}

export function getMiniappThemeList (params) {
  const data = {
    meta: {
      total_count: 21,
      limit: 0,
      offset: 20
    },
    objects: []
  }

  data.objects = _.map(entries, e => e)

  return delay(
    'getMiniappThemeList',
    params,
    data,
    false,
    500
  )
}
