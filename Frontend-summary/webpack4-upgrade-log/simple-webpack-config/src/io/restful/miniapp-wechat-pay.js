import utils from './utils'

export function getWechatPay() {
  return utils.get('wechat/pay/config/', null, 'dserve')
}

export function updateWechatPay(params) {
  return utils.post('wechat/pay/config/', params, 'dserve')
}
