import _ from 'lodash'
import axios from 'axios'
import config from '../../config'
import utils from '../../utils'

// 对 axios 设置 Raven 上报
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status >= 500 || error.response.status === 400) {
      window.Raven && window.Raven.captureException(error)
    }
    return Promise.reject(error)
  })

const csrftoken = utils.getCookie('csrftoken')

const prefixMap = {
  'merchant': 'api/v3/pepe/merchant-dashboard/',
  'miniapp': 'api/v3/pepe/miniapp/',
  'dserve': 'dserve/v1/',
  'pepe': 'pepe/merchant-dashboard/',
}

function getUrl(path, prefix = 'merchant') {
  return config.getAppConfig('base_api') + prefixMap[prefix] + path
}

function getViewUrl(path) {
  return config.getAppConfig('base_url') + path
}

function getBaseUrl(path) {
  return config.getAppConfig('base_api') + path
}

export default {
  list(path, params, prefix = 'merchant') {
    const req = _.defaults(params, config.getAppConfig('paginator'))
    return axios({
      method: 'GET',
      url: getUrl(path, prefix),
      params: req,
    })
  },
  get(path, params, prefix = 'merchant') {
    return axios({
      method: 'GET',
      url: getUrl(path, prefix),
      params,
    })
  },
  post(path, data, prefix = 'merchant') {
    return axios({
      headers: {
        'X-CSRFToken': csrftoken,
      },
      method: 'POST',
      url: getUrl(path, prefix),
      data,
    })
  },
  put(path, data, prefix = 'merchant') {
    return axios({
      headers: {
        'X-CSRFToken': csrftoken,
      },
      method: 'PUT',
      url: getUrl(path, prefix),
      data,
    })
  },
  patch(path, data, prefix = 'merchant') {
    return axios({
      headers: {
        'X-CSRFToken': csrftoken,
      },
      method: 'PATCH',
      url: getUrl(path, prefix),
      data,
    })
  },
  delete(path, prefix = 'merchant') {
    return axios({
      headers: {
        'X-CSRFToken': csrftoken,
      },
      method: 'DELETE',
      url: getUrl(path, prefix),
    })
  },
  postView(path, data) {
    return axios({
      headers: {
        'X-CSRFToken': csrftoken,
      },
      method: 'POST',
      url: getViewUrl(path),
      data,
    })
  },
  getView(path, data) {
    return axios({
      headers: {
        'X-CSRFToken': csrftoken,
      },
      method: 'GET',
      url: getViewUrl(path),
      params: data,
    })
  },
  uploadFileView(data, url = 'canton/admin/supplier/order/import/') {
    return axios({
      headers: {
        'X-CSRFToken': csrftoken,
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      url: getBaseUrl(url),
      data,
    })
  },
}
