import utils from './utils'

export function getLogisticsList(params) {
  return utils.list('shipping-rate-schedule/', params)
}

export function updateLogistics(id, params) {
  return utils.put(`shipping-rate-schedule/${id}/`, params)
}

export function addLogistics(params) {
  return utils.post('shipping-rate-schedule/', params)
}

export function updateLogisticsStatus(id, params) {
  return utils.put(`shipping-rate-schedule/${id}/`, params)
}

export function getLogistics(id) {
  return utils.get(`shipping-rate-schedule/${id}/`)
}
