/* eslint-disable */
import { delay } from './utils'

const entries = {
  spec_id: 1,
  spec_value_id: 1,
  spec: {}
}

export function getProduct (id) {
  const product = {
    "status": "off_shelf",
    "free_shipping": false,
    "vendor": {
      "id": 10,
      "name": "Anker"
    },
    "supplier": {
      "id": 10,
      "name": "Anker"
    },
    "description": "<p><span style=\"font-size: 14px;\">【品牌介绍】</span></p><p><span style=\"font-size: 14px;\"><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/ab/0f/ab0fc4b75406c9a4d1ccbbe6307c131fe89a6479-3da1514a2e69300e6686f1db75dffc23a4277a81.jpg\"/></span></p><p><span style=\"line-height: 1.6em; font-size: 14px;\">从进入中国市场的那一刻起，Anker便洞悉国人对移动充电科技的追求，致力于以技术同步、品质同源、服务同源的价值内涵，打造移动充电科技新基准，满足亿万国人的期待。</span></p><p><span style=\"font-size: 14px;\">【Anker - 六口桌面电站充电器】</span></p><ul class=\" list-paddingleft-2\" style=\"list-style-type: disc;\"><li><p><span style=\"color: rgb(255, 0, 0); font-size: 14px;\">一处输出，六口共享充电器，非移动电源。</span></p></li></ul><p><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/ab/3c/ab3ccf3f5adfe6a85692ea5f471f0f6d1bdcc0ad-baeeee1e2df82f4de92a130ee281e34aff674c99.jpg\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/70/f9/70f90eb503b8559c340233852cabcd26efc4543b-3924a60f03c74b175309d8b08c740c707f42cbef.jpg\" style=\"line-height: 1.6em;\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/03/82/0382268468c6374d0e452305a0bca90e77ea732a-ba5b91baa562493c3d5992e311e1cec09bfc33a1.jpg\" style=\"line-height: 1.6em;\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/58/f9/58f9568d1252fcabf0b54a0f95a10f273e35cad2-22ff2ec3b7e26942d218a4472e09b5750ba394dd.jpg\" style=\"line-height: 1.6em;\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/c3/e9/c3e9115285370ce7f39bb168f19a3bb17f128077-412920f34962b7ab9d359b2a33ac66070ecceea3.jpg\" style=\"line-height: 1.6em;\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/5a/3a/5a3ad6cc10b93bbd72717d498304d2c10b9c6766-12b263688b2c4220156a2fd18c5331bdc7b475d8.jpg\" style=\"line-height: 1.6em;\"/></p><ul class=\" list-paddingleft-2\" style=\"list-style-type: disc;\"><li><p><span style=\"font-size: 14px;\">分QC2.0和powerIQ两种充口。</span></p></li><li><p><span style=\"line-height: 22.4px; font-size: 14px; color: rgb(255, 0, 0);\">对于iPhone这类不支持快速技术充电的产品，Anker能提供产品所支持最大的充电电流，同时内置了Power IQ智能输出技术，全程保证充电稳定性。</span></p></li><li><p><span style=\"line-height: 22.4px; font-size: 14px;\">如想知道自己所使用的产品是否支持快充技术，请自行上产品官网查询。</span></p></li></ul><p><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/c8/5b/c85b928b6ae072960d371381e67f276672d0f31e-744acaa5a98f739085d49a9b483d84e6d3c7ffdd.jpg\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/32/66/32662db48883e57dee42cfed1077e429db952b6c-ca25757e94c826d8aaa60c44ec1af952f155f5b2.jpg\"/></p><p><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/77/ea/77ea4ba62d69d5cc65110bdb83375bf242c30e78-2e9abbaf4f476cbec8e815a8bb4664d581992071.jpg\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/a4/40/a4406f062ab65f96b3e59d0e29c16faa6ea6ca16-1ecc5909baaed462883a6627143861bd00155a1a.jpg\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/e9/fb/e9fb104633c983cd9e05e90cd35e032ca283efc4-b57331b9ab35016f394835c5ae598c139a614e45.jpg\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/73/0a/730a1905c5cdcaca67530207c99a40d626b1031d-46acb5e7e81c93de4c47bf7f52516f9c283b3092.jpg\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/a8/1f/a81f5dca4faeaf1ce5697b213948c0a6818ff12d-25c0c7c37217144263b09c847b6db193d68323c0.jpg\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/6d/e4/6de47f4ada9085479353fc0aaf993901a94a8c14-33138cab91efdf6976a61bf191d73b10d1cb1bfe.jpg\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/b1/7a/b17ac9f502059ebc2ae12d606c90fa4363ac0a91-9e031f452d0c04769c15c8f37807ca088f20aff8.jpg\" style=\"line-height: 1.6em;\"/></p><ul class=\" list-paddingleft-2\" style=\"list-style-type: disc;\"><li><p><span style=\"font-size: 14px;\">全世界兼用，走遍天下都不怕。</span><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/7e/b6/7eb664227ed69c6e3e852d7d9261534994dbadec-de83f00ad33e9e2e296f2afcb72dc5d055f2e6a1.jpg\" style=\"line-height: 1.6em;\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/bb/24/bb2426479e3ffd255487c0d25d0386331a05db06-65376d8b6d4f7e34300cf497fea6ef565a98b68b.jpg\" style=\"line-height: 1.6em;\"/></p></li><li><p><span style=\"line-height: 1.6em; font-size: 14px;\">18个月质保，只想给你更安心的使用。</span><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/04/53/0453cacee972159b48402747fefa09393bdde887-4ca32b33b043032b9260a00a18f7be7f02094e92.jpg\" style=\"line-height: 1.6em;\"/><img src=\"https://canton-assets.ifanrusercontent.com/media/user_files/canton/23/51/23510c4b2feab870aa025444528ff9d2ebff83e8-ed2ecbfdea1f23d9b06b30e2db8c381cf7e3ea00.jpg\" style=\"line-height: 1.6em;\"/></p></li></ul><p><span style=\"font-size: 14px; line-height: 1.6em;\">【产品参数】</span></p><p><span style=\"font-size: 14px;\">功率：60W*6口</span></p><p><span style=\"font-size: 14px;\">输入：100~240V-1.4A&nbsp;</span></p><p><span style=\"font-size: 14px;\">总输出：5V==12A&nbsp;</span></p><p><span style=\"font-size: 14px;\">QC2.0输出：5V==2.4A，9V==2A，12V==1.5A</span></p><p><span style=\"font-size: 14px;\">PowerIQ输出：5V==8.4A (单口max2.4A)</span></p><p><span style=\"font-size: 14px;\">尺寸：103*78*28mm</span></p><p><span style=\"font-size: 14px;\">颜色：白色</span></p><p><span style=\"font-size: 14px;\">重量：223g</span></p><p><span style=\"font-size: 14px;\"><br/></span></p><p><span style=\"font-size: 14px;\"></span></p><p><span style=\"color: rgb(255, 0, 0); font-size: 14px;\">*发货快递：圆通</span></p><ul class=\" list-paddingleft-2\" style=\"list-style-type: disc;\"><li><p><span style=\"font-size: 14px; line-height: 25.6px;\">由于产品是纸质包装，拆封后会影响二次销售，拆封后如不是因为质量问题，不参与七天无理由退货。</span><br/></p></li></ul><p><span style=\"font-size: 14px;\">*售前须知：</span></p><p><span style=\"font-size: 14px;\">· 由于厂商节假日正常休息，故节假日只接单，不发货，所有订单将会在工作日时间尽快安排发放；</span></p><p><span style=\"font-size: 14px;\">·售后受理时间为，工作日9:00-18:00</span></p><p><span style=\"font-size: 14px;\">· 关于色差</span></p><p><span style=\"font-size: 14px;\">本店所有产品图片均为厂商提供，由于各个显示器不同，会有少许色差，介意者慎拍！</span></p>",
    "title": "「Anker」QC2.0快充六口充电器",
    "all_specs": [
      {
        "spec_key_id": "1",
        "spec_key_name": "表带颜色",
        "spec_value_list": [
          {
            "spec_value_name": "红色",
            "spec_value_id": "1"
          },
          {
            "spec_value_name": "蓝色",
            "spec_value_id": "2"
          }
        ]
      },
      {
        "spec_key_id": "2",
        "spec_key_name": "尺寸",
        "spec_value_list": [
          {
            "spec_value_name": "S",
            "spec_value_id": "3"
          },
          {
            "spec_value_name": "M",
            "spec_value_id": "4"
          }
        ]
      }
    ],
    "summary": "一出输出，六口共享|功率稳定|国际通用|90道安全检测|18个月超长质保，这才是你想要的充电器。",
    "priority": 999,
    "images": [
      "http://canton-assets.ifanrusercontent.com/media/user_files/canton/a2/b6/a2b6de8b1f7e16d3e5e065a08b6075c94ad79c19-08fda0244b5397e030ee401fd2bea5b24f78a72b.jpg",
      "http://canton-assets.ifanrusercontent.com/media/user_files/canton/37/27/372730faa0176a67e8b758bfbb6832f9d6426e31-6896a8696b8038f4fc8989ab005e4fccc3b90047.jpg",
      "http://canton-assets.ifanrusercontent.com/media/user_files/canton/ef/9c/ef9ced50783384d2c5d5a2a9190d7c8bbfd45a49-fc9956ee2f4201e204a5532c68850c6715ed24e0.jpg"
    ],
    "skus": [
      {
        "original_price": "249.00",
        "bar_code": "GX151001100801D",
        "discount_price": "249.00",
        "spec_str": "",
        "sku_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/a2/b6/a2b6de8b1f7e16d3e5e065a08b6075c94ad79c19-08fda0244b5397e030ee401fd2bea5b24f78a72b.jpg",
        "inventory": 9,
        "supplier_code": null,
        "id": 36467,
        "spec_list": "1:2,2:3"
      }
    ],
    "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/fc/50/fc50a4c907f436d21bccdb50cb6b1245f009c5d3-fc9956ee2f4201e204a5532c68850c6715ed24e0.jpg",
    "attributes": [
      {
        "value": "60W*6口",
        "key": "功率"
      },
      {
        "value": "100~240V-1.4A ",
        "key": " 输入"
      },
      {
        "value": "5V==12A ",
        "key": "总输出"
      },
      {
        "value": "5V==2.4A，9V==2A，12V==1.5A",
        "key": " QC2.0输出"
      },
      {
        "value": "5V==8.4A (单口max2.4A)",
        "key": "PowerIQ输出"
      },
      {
        "value": "103*78*28mm",
        "key": " 尺寸"
      },
      {
        "value": "白色",
        "key": " 颜色"
      },
      {
        "value": "223g",
        "key": " 重量"
      }
    ],
    "model": "NIU B",
    "sales_mode": "consignment",
    "id": 2,
    "shelf": [
      { "id": 1 },
      { "id": 3 }
    ]
  }

  product.category = {
    id: 5,
    name: '二级#2-1',
    parent: 2
  }
  product.tags = {
    price: '价格标签#1'
  }

  product.shelf = [{
    id: 1,
    name: '普通货架#1',
    shelf_type: 'normal'
  }, {
    id: 2,
    name: '活动#1',
    shelf_type: 'activity'
  }, {
    id: 3,
    name: '品牌货架#1',
    shelf_type: 'vendor'
  }, {
    id: 4,
    name: '普通货架#2',
    shelf_type: 'normal'
  }]

  product.skus[0].id = 1
  product.skus[0].spec_list = '1:2,2:3'
  product.skus[0].spec_str = '表带颜色:蓝色,尺寸:S'
  product.skus[0].unit_cost = 0.25
  product.skus[0].weight = 0.001

  // product.shipping_rate = 0
  // product.shipping_rate_schedule = {
  //   id: 1,
  //   name: '测试模版',
  //   charge_type: 'weight',
  // }

  product.shipping_rate = 9.99
  product.shipping_rate_schedule = null

  product.memo_schema = [
    {
      display_name: '留言1',
      required: true,
      format: 'email'
    }
  ]

  return delay(`getProduct #${id}`, {}, product)
}

