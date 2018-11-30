import utils from './utils'

export function getVendorList(params) {
  return utils.list('vendor/', params)
}

export function updateVendorFields(params) {
  return utils.patch('vendor/', params)
}

export function updateVendorField(id, params) {
  return utils.patch(`vendor/${id}/`, params)
}

export function addVendor(params) {
  return utils.post('vendor/', params)
}

export function updateVendor(id, params) {
  return utils.put(`vendor/${id}/`, params)
}

export function getVendor(id) {
  return utils.get(`vendor/${id}/`)
}
