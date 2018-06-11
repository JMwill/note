/* eslint-disable */
import { delay } from './utils'
import _ from 'lodash'

const itemCount = 1000
const limit = 20
const status = [
  'pending_release', // 待发布
  'pending_approval', // 待确认
  'pending_invoice', // 待收发票
  'pending_payment', //待打款
  'paid', // 已结款
]
let data =
_.range(1, itemCount)
 .map((item, index) => ({
    "id": index,
    "supplier": "鱿鱼干" + index, // 供应商名称
    "income": _.random(itemCount, itemCount * 2), // 收入金额
    "refund_amount": _.random(itemCount, itemCount * 2), // 退款金额
    "payable_amount": _.random(itemCount, itemCount * 2), // 应付款
    "status": _.sample(status), // 款项状态，具体状态集
 }))

let meta = {
  "limit": limit,
  "next": ".../?limit=20&offset=20",
  "offset": 0,
  "previous": null,
  "total_count": _.floor(itemCount, limit)
}

export function getSupplierBillList(params) {
  let start = params ? params.offset || 0 : 0
  let end = start + limit
  return delay('get Supplier Bills', params, {
    meta,
    objects: _.slice(data, start, end),
  }, false, 500)
}

export function downloadBill(id) {
  return delay(`download Bill #${id}`, null, {
    download_link: 'http://at.alicdn.com/t/font_336326_sx82sjciawmcayvi.ttf'
  }, false, 500)
}

export function updateSupplierBillStatus(params) {
  _.forEach(params.id__in, id => {
    let d = data[id]
    d.status = params.status
    return d
  })
  return delay(`updateSupplier #${params.id__in}`, params, {}, false, 500)
}

export function paySupplierBill(id, params) {
  return delay(`pay supplier bill #id: ${id}`, params, {}, false, 500)
}

export function batchPaySupplierBill(formData) {
  return delay('batch pay supplier bill', formData, {}, false, 500)
}

export function downloadInvoice(params) {
  return delay('download invoice', params, {
    download_link: 'http://at.alicdn.com/t/font_336326_sx82sjciawmcayvi.ttf'
  }, false, 500)
}

// 供应商账单详情接口
let detailData =
  _.range(1, itemCount)
   .map((item, index) => ({
    orderid: index, // 订单编号
    serial_number: 56789765456789, // 序列号
    transaction_id: 678678678, // 支付订单号
    paid_at: 1234567899876, // 支付时间
    status: 'paid', // 交易状态
    product_id: 5676567865, // 商品ID
    product_title: '鱿鱼干', // 商品名称
    spec_str: '不知道', // 商品属性
    bar_code: 5678456786567, // 条码
    supplier_code: 567856867678678, // 供应商编码
    order_remark: '身份证', // 备注
    cost: 123, // 进价
    unit_price: 145, // 商品单价
    quantity: 12334, // 购买数量
    wechat_coupon_amount: 123213, // 微信代金券
    item_amount: 12321312, // 总金额
    final_amount: 123123123123,  // 实际收入
   }))
export function getSupplierBill(id) {
  let bill = data[id]
  return delay(`supplier bill #${id}`, null, Object.assign({}, bill, {
    "valid_from": 3456789,
    "valid_until": 3456789,
  }), false, 500)
}

export function getSupplierBillSummary(id, params) {
  let start = params ? params.offset : 0
  let end = start + params.limit || limit
  return delay(`supplier bill #${id}`, null, {
    meta,
    objects: _.slice(detailData, start, end),
  }, false, 500)
}

export function getSupplierBillDetail(id, params) {
  let start = params ? params.offset : 0
  let end = start + params.limit || limit
  return delay(`supplier bill #${id}`, null, {
    meta,
    objects: _.slice(detailData, start, end),
  }, false, 500)
}