export function updateProduct (id, params) {
  return delay(`updateProduct #${id}`, params, {}, false, 500)
}

export function addProduct (params) {
  return delay('addProduct', params, {}, false, 500)
}

export function getProductList (params) {
  if (_.result(params, 'keyword.length') > 2) {
    return delay(
      'getProductList',
      params, {
        meta: {
          total_count: 0
        },
        objects: []
      },
      false,
      500
    )
  }

  if (_.result(params, 'offset') === 20) {
    return delay(
      'getProductList',
      params, {
        'meta': {
          'previous': 'null',
          'total_count': 50,
          'offset': 20,
          'limit': 20,
          'next': 'null'
        },
        objects: [{
          'id': 99999,
          'cover_image': 'http://canton-assets.ifanrusercontent.com/media/user_files/canton/db/37/db37a21bd3db219b91eae832906e6ff59ab8afa3-c8ef534024153badca109385f35a15fde5c6a328.jpg',
          'status': 'sold_out',
          'skus': [{
            'discount_price': 168.0,
            'spec_str': null,
            'spec_list': null,
            'sold_count': 335,
            'id': 181,
            'inventory': 0
          }],
          'title': '测试'
        }]
      },
      false,
      500
    )
  }

  const list = {
    "meta": {
      "previous": "null",
      "total_count": 100,
      "offset": 0,
      "limit": 20,
      "next": "null"
    },
    "objects": [
      {
        "id": 1,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/db/37/db37a21bd3db219b91eae832906e6ff59ab8afa3-c8ef534024153badca109385f35a15fde5c6a328.jpg",
        "status": "sold_out",
        "skus": [
          {
            "discount_price": 168.0,
            "spec_str": null,
            "spec_list": null,
            "sold_count": 335,
            "id": 181,
            "inventory": 0
          }
        ],
        "title": "一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五"
      },
      {
        "id": 2,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/6b/11/6b1182d62275839a42d4ad8507cd3e4f5f184857-fa68b362d4a9f6f459c9b293041d69e093f505d1.jpg",
        "status": "off_shelf",
        "skus": [
          {
            "discount_price": 1099.0,
            "spec_str": "颜色:银色",
            "spec_list": "905:2700",
            "sold_count": 397,
            "id": 821,
            "inventory": 500
          },
          {
            "discount_price": 1099.0,
            "spec_str": "颜色:蓝色",
            "spec_list": "905:2699",
            "sold_count": 112,
            "id": 821,
            "inventory": 500
          },
          {
            "discount_price": 1099.0,
            "spec_str": "颜色:黑色",
            "spec_list": "905:2698",
            "sold_count": 49,
            "id": 821,
            "inventory": 500
          }
        ],
        "title": "「LG」HBS-A100 环颈式高端蓝牙扬声器立体声耳机"
      },
      {
        "id": 3,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/c3/1a/c31af70b2acf4dc1b4dfc140816092c8eaa70c9a-52603672b5934cbfd888a816c0476164347ad72b.jpg",
        "status": "in_stock",
        "skus": [
          {
            "discount_price": 339.0,
            "spec_str": "款式:按压式鼻毛剪（礼盒装）",
            "spec_list": "1381:4044",
            "sold_count": 152,
            "id": 1225,
            "inventory": 500
          },
          {
            "discount_price": 339.0,
            "spec_str": "款式:旋转式鼻毛剪·尊悦",
            "spec_list": "1381:4045",
            "sold_count": 91,
            "id": 1225,
            "inventory": 500
          },
          {
            "discount_price": 339.0,
            "spec_str": "款式:旋转式鼻毛剪·尊悦（皮套装）",
            "spec_list": "1381:4046",
            "sold_count": 46,
            "id": 1225,
            "inventory": 500
          },
          {
            "discount_price": 339.0,
            "spec_str": "款式:旋转式鼻毛剪·至尊（皮套装）",
            "spec_list": "1381:4047",
            "sold_count": 349,
            "id": 1225,
            "inventory": 500
          },
          {
            "discount_price": 339.0,
            "spec_str": "款式:旋转式鼻毛剪",
            "spec_list": "1381:4042",
            "sold_count": 231,
            "id": 1225,
            "inventory": 500
          },
          {
            "discount_price": 339.0,
            "spec_str": "款式:旋转式鼻毛剪（皮套装）",
            "spec_list": "1381:4043",
            "sold_count": 18,
            "id": 1225,
            "inventory": 500
          }
        ],
        "title": "「 GROOM MATE 」格朗美鼻毛剪"
      },
      {
        "id": 4,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/a4/1e/a41e05a8552b36588a4406ac4b700deade768f58-ab2225dbede4a88b8bb2ee038bedc69c00f36d0e.jpg",
        "status": "in_stock",
        "skus": [
          {
            "discount_price": 188.0,
            "spec_str": "颜色:白色",
            "spec_list": "184:436",
            "sold_count": 40,
            "id": 189,
            "inventory": 500
          },
          {
            "discount_price": 188.0,
            "spec_str": "颜色:灰色",
            "spec_list": "184:437",
            "sold_count": 26,
            "id": 189,
            "inventory": 500
          },
          {
            "discount_price": 188.0,
            "spec_str": "颜色:灰/蓝",
            "spec_list": "184:438",
            "sold_count": 259,
            "id": 189,
            "inventory": 500
          },
          {
            "discount_price": 188.0,
            "spec_str": "颜色:灰/粉",
            "spec_list": "184:439",
            "sold_count": 368,
            "id": 189,
            "inventory": 500
          }
        ],
        "title": "「Toast Living」陶瓷木纹迷你杯组"
      },
      {
        "id": 5,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/52/52/5252aef729f3908b1a1b91f0fab772c1c2dc4ed6-3c6f5bb0959e8f423e51053cf6e1918f3dfbf32f.jpg",
        "status": "in_stock",
        "skus": [
          {
            "discount_price": 88.0,
            "spec_str": "规格:中逗罐,款式:白+青",
            "spec_list": "1352:3975,1351:3973",
            "sold_count": 13,
            "id": 1209,
            "inventory": 500
          },
          {
            "discount_price": 88.0,
            "spec_str": "规格:中逗罐,款式:白+红",
            "spec_list": "1352:3975,1351:3972",
            "sold_count": 286,
            "id": 1209,
            "inventory": 500
          },
          {
            "discount_price": 88.0,
            "spec_str": "规格:小逗罐,款式:白+青",
            "spec_list": "1352:3974,1351:3973",
            "sold_count": 226,
            "id": 1209,
            "inventory": 500
          },
          {
            "discount_price": 88.0,
            "spec_str": "规格:小逗罐,款式:白+红",
            "spec_list": "1352:3974,1351:3972",
            "sold_count": 371,
            "id": 1209,
            "inventory": 500
          },
          {
            "discount_price": 88.0,
            "spec_str": "规格:大逗罐,款式:白+青",
            "spec_list": "1352:3976,1351:3973",
            "sold_count": 105,
            "id": 1209,
            "inventory": 500
          },
          {
            "discount_price": 88.0,
            "spec_str": "规格:大逗罐,款式:白+红",
            "spec_list": "1352:3976,1351:3972",
            "sold_count": 353,
            "id": 1209,
            "inventory": 500
          }
        ],
        "title": "「wowu」逗豆糖果罐"
      },
      {
        "id": 6,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/ae/40/ae406944cb15c1d541b0b0179db0c13bd025fd04-f4c03e7290a8a40820fbcf2968d508bfa92bad21.jpg",
        "status": "in_stock",
        "skus": [
          {
            "discount_price": 1350.0,
            "spec_str": "表壳颜色:银",
            "spec_list": "546:1536",
            "sold_count": 81,
            "id": 490,
            "inventory": 500
          },
          {
            "discount_price": 1350.0,
            "spec_str": "表壳颜色:玫瑰金",
            "spec_list": "546:1535",
            "sold_count": 76,
            "id": 490,
            "inventory": 500
          }
        ],
        "title": "「DW」Nottingham系列腕表"
      },
      {
        "id": 7,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/9f/0e/9f0e48e4e4c7bd2eab57ea0bc896d7d365f3a3c9-499b779b3fecb80af34fc315f0024bbf693fba6b.jpg",
        "status": "in_stock",
        "skus": [
          {
            "discount_price": 168.0,
            "spec_str": "规格:1130g 粽子800g 艾草50g 咸海鸭蛋280g",
            "spec_list": "1389:4066",
            "sold_count": 150,
            "id": 1232,
            "inventory": 500
          }
        ],
        "title": "「嘿大厨」情感魔方粽"
      },
      {
        "id": 8,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/a3/8e/a38e19bd87dd49f9b675b81ce7660cdb991c73dd-71b97f3681cfd481f98f8279e17d064ae63ea66a.jpg",
        "status": "in_stock",
        "skus": [
          {
            "discount_price": 199.0,
            "spec_str": "颜色:白色,款式:经典版",
            "spec_list": "1087:3223,1088:3224",
            "sold_count": 7,
            "id": 1012,
            "inventory": 500
          },
          {
            "discount_price": 199.0,
            "spec_str": "颜色:白色,款式:旗舰版",
            "spec_list": "1087:3223,1088:3487",
            "sold_count": 100,
            "id": 1012,
            "inventory": 500
          }
        ],
        "title": "「Roome」智能光瓶"
      },
      {
        "id": 9,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/a2/9c/a29c678f678751c77da5023149fb003a7c0f3bd3-1c17581f9ef43f7aaafe51cd21876386eb329f43.jpg",
        "status": "in_stock",
        "skus": [
          {
            "discount_price": 129.25,
            "spec_str": "款式:粉",
            "spec_list": "1423:4188",
            "sold_count": 340,
            "id": 1258,
            "inventory": 500
          },
          {
            "discount_price": 9999.0,
            "spec_str": "款式:蓝",
            "spec_list": "1423:4187",
            "sold_count": 4,
            "id": 1258,
            "inventory": 9999
          },
          {
            "discount_price": 666.25,
            "spec_str": "款式:白",
            "spec_list": "1423:4186",
            "sold_count": 318,
            "id": 1258,
            "inventory": 666
          }
        ],
        "title": "「博冠」云智能健康秤 Just Fit S1"
      },
      {
        "id": 10,
        "cover_image": "http://canton-assets.ifanrusercontent.com/media/user_files/canton/e9/c7/e9c774c8995a055a5611b1b2b0bf0e32f9bbd559-3b224b52690dfa220a12363913c0d81842085b88.jpg",
        "status": "in_stock",
        "skus": [
          {
            "discount_price": 180.0,
            "spec_str": "款式:汤锅,尺寸:16cm",
            "spec_list": "1326:3923,1327:3924",
            "sold_count": 297,
            "id": 999,
            "inventory": 666
          },
          {
            "discount_price": 180.0,
            "spec_str": "款式:汤锅,尺寸:22cm",
            "spec_list": "1326:3923,1327:3925",
            "sold_count": 2,
            "id": 666,
            "inventory": 0
          }
        ],
        "title": "日本「YOSHIKAWA」吉川雪平锅"
      }
    ]
  }

  // list.meta.total_count = 0
  // list.objects = []

  return delay(
    'getProductList',
    params,
    list,
    false,
    500
  )
}

