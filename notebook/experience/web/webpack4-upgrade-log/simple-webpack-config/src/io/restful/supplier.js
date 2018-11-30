import utils from './utils'

export function getSupplierList(params) {
  return utils.list('supplier/', params)
}

export function updateSupplierFields(params) {
  return utils.patch('supplier/', params)
}

export function updateSupplierField(id, params) {
  return utils.patch(`supplier/${id}/`, params)
}

export function addSupplier(params) {
  return utils.post('supplier/', params)
}

export function updateSupplier(id, params) {
  return utils.put(`supplier/${id}/`, params)
}

export function getSupplier(id) {
  return utils.get(`supplier/${id}/`)
}
