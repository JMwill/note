/* eslint-disable */
import { delay } from './utils'

let first = true

export function getWechatPay () {
  if (!first) {
    var data = {
      mch_id: 'xxxxxxx',
      mch_key: '**************'
      // pkcs12_file: 'base64',
    }
    return delay('getWechatPay', null, data, false, 500)
  }
  first = false
  return delay('getWechatPay', null, { status: 404 }, true, 500)
}

export function updateWechatPay (params) {
  return delay('updateWechatPay', params, null, false, 500)
  // return delay('updateWechatPay', params, '商户与证书信息不符合', true, 500);
}
