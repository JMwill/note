/* eslint-disable */
import { delay } from './utils'

export function getRefund (id) {
  let data = {
    "id": 1,
    "orderitem_id": 1,
    "status": "pending_review",
    "created_at": 1494556988,
    "refund_amount": 99,
    "refund_type": "refund_only",
    "description": "七天无理由退换货七天无理由退换货七天无理由退换货七天无理由退换货七天无理由退换货七天无理由退换货七天无理由退换货七天无理由退换货七天无理由退换货",
    "images": [
      "http://canton-assets.ifanrusercontent.com/media/user_files/canton/84/59/8459c1b9a58b970822805765e3b791749b34da47-accf102caaa970ce65d217b9ae9a8e9a57caa67c.jpg",
      "http://canton-assets.ifanrusercontent.com/media/user_files/canton/f7/1b/f71be4ceb427f516e76c8ea59fbbb7b43ec73456-6896a8696b8038f4fc8989ab005e4fccc3b90047.jpg",
      "http://canton-assets.ifanrusercontent.com/media/user_files/canton/85/a2/85a24809145b10a6aed771553f9da63589094877-accf102caaa970ce65d217b9ae9a8e9a57caa67c.jpg"
    ],
    "waybill_number": "222222222",

    "ship_carrier": {
      "value": "ems",
      "display_name": "EMS"
    }
  }

  data.orderid = '0202020202020'
  return delay(
    `getRefund #${id}`,
    {},
    data,
    false,
    1000
  )
}

export function updateRefundStatus (id, params) {
  // return delay(`updateProductStatus #${id}`, params, '系统繁忙', true, 2000);
  return delay(`updateRefundStatus #${id}`, params, {}, false, 2000)
}

export function getRefundList (params) {
  let data = {
    meta: {
      previous: null,
      total_count: 10000,
      offset: 0,
      limit: 20,
      next: null
    },
    objects: []
  }

  for (let i = 1; i <= 20; i++) {
    data.objects.push({
      gift_order: null,
      sales_mode: 'consignment',
      cover_image: 'http://canton-assets.ifanrusercontent.com/media/user_files/canton/23/fa/23fa46fd4e3f076ba5d203fd0892d7cd3390ab8b-c7c2d6650fe8dd3125b1541cb39af56649bd56fa.jpg',
      created_at: 1494556988,
      description: null,
      id: i,
      images: [
        'http://canton-assets.ifanrusercontent.com/media/user_files/canton/84/59/8459c1b9a58b970822805765e3b791749b34da47-accf102caaa970ce65d217b9ae9a8e9a57caa67c.jpg',
        'http://canton-assets.ifanrusercontent.com/media/user_files/canton/f7/1b/f71be4ceb427f516e76c8ea59fbbb7b43ec73456-6896a8696b8038f4fc8989ab005e4fccc3b90047.jpg',
        'http://canton-assets.ifanrusercontent.com/media/user_files/canton/85/a2/85a24809145b10a6aed771553f9da63589094877-accf102caaa970ce65d217b9ae9a8e9a57caa67c.jpg'
      ],
      orderid: '2000000000001',
      serial_number: '0001-1',
      spec_str: '规格:小逗罐,款式:白+红',
      title: '逗豆糖果罐测试#1',
      refund_type: 'refund_only',

      contact_info: {
        contact: '张三',
        phone: '13294435043'
      },
      status: 'pending_review',
      refund_amount: 6.25,
      final_cost: 99.99,
      shipping_rate: 9.99,
      product_type: 'physical'
    })
  }

  data.objects[1].status = 'approved'
  data.objects[1].refund_type = 'return'
  data.objects[1].description = '这里是申请说明'

  data.objects[2].gift_order = {}
  data.objects[2].status = 'item_received'

  data.objects[3].status = 'refund_issued'

  data.objects[4].status = 'refund_failure'

  data.objects[5].status = 'denied'

  return delay('getRefundList', params, data, false, 500)
}

export function addRefundMemo (id, params) {
  return delay(
    `addRefundMemo #${id}`,
    params,
    {
      status: 'pending_review',
      created_at: 1495590186,
      content: params.content
    },
    false,
    500
  )
}

export function getRefundMemoList(id, params) {
  let data = {
    meta: {
      previous: null,
      total_count: 50,
      offset: 0,
      limit: 20,
      next: null
    },
    objects: []
  }

  if (id != 999999) {
    for (let i = 1; i <= 10; i++) {
      data.objects.push({
        status: 'pending_review',
        created_at: 1495590186,
        content: '这是当时的备注' + i
      })
    }
  }

  return delay(
    `getOrderMemoList #${id}`,
    params,
    data,
    false,
    500
  )
}
