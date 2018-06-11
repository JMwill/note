/* eslint-disable */
import { delay } from './utils'
import _ from 'lodash'

const db = {
  entries: {},
  ids: []
}

for (let i = 100; i >= 1; i--) {
  db.entries[i] = {
    name: '分类#' + i,
    summary: '描述#' + i,
    cover_image: 'http://canton-assets.ifanrusercontent.com/media/user_files/canton/29/fd/29fd84800e95936f4cd5e78fdd7ab9ce06b7e7eb-75d633836805ba1e0386693d5624cb90b4b44bd8.jpg',
    background_image: 'http://canton-assets.ifanrusercontent.com/media/user_files/canton/db/37/db37a21bd3db219b91eae832906e6ff59ab8afa3-c8ef534024153badca109385f35a15fde5c6a328.jpg',

    status: i % 2 === 0 ? 'active' : 'inactive',
    priority: i,
    shelf_count: i,
    id: i,
    resource_uri: '/api/shelf-category/' + i,

    'campaign_banner': {
      'name': '', // 广告名称
      'image': 'http://canton-assets.ifanrusercontent.com/media/user_files/canton/29/fd/29fd84800e95936f4cd5e78fdd7ab9ce06b7e7eb-75d633836805ba1e0386693d5624cb90b4b44bd8.jpg',
      'target_id': 557, // 商品或货架 ID
      'target_name': 'iPhone',
      'target_type': 'product',
      'target_url': null // 玩物志专用外链
    }
  }
  db.ids.push(i)
}

db.entries[100].status = 'inactive'
db.entries[100].shelf_count = 0

export function getShelfCategory (id) {
  let data = db.entries[id]
  return delay(`getShelfCategory #${id}`, null, data, false, 500)
}

export function updateShelfCategory (id, params) {
  return delay(`updateShelfCategory #${id}`, params, {}, false, 500)
}

export function addShelfCategory (params) {
  return delay('addShelfCategory', params, {}, false, 500)
}

export function updateShelfCategoryFields (params) {
  if (_.find(params.objects, e => e.priority === 60)) {
    return delay(
      'updateShelfCategoryFields',
      params,
      '操作失败',
      true,
      500
    )
  }

  return delay(
    'updateShelfCategoryFields',
    params,
    {},
    false,
    2000
  )
}

export function getShelfCategoryList (params) {
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
    'getShelfCategoryList',
    params,
    data,
    false,
    500
  )
}

export function updateBatchShelf (id, params) {
  return delay(
    `updateBatchShelf #${id}`,
    params,
    {},
    false,
    200
  )
}
