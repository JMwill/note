/* eslint-disable */
import { delay } from './utils'

export function createPaymentPlan (params) {
  return delay('buy service plan', params, {'transaction_id': '123213123213'})
}

export function getWechatPaymentUrl() {
  return delay('wechat payment url', {}, {'topup_url': '132312.jpg'})
}
