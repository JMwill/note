import _ from 'lodash'

import enumsConfig from './enums'
import statusConfig from './status'

function getAppConfig(key) {
  const appConfig = _.defaults(window.__app_config__, {
    assets_path: '/dist/',
    base_api: '/',
    carrier_list: [],
    category_list: [],
    limit: 20,
    logout_url: '/',
    max_limit: 1000,
    merchant_id: 0,
    user_avatr: '',
  })
  return appConfig[key]
}

function getEnums(key) {
  var found = enumsConfig[key]
  if (found != null) {
    return _.map(found, (v, k) => ({
      id: k,
      name: v,
    }))
  }
  return []
}

function makeEnumDisplayName(key) {
  var found = enumsConfig[key] || {}
  return function(id) {
    return found[id]
  }
}

function getCategory(id = 0) {
  return _.filter(getAppConfig('category_list'), item => item.parent === id)
}

function getNextBillStatus(status) {
  return statusConfig.nextBillStatus[status] || null
}

function getDoc(link) {
  return enumsConfig.doc_link[link] || '#'
}

// TODO: 根据权限判断
const makeMatch = path => (location) => location.pathname.startsWith(path)
function getMenus() {
  return [{
    name: '商品中心',
    submenu: [{
      name: '商品管理',
      icon: 'iconpepe-product',
      path: '/product/',
      match: location => (makeMatch('/product/')(location) &&
        !makeMatch('/product/category/')(location)),
    }, {
      name: '商品分类',
      icon: 'iconpepe-shelf',
      path: '/product/category/',
      match: makeMatch('/product/category/'),
    }],
  }, {
    name: '订单中心',
    submenu: [{
      name: '订单管理',
      icon: 'iconpepe-order',
      path: '/order/',
      match: location => makeMatch('/order/')(location) &&
        !makeMatch('/order/refund/')(location),
    }, {
      name: '售后管理',
      icon: 'iconpepe-refund',
      path: '/order/refund/',
      match: makeMatch('/order/refund'),
    }],
  }, {
    name: '仓库管理',
    submenu: [{
      name: '品牌管理',
      icon: 'iconpepe-vendor',
      path: '/inventory/vendor/',
      match: makeMatch('/inventory/vendor/'),
    }, {
      name: '供应商管理',
      icon: 'iconpepe-supplier',
      path: '/inventory/supplier/',
      match: makeMatch('/inventory/supplier/'),
    }, {
      name: '物流管理',
      icon: 'iconpepe-logistics',
      path: '/inventory/logistics/',
      match: makeMatch('/inventory/logistics/'),
    }],
  }]
}

export default {
  getAppConfig,
  getEnums,
  makeEnumDisplayName,
  getCategory,
  getNextBillStatus,
  getDoc,
  getMenus,
}
