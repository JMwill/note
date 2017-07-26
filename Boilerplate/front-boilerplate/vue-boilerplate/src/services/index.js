import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import utils from '@/utils';

const debug = process.env.NODE_ENV !== 'production';

// Add global event bus
const $gBus = new Vue();
Vue.prototype.$gBus = $gBus;

// axios default settings
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * axios 响应拦截器设置, 用来对具有错误码的响应进行处理
 * 进行提醒或者给出反馈.
 */
axios.interceptors.response.use((res) => {
    let data = res.data;
    // do something with data, like:
    let code = data.code;
    if (code !== 0) {
        console.error(data.msg);
        return Promise.reject(data.msg);
    }
    // *****************************
    return data;
}, err => Promise.reject(err));

/**
 * axios 请求拦截器设置, 用来进行跨域请求设置, 需要
 * 对 Vue 的 config 文件夹下的 index.js 文件中的
 * dev 选项中的 proxyTable 进行配置.
 */
axios.interceptors.request.use((config) => {
    config.url = `${debug ? '/api' : ''}${config.url}`;
    return config;
}, err => Promise.reject(err));

function concatUrl(url, params) {
    return [url].concat(params).join('/');
}

function commonGet(url, { params = [], query = {} }) {
    let assignedQuery = utils.beNocacheQueryObj(query);
    return axios.get(concatUrl(url, params), { params: assignedQuery });
}

function commonPost(url, { params = [], query = {} }) {
    let assignedQuery = utils.beNocacheQueryObj(query);
    return axios.post(concatUrl(url, params), qs.stringify(assignedQuery));
}

export default {
    commonGet,
    commonPost,
    ...axios,
};