export function exportProductList (params) {
  return delay(
    'exportProductList',
    params, {
      download_url: 'http://' + window.location.host + '/media/user_files/canton/products/Product-1dBCEiumEqZAJkyCMQYseImJtJYXnHle.xls'
    }
  )
}

export function updateProductStatus (id, params) {
  // return delay(`updateProductStatus #${id}`, params, '系统繁忙', true, 2000);
  return delay(`updateProductStatus #${id}`, params, {}, false, 2000)
}

export function updateProductStock (id, params) {
  if (id !== 10) return delay(`updateProductStock #${id}`, params, '服务器繁忙', true)
  return delay(`updateProductStock #${id}`, params, {})
}

// 商品规格相关
export function addSpec (params) {
  const id = entries.spec_id++
  const value_id = entries.spec_value_id++
  const data = {
    id: id,
    name: params.spec_key_name,
    spec_value_id: value_id,
    spec_value_name: params.spec_value_list[0],

    spec_key_id: id,
    spec_key_name: params.spec_key_name,
    spec_value_list: [
      { spec_value_id: value_id, spec_value_name: params.spec_value_list[0] }
    ]
  }

  entries.spec[data.id] = data

  return delay('addSpec', params, data)
}

export function updateSpec (id, params) {
  const spec = entries.spec[id]
  const value_id = entries.spec_value_id++
  spec.spec_value_id = value_id
  spec.spec_value_name = params.spec_value_list[0]
  spec.spec_value_list.push(
    { spec_value_id: value_id, spec_value_name: params.spec_value_list[0] }
  )
  return delay(`updateSpec #${id}`, params, spec)
}
