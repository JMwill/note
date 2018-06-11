import utils from './utils'

export function getAdList(params) {
  params.order_by = '-priority'
  return utils.list('campaign-banner/', params)
}

export function updateAdFields(params) {
  return utils.patch('campaign-banner/', params)
}

export function addAd(params) {
  return utils.post('campaign-banner/', params)
}

export function updateAd(id, params) {
  return utils.put(`campaign-banner/${id}/`, params)
}

export function getAd(id) {
  return utils.get(`campaign-banner/${id}/`)
}
