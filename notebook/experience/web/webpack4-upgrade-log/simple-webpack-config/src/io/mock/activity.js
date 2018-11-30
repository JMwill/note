/* eslint-disable */
import { delay } from './utils'

const data = []
const map = {}
const ids = []
let id_count = 1
let sku = [{
  id: 1, // SKU ID
  inventory: 666, // 库存/秒杀库存
  original_discount_price: 1.00, // 原价
  discount_price: 0.5, // 折后价/秒杀价
  unit_cost: 0.1, // 进价
  purchase_limit: 0, // 每人限购
  spec_str: '颜色:蓝色,大小:大',
  captain_price: 9,
  sold_count: 1,
}, {
  id: 2, // SKU ID
  inventory: 333, // 库存/秒杀库存
  original_discount_price: 99.99, // 原价
  discount_price: 9.99, // 折后价/秒杀价
  unit_cost: 9, // 进价
  purchase_limit: 100, // 每人限购
  spec_str: '颜色:蓝色,大小:小',
  captain_price: 6,
  sold_count: 2,
}]

for (let i = 0; i < 100; i++) {
  const act = {
    title: '活动x',
    merchandise_count: i,
    valid_from: Math.floor((new Date().getTime() - 24 * 60 * 60 * 1000) / 1000),
    valid_until: Math.floor((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000),
    status: i % 2 === 0 ? 'started' : 'initial',
    enabled: i % 2 === 0,
    product: [{
      id: i + 1,
      title: '商品' + i,
      sku: sku
    }],
    group_buying_user_count: 2,
    simulate_group_buying_user_count: 0,
    captain_offer: false,
  }
  addAct(act)
}

function addAct (obj) {
  ids.push(id_count)
  obj.id = id_count
  obj.title = `活动${id_count}`
  if (obj.status == null) {
    obj.status = 0
  }
  if (obj.enabled == null) {
    obj.enabled = false
  }
  data.push(obj)
  map[obj.id] = obj
  id_count++
}

export function getActivity (id) {
  const result = map[id]
  result.product = result.product.map(p => ({ ...p, title: p.title + ' ' + new Date().getTime() }))

  if (id == 1) {
    result.activity_type = 'instant_deal'
    result.captain_offer = false
  } else if (id == 2) {
    result.activity_type = 'sales'
    result.captain_offer = false
  } else if (id == 3) {
    result.activity_type = 'group_buying'
    result.group_buying_user_count = 4
    result.simulate_group_buying_user_count = 2
    result.captain_offer = true
  } else if (id == 4) {
    result.activity_type = 'group_buying'
    result.group_buying_user_count = 4
    result.simulate_group_buying_user_count = 0
    result.captain_offer = false
  }


  return delay(`getActivity #${id}`, null, result, false, 500)
}

export function updateActivity (id, params) {
  map[id] = {
    ...map[id],
    ...params
  }
  return delay(`updateActivity #${id}`, params, map[id], false, 500)
}

export function addActivity (params) {
  const result = {
    ...params,
    status: 'inactive'
  }
  addAct(result)
  return delay('addActivity', params, { id: 2 }, false, 500)
}

export function updateActivityField (id, params) {
  return delay(
    `updateActivityField #${id}`,
    params,
    {},
    false,
    500
  )
}

export function getActivityList (params) {
  params = _.defaults(params, {
    offset: 0,
    limit: 10
  })

  const result = {
    meta: {
      total_count: ids.length,
      limit: params.limit,
      offset: params.offset
    },
    objects: _.map(_.slice(ids, params.offset, params.offset + params.limit), id => map[id])
  }

  return delay(
    'getActivityList',
    params,
    result,
    false,
    500
  )
}

export function removeActivitySKU (id, params) {
  return delay(
    `removeActivitySKU #${id}`,
    params,
    null,
    false,
    500
  )
}

export function addActivityProduct (id, params) {
  return delay(
    `addActivityProduct #${id}`,
    params,
    null,
    false,
    500
  )
}

export function removeActivity (id) {
  return delay(
    `removeActivity #${id}`,
    null,
    null,
    false,
    500
  )
}

export function validActivitySku(params) {
  return delay(
    'validActivitySku',
    params,
    {
      '1': false,
    },
    false,
    500
  )
}
