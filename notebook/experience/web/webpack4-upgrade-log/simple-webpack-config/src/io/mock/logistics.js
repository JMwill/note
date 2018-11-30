import {delay} from './utils'
import _ from 'lodash'

let data = []
let words = '资近内严去报目便文关口革识者厂给可特详队品老全大必原外格标争提时果干即具统门进思C思办1村形专第没约治半能龙积细么使'
let templateNames = _.chunk(words, 3)
let charge_type = ['piece', 'weight']
let status = ['active', 'inactive', 'deleted']
let ids = _.range(1, 3000)

for (var i = 1; i < 100; i++) {
  data.push({
    id: ids.pop(),
    status: _.sample(status),
    name: _.map(_.sampleSize(templateNames, 3), (t) => t.join('')).join(''),
    merchandise_count: _.random(1, 100),
    charge_type: _.sample(charge_type), // 计费方式
    couriers: [{
      id: ids.pop(),
      name: 'ems', // 指定物流公司
      status: _.sample(status),
      is_default: true, // 只有一个激活
      item: [{
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }],
    }, {
      id: ids.pop(),
      name: 'ems', // 指定物流公司
      status: _.sample(status),
      is_default: false, // 只有一个激活
      item: [{
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }],
    }, {
      id: ids.pop(),
      name: 'ems', // 指定物流公司
      status: _.sample(status),
      is_default: false, // 只有一个激活
      item: [{
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }, {
        id: ids.pop(),
        status: 'active',
        delivery_area: ['120000', '110000'], // 配送区域
        initial_rate: 9.99, // 首件运费
        initial: 1, // 首件
        additional_rate: 9.99, // 续件运费
        additional: 1, // 续件
      }],
    }],
  })
}

export function getLogisticsList(params) {
  let start = params.offset || 0
  let end = start + params.limit || 20
  return delay(
    'getLogisticsList',
    params,
    {
      meta: {
        previous: null,
        total_count: data.length,
        offset: 0,
        limit: 20,
        next: null,
      },
      objects: _.slice(data, start, end),
    },
    false,
    500
  )
}

export function getLogistics(id) {
  return delay(`getLogistics #${id}`, null, _.find(data, (d) => d.id === Number(id)), false, 500)
}

export function updateLogistics(id, params) {
  return delay(`updateLogistics #${id}`, params, {}, false, 500)
}

export function addLogistics(params) {
  return delay('addLogistics', params, {}, false, 500)
}

export function updateLogisticsStatus(id, params) {
  return delay(
    'updateLogisticsStatus',
    params,
    {},
    false,
    500
  )
}
