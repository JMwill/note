import utils from './utils'

export function createPaymentPlan(params) {
  return utils.post('payment-plan/', params)
}

export function getWechatPaymentUrl(id) {
  return utils.get(`payment/${id}/`, {}, 'pepe')
}
