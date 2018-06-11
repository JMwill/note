import utils from './utils'

export function getActivity(id) {
  return utils.get(`activity/${id}/`)
}

export function updateActivity(id, params) {
  return utils.put(`activity/${id}/`, params)
}

export function addActivity(params) {
  return utils.post('activity/', params)
}

export function updateActivityField(id, params) {
  return utils.patch(`activity/${id}/`, params)
}

export function getActivityList(params) {
  return utils.list('activity/', params)
}

export function removeActivityProduct(id, productId) {
  return utils.delete(`activity/${id}/product/${productId}/`)
}

export function removeActivitySKU(id, skuId) {
  return utils.delete(`activity/${id}/sku/${skuId}/`)
}

export function addActivityProduct(id, params) {
  return utils.post(`activity/${id}/product/`, params)
}

export function removeActivity(id) {
  return utils.delete(`activity/${id}/`)
}

export function validActivitySku(params) {
  const newParams = {
    activity_id: params.activity_id,
    sku_id__in: params.sku_id__in.join(','),
  }
  return utils.get('activity-sku/validation/', newParams)
}

export function validActivityProduct(params) {
  const newParams = {
    activity_id: params.activity_id,
    product_id__in: params.product_id__in.join(','),
  }
  return utils.get('activity-product/validation/', newParams)
}
