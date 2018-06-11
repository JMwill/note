/* eslint-disable */
import { delay } from './utils'
import _ from 'lodash'

const entries = {}

entries[1] = {
  version: 'v1.0.1',
  theme_name: '主题名称-1',
  description: '这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述',
  qrcode_url: 'https://media.ifanrusercontent.com/media/user_files/trochili/de/3d/de3da71a11280edf61447807bf1403a3aa77fc32-eacafa7eaa63d1b3c98de3cc01c9200c73be52f4.jpg',
  wxcode_url: 'https://media.ifanrusercontent.com/media/user_files/trochili/de/3d/de3da71a11280edf61447807bf1403a3aa77fc32-eacafa7eaa63d1b3c98de3cc01c9200c73be52f4.jpg',
  status: 'prepare_for_submission'
  // status: 'waiting_for_review',
  // status: 'in_review',
  // status: 'pending_release',
  // status: 'rejected',
}

// entries[2] = {
//   version: 'v1.0.0',
//   theme_name: '主题名称-1',
//   description: '这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述这里是版本描述',
//   qrcode_url: 'https://media.ifanrusercontent.com/media/user_files/trochili/de/3d/de3da71a11280edf61447807bf1403a3aa77fc32-eacafa7eaa63d1b3c98de3cc01c9200c73be52f4.jpg',
//   status: 'ready_for_sale',
//   reason: null,
// };

export function getMiniappQrcode () {
  var data = {
    qrcode_url: 'https://media.ifanrusercontent.com/media/user_files/trochili/de/3d/de3da71a11280edf61447807bf1403a3aa77fc32-eacafa7eaa63d1b3c98de3cc01c9200c73be52f4.jpg'
  }

  // data = {
  //   qrcode_url: null,
  // };

  return delay(
    'getMiniappQrcode',
    null,
    data,
    false,
    500
  )
}

export function getMiniappVersionList (params) {
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
    'getMiniappVersionList',
    params,
    data,
    false,
    500
  )
}

export function addMiniappVersion (params) {
  entries[1] = {
    ...params,
    theme_name: '新创建的主题',
    status: 'prepare_for_submission'
  }

  return delay(
    'addMiniappVersion',
    params,
    entries[1],
    false,
    500
  )
}

export function commitMiniappVersion () {
  entries[1].status = 'waiting_for_review'
  entries[1].qrcode_url = 'https://media.ifanrusercontent.com/media/user_files/trochili/de/3d/de3da71a11280edf61447807bf1403a3aa77fc32-eacafa7eaa63d1b3c98de3cc01c9200c73be52f4.jpg'

  return delay(
    'commitMiniappVersion',
    null,
    entries[1],
    false,
    500
  )
}

export function auditMiniappVersion (params) {
  entries[1].status = 'in_review'

  return delay(
    'auditMiniappVersion',
    params,
    entries[1],
    false,
    500
  )
}

export function releaseMiniappVersion () {
  entries[1].status = 'ready_for_sale'

  return delay(
    'releaseMiniappVersion',
    null,
    entries[1],
    false,
    500
  )
}

export function getMiniappCategoryList (params) {
  const arr = [
    {
      first_class: 'A',
      second_class: 'A-1',
      third_class: 'A-1-1',
      first_id: 1,
      second_id: 11,
      third_id: 111
    },
    {
      first_class: 'A',
      second_class: 'A-1',
      third_class: 'A-1-2',
      first_id: 1,
      second_id: 11,
      third_id: 112
    },
    {
      first_class: 'A',
      second_class: 'A-2',
      third_class: 'A-2-1',
      first_id: 1,
      second_id: 12,
      third_id: 121
    },
    {
      first_class: 'A',
      second_class: 'A-2',
      third_class: 'A-2-2',
      first_id: 1,
      second_id: 12,
      third_id: 122
    },
    {
      first_class: 'B',
      second_class: 'B-1',
      first_id: 2,
      second_id: 21
    },
    {
      first_class: 'B',
      second_class: 'B-2',
      first_id: 2,
      second_id: 22
    },
    {
      first_class: 'C',
      first_id: 3
    }
  ]

  const data = {
    category_list: arr
  }

  return delay(
    'getMiniappCategoryList',
    params,
    data,
    false,
    500
  )
}

export function getMiniappAudit () {
  return delay(
    'getMiniappAudit',
    null,
    {
      status: '',
      reason: '拒绝的原因'
    },
    false,
    500
  )
}

export function refreshMinappWxcode () {
  return delay(
    'refreshMinappWxcode',
    null,
    {
      wxcode_url: 'https://mcache.ifanr.cn/static/trochili/desktop/src/img/base-icon/trochili-qrcode-72.png'
    },
    false,
    500
  )
}
