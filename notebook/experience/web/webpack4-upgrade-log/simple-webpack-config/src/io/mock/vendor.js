/* eslint-disable */
import { delay } from './utils'

let data = {
  "meta": {
    "previous": "null",
    "total_count": 100,
    "offset": 0,
    "limit": 10,
    "next": "null"
  },
  "objects": [
    {
      "supplier": {
        "name": "［万魔熊］加一联创电子科技有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/f2/d5/f2d503d49d9e948e59de04695ed65d919e1b9951-562843205b6accb15246f55156614fa585456848.jpg",
      "merchandise_count": 500,
      "id": 1,
      "name": "玩物志"
    },
    {
      "supplier": {
        "name": "［比格花果］无锡格瑞斯福贸易有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/4e/8a/4e8aa4e805b71929087c7217b6375f4b1a4ca806-8c67ab04c414f43ab9ac22b9e98c1393112b7b9d.jpg",
      "merchandise_count": 500,
      "id": 2,
      "name": "LG"
    },
    {
      "supplier": {
        "name": "宁波波英电子有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/4c/e7/4ce7f0215c403b19e76cf570b85b8ea51b0ca3c8-dcf1764849f2a2e14048230bfe8c75ac4c355097.jpg",
      "merchandise_count": 500,
      "id": 3,
      "name": "Toast Living"
    },
    {
      "supplier": {
        "name": "［微花园］深圳市五鑫科技有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/7f/39/7f39942ddc7778045d5e5acdb292cd61f265287f-81c27284f77a447375ba39fb2f0005eeaccf28d8.jpg",
      "merchandise_count": 500,
      "id": 4,
      "name": "哇物wowu"
    },
    {
      "supplier": {
        "name": "［美妙乐事］广州积极生活贸易有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/b1/cc/b1ccd6c56e567598d4720780ead599f6a4e39b5a-ce16fbebfb938331793aaf4857ddf593cf0efd9b.jpg",
      "merchandise_count": 500,
      "id": 5,
      "name": "Mantra"
    },
    {
      "supplier": {
        "name": "东莞市朗臣贸易有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/2f/4b/2f4bd3494e899966b2f981860d613a7ba9345267-8885269f64f60076b05e134da6bda91c039ec9f9.jpg",
      "merchandise_count": 500,
      "id": 6,
      "name": "Daniel Wellington"
    },
    {
      "supplier": {
        "name": "［toast]北京水乐文化传播有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/45/d4/45d4955092d14d844349b8667a1c77fcd710942c-1f50826eb97557267e9bf48728c9874810833481.jpg",
      "merchandise_count": 500,
      "id": 7,
      "name": "Dienastie"
    },
    {
      "supplier": {
        "name": "深圳市欧拉空间科技有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/6d/07/6d07c43a0693e53e0acd34b3572e98d4c534f174-05e1588fe1b812963eb4182ef02eb8a85fc102fc.jpg",
      "merchandise_count": 500,
      "id": 8,
      "name": "斗禾科技"
    },
    {
      "supplier": {
        "name": "［modgen］广东摩隼科技有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/61/8a/618a682bcfcd05e028505d5e8e9990fabb9efb28-0a31051e5db445c29c2b26bbd79415cdd09c9867.jpg",
      "merchandise_count": 500,
      "id": 9,
      "name": "#ONE"
    },
    {
      "supplier": {
        "name": "［wowstick］苏州哇喔商贸有限公司"
      },
      "logo": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/b8/10/b810987c89516a427d13a24d9f3952f74df7a5f3-9a870496dba9dde1da8c8a5e748366b26e889b3b.jpg",
      "merchandise_count": 500,
      "id": 10,
      "name": "Tivoli Audio 流金岁月"
    }
  ]
}


data.objects[0].merchandise_count = 0
data.objects[1].merchandise_count = 0

export function getVendor (id) {
  const params = data.objects[0]
  params.description = '简介#1'
  return delay(`getVendor #${id}`, null, data.objects[0], false, 500)
}

export function updateVendor (id, params) {
  return delay(`updateVendor #${id}`, params, {}, false, 500)
}

export function addVendor (params) {
  return delay('addVendor', params, {}, false, 500)
}

export function updateVendorFields (params) {
  return delay(
    'updateVendorFields',
    params,
    {},
    false,
    2000
  )
}

export function getVendorList (params) {
  return delay(
    'getVendorList',
    params,
    data,
    false,
    500
  )
}
