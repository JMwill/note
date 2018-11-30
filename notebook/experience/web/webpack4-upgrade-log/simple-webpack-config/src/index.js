import './public-path'
import React from 'react'
import ReactDOM from 'react-dom'
import Es6Promise from 'es6-promise'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import 'babel-polyfill'

// 第三方组件的样式
import 'cropperjs/dist/cropper.css'
import 'react-quill/dist/quill.snow.css'
import 'react-select/dist/react-select.css'
import 'react-day-picker/lib/style.css'

import 'jquery'
import 'bootstrap'

import './css/index.scss'
import config from './config'
import Layout from './components/layout'
import AssetLoader from './components/asset-loader'

import Product from './product'
import Order from './order'
import Inventory from './inventory'

// 配置
Es6Promise.polyfill()
const header = {
  avatar: config.getAppConfig('user_avatar'),
  logoutUrl: config.getAppConfig('logout_url'),
  logoTxt: config.getAppConfig('logo_txt'),
}

ReactDOM.render(
  <Router>
    <Layout
      sidebar={config.getMenus()}
      header={header}
    >
      <Switch>
        <Redirect exact from='/' to='/product/' />
        <Route path='/product/' component={Product} />
        <Route path='/order/' component={Order} />
        <Route path='/inventory/' component={Inventory} />
      </Switch>
    </Layout>
  </Router>,
  document.getElementById('app')
)
