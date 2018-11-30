import utils from './utils'

export function getOrderList(params) {
  return utils.list('order/', params)
}

export function exportOrderList(params) {
  if (params.orderitem_ids) {
    params.orderitem_ids = params.orderitem_ids.join(',')
  }
  return utils.getView('orderitem/export/', params)
}

export function shipOrder(id, params) {
  return utils.put(`orderitem/${id}/`, params)
}

export function getOrderMemoList(id, params) {
  return utils.list(`orderitem/${id}/memo/`, params)
}

export function addOrderMemo(id, params) {
  return utils.post(`orderitem/${id}/memo/`, params)
}

export function getOrder(id) {
  return utils.get(`orderitem/${id}/`)
}

export function shipBatch(params) {
  return utils.uploadFileView(params)
}
