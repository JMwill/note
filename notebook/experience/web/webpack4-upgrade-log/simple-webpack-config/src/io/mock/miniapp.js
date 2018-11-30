/* eslint-disable */
import { delay } from './utils'
import _ from 'lodash'

const entries = {}
for (var i = 1; i <= 6; i++) {
  entries[i] = {
    id: i,
    valid_until: Date.now() / 1000,
    miniapp_name: '小程序昵称_' + i,
    head_img: 'http://cdn.ifanr.cn/lime/default_avatar.png',
    principal_name: '主体信息_' + i,
    verify_type_info: { id: -1 },
    qrcode_url: 'https://media.ifanrusercontent.com/media/user_files/trochili/de/3d/de3da71a11280edf61447807bf1403a3aa77fc32-eacafa7eaa63d1b3c98de3cc01c9200c73be52f4.jpg',
    wxcode_url: 'https://media.ifanrusercontent.com/media/user_files/trochili/de/3d/de3da71a11280edf61447807bf1403a3aa77fc32-eacafa7eaa63d1b3c98de3cc01c9200c73be52f4.jpg',
    business_info: {
      open_pay: 0
    }
  }
}

export function getMiniappList () {
  const data = {
    meta: {
      total_count: 10,
      limit: 0,
      offset: 20
    },
    objects: []
  }

  data.objects = _.map(entries, e => e)

  return delay(
    'getMiniappList',
    null,
    data,
    false,
    500
  )
}

export function getMiniapp () {
  return delay(
    'getMiniapp',
    null,
    entries['1'],
    false,
    500
  )
}

export function switchMiniapp (params) {
  return delay(
    'switchMiniapp',
    null,
    null,
    false,
    500
  )
}
