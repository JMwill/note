import utils from './utils'

export function getShelfCategory(id) {
  return utils.get(`shelf-category/${id}/`)
}

export function updateShelfCategory(id, params) {
  return utils.put(`shelf-category/${id}/`, params)
}

export function addShelfCategory(params) {
  return utils.post('shelf-category/', params)
}

export function updateShelfCategoryFields(params) {
  return utils.patch('shelf-category/', params)
}

export function getShelfCategoryList(params) {
  params.order_by = params.order_by || '-priority'
  return utils.list('shelf-category/', params)
}

export function updateBatchShelf(id, params) {
  return utils.put(`shelf-category/${id}/shelf/`, params)
}
