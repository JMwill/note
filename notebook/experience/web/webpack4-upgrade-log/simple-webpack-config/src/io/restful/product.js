import utils from './utils'

export function getProductList(params) {
  return utils.list('product/', params)
}

export function exportProductList(params) {
  if (params.product_ids) {
    params.product_ids = params.product_ids.join(',')
  }
  return utils.getView('product/export/data/', params)
}

export function updateProductStock(id, params) {
  return utils.put(`product/${id}/productsku/`, params)
}

export function updateProductStatus(id, params) {
  return utils.put(`product/${id}/`, params)
}

export function getProduct(id) {
  return utils.get(`product/${id}/`)
}

export function addProduct(params) {
  return utils.post('product/', params)
}

export function updateProduct(id, params) {
  return utils.put(`product/${id}/`, params)
}

export function addSpec(params) {
  return utils.post('spec/', params)
}

export function updateSpec(id, params) {
  return utils.put(`spec/${id}/`, params)
}

export function updateSpecFields(id, params) {
  return utils.patch(`spec/${id}/`, params)
}

export function updateProductFields(params) {
  return utils.patch('product/', params)
}
