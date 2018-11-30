/* eslint-disable */
import { delay } from './utils'

export function getOrder(id) {
  let data = {
    "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/23/fa/23fa46fd4e3f076ba5d203fd0892d7cd3390ab8b-c7c2d6650fe8dd3125b1541cb39af56649bd56fa.jpg",
    "final_cost": 99,
    "id": 1,
    "orderid": "2000000000001",
    "paid_at": 1492597368,
    "quantity": 10,
    "serial_number": "0001-1",
    "spec_str": "规格:小逗罐,款式:白+红",
    "status": "delivered",
    "title": "「wowu」逗豆糖果罐",
    "transaction_id": "00001",
    "unit_price": 9.9,
    "user_message": "我是买家留言",
    "waybill_number": "2394572015",

    "contact_info": {
      "contact": "张三",
      "phone": "13294435043",
      "address": "GuangDongGuangZhouHaiZhu5 Pinpai St, T.I.T Creative Industry Zone"
    },
    "ship_carrier": {
      "value": "ems",
      "display_name": "EMS"
    }
  }
  data.status = 'shipped'
  data.gift_order = {}

  data.user_message = '这里是用户留言'
  data.product_type = 'physical'
  data.memo = [{ display_name: '手机号码', value: '' }, { display_name: '身份证', value: '44992393939393939' }]

  if (String(id) === '9') {
    data.status = 'processing'
    data.waybill_number = ''
    data.ship_carrier = null
  }

  if (String(id) === '6') {
    data.product_type = 'virtual'
  }

  data.tracking_info = [{
    context: '哈尔滨分拨中心 ####1',
    time: '2017-05-01 12:00:00'
  }, {
    context: '北京分拨中心 ####1',
    time: '2017-04-01 12:00:00'
  }, {
    context: '上海分拨中心 ####1',
    time: '2017-03-01 12:00:00'
  }, {
    context: '广州分拨中心 ####1',
    time: '2017-02-01 12:00:00'
  }, {
    context: 'xxx分拨中心 ####1',
    time: '2017-01-01 12:00:00'
  }]

  return delay(
    `getOrder #${id}`, {},
    data,
    false,
    1000
  )
}

export function getOrderMemoList(id, params) {
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
        status: 'cancelled',
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

export function addOrderMemo(id, params) {
  return delay(
    `addOrderMemo #${id}`,
    params, {
      status: 'cancelled',
      created_at: 1495590186,
      content: params.content
    },
    false,
    500
  )
}

export function shipOrder(id, params) {
  if (id === 999) {
    return delay(`shipOrder #${id}`, params, '系统繁忙', true, 2000)
  }
  return delay(`shipOrder #${id}`, params, {}, false, 500)
}

export function getOrderList(params) {
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

  for (let i = 1; i <= 20; i++) {
    let order = {
      contact_info: {
        contact: '联系人' + i,
        phone: '1521926502' + i
      },
      final_cost: 109.99,
      id: 113292 + i,
      item: [],
      order_amount: 100,
      orderid: '200000001333' + i,
      shipping_rate: 9.99,
      created_at: 1510057066
    }
    order.item.push({
      gift_order: {},
      cover_image: 'https://media.ifanrusercontent.com/media/user_files/uploaded/c2/de/c2de265815e6167a4934c018023d7c1ff01909a7-8a5119003d976a3a694815aa7396f63224a7a1e3.jpg',
      final_cost: 9.9,
      id: 666 + i,
      quantity: 1,
      serial_number: '22222222' + i,
      spec_str: '颜色:红色,尺码:S码',
      status: 'initiated',
      unit_price: 9.9,
      user_message: '用用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言户留言',
      waybill_number: 'xxx-xxx-xx' + i,
      tracking_info: [{
        context: '上海分拨中心',
        time: '2017-01-01 12:00:00'
      }],
      product_type: 'virtual',
      memo: [{ display_name: '手机号码', value: '' }, { display_name: '身份证', value: '44992393939393939' }],
      refund_id: 0,
      title: '商品' + i
    })
    data.objects.push(order)
  }

  data.objects[0].contact_info = {
    contact: '微信昵称',
    phone: null
  }

  data.objects[1].item[0].user_message = null
  data.objects[1].item[0].memo = []

  data.objects[2].item[0].product_type = 'physical'
  data.objects[2].item[0].status = 'pending_redemption'
  data.objects[2].item.push({
    gift_order: null,
    cover_image: 'https://media.ifanrusercontent.com/media/user_files/uploaded/c2/de/c2de265815e6167a4934c018023d7c1ff01909a7-8a5119003d976a3a694815aa7396f63224a7a1e3.jpg',
    final_cost: 9.9,
    id: 666666,
    quantity: 1,
    serial_number: '333334444455555',
    spec_str: '颜色:红色,尺码:S码',
    status: 'processing',
    unit_price: 9.9,
    user_message: '用用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言用户留言户留言',
    waybill_number: 'xxx-xxx-xx76',
    tracking_info: [{
      context: '上海分拨中心',
      time: '2017-01-01 12:00:00'
    }],
    product_type: 'physical',
    memo: [{ display_name: '手机号码', value: '15291659938' }, { display_name: '身份证', value: '44992393939393939' }],
    refund_id: 0,
    title: '商品xxx'
  })
  data.objects[2].item.push({
    gift_order: null,
    cover_image: 'https://media.ifanrusercontent.com/media/user_files/uploaded/c2/de/c2de265815e6167a4934c018023d7c1ff01909a7-8a5119003d976a3a694815aa7396f63224a7a1e3.jpg',
    final_cost: 9.9,
    id: 7777777,
    quantity: 2,
    serial_number: '333334444455555',
    spec_str: '颜色:红色,尺码:S码',
    status: 'processing',
    unit_price: 9.9,
    user_message: null,
    waybill_number: 'xxx-xxx-xx76',
    tracking_info: [{
      context: '上海分拨中心',
      time: '2017-01-01 12:00:00'
    }],
    product_type: 'virtual',
    memo: [],
    refund_id: 666,
    title: '商品xxx'
  })

  return delay(
    'getOrderList',
    params,
    data,
    false,
    500
  )
}

export function exportOrderList(params) {
  return delay(
    'exportOrderList',
    params, {
      download_url: 'http://' + window.location.host + '/media/user_files/canton/products/Product-1dBCEiumEqZAJkyCMQYseImJtJYXnHle.xls'
    },
    false,
    2000
  )
}

export function shipBatch(params) {
  return delay(
    'shipBatch',
    params, {},
    false,
    1000
  )
}
