/* eslint-disable */
import { delay } from './utils'
import _ from 'lodash'

const db = {
  entries: {},
  ids: []
}

const json = {
    "meta": {
      "previous": "null",
      "total_count": 100,
      "offset": 0,
      "limit": 10,
      "next": "null"
    },
    "objects": [
      {
        "status": "active",
        "name": "520 送礼精选",
        "priority": 1,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/79/a1/79a12d4eb7c884d99b9036fe36eb95e6b5af0c7a-da3728e453b43b42a7b0d675143e51850ee87d45.jpg",
        "id": 1
      },
      {
        "status": "active",
        "name": "给妈妈的礼物",
        "priority": 2,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/c7/78/c7786be5d8e744b2d139909f11befb2638aa8dec-a1bf1b94ec28b35bba9e014da138ea4d8f853720.jpg",
        "id": 2
      },
      {
        "status": "active",
        "name": "酷黑科技",
        "priority": 3,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/b4/59/b4597d929a13a7095adb11a0337edc31ee178b61-1158340b09f81fb4e0c20bfb234d36515569d3ee.jpg",
        "id": 3
      },
      {
        "status": "active",
        "name": "家居生活",
        "priority": 4,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/80/17/8017fb9455cf81c498aa3f5296c5291944854000-9f4ec58930137969cf7d6e9b90663f5e9be78983.jpg",
        "id": 4
      },
      {
        "status": "active",
        "name": "服饰配件",
        "priority": 5,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/a5/86/a5866fa8a1bdd4f17a817f86d5ae2dab61c608be-7e12f97d150ee7d00ebee5c89ddea92f605d596e.jpg",
        "id": 5
      },
      {
        "status": "active",
        "name": "包治百病",
        "priority": 6,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/dd/cd/ddcd1343f0836d459cfb3c8e4955f43a9b8f3862-a0c7f8d77ad54930a8f1a1e163e50fe3038a86ac.jpg",
        "id": 6
      },
      {
        "status": "active",
        "name": "数码家电",
        "priority": 7,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/87/10/8710f18b67f64b39f538bb01f069f1d57038cb06-af0f5d6b1fc2632fdf609b78205de2e854379260.jpg",
        "id": 7
      },
      {
        "status": "active",
        "name": "健康护理",
        "priority": 8,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/e1/ec/e1ec4a9e3efcb360744d9b355cb7fdb4a46a6bd2-118cac65503091954105e140766b59d30f74e7e9.jpg",
        "id": 8
      },
      {
        "status": "active",
        "name": "吃货最爱",
        "priority": 9,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/11/68/116845497ac3202c26a4b9243fbea719568c1c31-0e6de7822b07bb474992cb22af6faa0a3b30d449.jpg",
        "id": 9
      },
      {
        "status": "active",
        "name": "办公文具",
        "priority": 10,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/f9/17/f917a32b4f4398d17458ef6837a854d91ecd811e-9d848b6610d24131b77709ae9ecb524899a7e7cb.jpg",
        "id": 10
      },
      {
        "status": "active",
        "name": "旅行户外",
        "priority": 11,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/f7/e8/f7e819c230705802732a53f72a64814d3b23af03-2b57bb598863d13f27d707f8c6b014351155b476.jpg",
        "id": 11
      },
      {
        "status": "active",
        "name": "汽车用品",
        "priority": 12,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/db/92/db927fe76d9ec433a9430e778b57becb1115357a-fa0e0154a0577e0e7f514d9c48754d0acc1aa266.jpg",
        "id": 12
      },
      {
        "status": "active",
        "name": "解忧杂货",
        "priority": 13,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/fd/f2/fdf2917806f6d1e8c33f0ec195af6e334ba5f687-7c2ddd613dfaa2284a0d083bd2c4ae2a564fee8a.jpg",
        "id": 13
      },
      {
        "status": "active",
        "name": "假期出行",
        "priority": 14,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/7f/0b/7f0b05cbb44225b909092cc399e28f4397e910fb-4fc0dcbef3557d10e6a93a539754c3f830acff3d.jpg",
        "id": 14
      },
      {
        "status": "active",
        "name": "设计至上",
        "priority": 15,
        "merchandise_count": 999,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/ec/9f/ec9fbba192f6093e0fd00065b2837645eec5a654-438cef5b0fe82e6643edcaa2e7f649648eb2e7f7.jpg",
        "id": 15
      }
    ]
  }


for (let i = 100; i >= 1; i--) {
  const current = json.objects[i % 10]
  db.entries[i] = {
    ...current,
    name: '货架#' + i,
    shelf_type: 'normal',
    status: i % 2 === 0 ? 'active' : 'inactive',
    priority: i,
    merchandise_count: i,
    id: i,
    resource_uri: '/api/shelf/' + i,
    header_image: 'http://canton-assets.ifanrusercontent.com/media/user_files/canton/db/37/db37a21bd3db219b91eae832906e6ff59ab8afa3-c8ef534024153badca109385f35a15fde5c6a328.jpg',
    display_coupon_sequences: [1, 2, 3],
    category: [{id: 1, name: '货架分类#666'}, {id: 2, name: '货架分类#777'}],
    discount_weekly: false
  }
  db.ids.push(i)
}

db.entries[100].shelf_type = 'activity'
db.entries[100].status = 'inactive'
db.entries[99].shelf_type = 'normal'
db.entries[99].merchandise_count = 0
db.entries[98].shelf_type = 'vendor'

export function getShelf (id) {
  let data = db.entries[id]
  data.background_image = data.cover_image
  data.description = '<h1>货架描述</h1>'
  data.english_name = 'english_name'
  return delay(`getShelf #${id}`, null, data, false, 500)
}

export function updateShelf (id, params) {
  return delay(`updateShelf #${id}`, params, {}, false, 500)
}

export function addShelf (params) {
  return delay('addShelf', params, {}, false, 500)
}

export function updateShelfFields (params) {
  if (_.find(params.objects, e => e.priority === 60)) {
    return delay(
      'updateShelfFields',
      params,
      '操作失败',
      true,
      500
    )
  }

  return delay(
    'updateShelfFields',
    params,
    {},
    false,
    2000
  )
}

export function getShelfList (params) {
  params = _.defaults(params, {
    offset: 0,
    limit: 10
  })

  const data = {
    meta: {
      total_count: db.ids.length,
      limit: params.limit,
      offset: params.offset
    },
    objects: _.map(_.slice(db.ids, params.offset, params.offset + params.limit), id => db.entries[id])
  }

  return delay(
    'getShelfList',
    params,
    data,
    false,
    500
  )
}

export function updateShelfProduct (id, params) {
  return delay(`updateShelfProduct #${id}`, params, {}, false, 500)
}
