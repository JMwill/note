import utils from './utils'

export function getRefund(id) {
  return utils.get(`refund/${id}/`)
}

export function updateRefundStatus(id, params) {
  return utils.patch(`refund/${id}/`, params)
}

export function getRefundList(params) {
  return utils.list('refund/', params)
}

export function exportRefundList(params) {
  if (params.refund_ids) {
    params.refund_ids = params.refund_ids.join(',')
  }
  return utils.getView('refund/export/', params)
}

export function getRefundMemoList(id, params) {
  return utils.list(`refund/${id}/memo/`, params)
}

export function addRefundMemo(id, params) {
  return utils.post(`refund/${id}/memo/`, params)
}
