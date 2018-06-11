/* eslint-disable */
import { delay } from './utils'
import _ from 'lodash'

const db = {
  entries: {},
  ids: []
}

for (let i = 100; i >= 1; i--) {
  db.entries[i] = {
    name: '玩物志专用#1',
    target_url: 'http://a.com',
    image: 'http://canton-assets.ifanrusercontent.com/media/user_files/canton/db/37/db37a21bd3db219b91eae832906e6ff59ab8afa3-c8ef534024153badca109385f35a15fde5c6a328.jpg',
    status: i % 2 === 0 ? 'active' : 'inactive',
    priority: i,
    target_name: '广告名称--' + i,
    banner_type: i % 2 === 0 ? 'banner' : 'recommend',
    id: i,
    resource_uri: '/api/ad/' + i,
    target_type: i % 2 === 0 ? 'product' : 'shelf',
    target_id: i
  }
  db.ids.push(i)
}

db.entries[100].name = null

export function getAd (id) {
  let data = db.entries[id]
  return delay(`getAd #${id}`, null, data, false, 500)
}

export function updateAd (id, params) {
  return delay(`updateAd #${id}`, params, {}, false, 500)
}

export function addAd (params) {
  return delay('addAd', params, {}, false, 500)
}

export function updateAdFields (params) {
  if (_.find(params.objects, e => e.priority === 60)) {
    return delay(
      'updateAdFields',
      params,
      '操作失败',
      true,
      500
    )
  }

  return delay(
    'updateAdFields',
    params,
    {},
    false,
    2000
  )
}

export function getAdList (params) {
  params = _.defaults(params, {
    offset: 0,
    limit: 10
  })

  const data = {
    meta: {
      total_count: db.ids.length,
      limit: params.limit,
      offset: params.offset
    },
    objects: _.map(_.slice(db.ids, params.offset, params.offset + params.limit), id => db.entries[id])
  }

  return delay(
    'getAdList',
    params,
    data,
    false,
    500
  )
}
