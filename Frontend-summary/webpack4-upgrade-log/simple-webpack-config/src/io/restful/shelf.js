import utils from './utils'

export function getShelfList(params) {
  params.order_by = params.order_by || '-priority'
  return utils.list('shelf/', params)
}

export function updateShelfFields(params) {
  return utils.patch('shelf/', params)
}

export function addShelf(params) {
  return utils.post('shelf/', params)
}

export function updateShelf(id, params) {
  return utils.put(`shelf/${id}/`, params)
}

export function getShelf(id) {
  return utils.get(`shelf/${id}/`)
}

export function updateShelfProduct(id, params) {
  return utils.patch(`shelf/${id}/`, params)
}
