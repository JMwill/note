/* eslint-disable */
import { delay } from './utils'

let data = [
]
for (var i = 1; i < 21; i++) {
  data.push({
    id: i,
    name: '供应商名称' + i,
    description: '供应商描述' + i,
    phone: '15219191929',
    merchandise_count: i,
    resource_uri: 'api/xxxx/' + i,
    code: 'xxxxx' + i,
    email: 'a@a.com',
    cnaps_code: '12345678765432',
    bank: '中国银行',
    account_number: '454478765434567',
  })
}

data[0].merchandise_count = 0

export function getSupplier (id) {
  return delay(`getSupplier #${id}`, null, data[id], false, 500)
}

export function updateSupplier (id, params) {
  return delay(`updateSupplier #${id}`, params, {}, false, 500)
}

export function addSupplier (params) {
  return delay('addSupplier', params, {}, false, 500)
}

export function updateSupplierFields (params) {
  return delay(
    'updateSupplierFields',
    params,
    {},
    false,
    500
  )
}

export function updateSupplierField(params) {
  console.log(params)
  return delay(
    'updateSupplierField',
    params,
    {},
    false,
    500
  )
}

export function getSupplierList (params) {
  return delay(
    'getSupplierList',
    params,
    {
      meta: {
        previous: null,
        total_count: 40,
        offset: 0,
        limit: 20,
        next: null
      },
      objects: data
    },
    false,
    500
  )
}
