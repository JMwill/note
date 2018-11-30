import React from 'react'
import {Route, Switch} from 'react-router-dom'

import assetLoader from '../components/asset-loader'

const OrderList = assetLoader(
  () => import(/* webpackChunkName: "order-list" */ './order-list')
)
const Order = assetLoader(
  () => import(/* webpackChunkName: "order" */ './order')
)
const RefundList = assetLoader(
  () => import(/* webpackChunkName: "refund-list" */ './refund-list')
)
const Refund = assetLoader(
  () => import(/* webpackChunkName: "refund" */ './refund')
)

export default () => (
  <section>
    <Switch>
      <Route
        exact
        path='/order/'
        component={OrderList}
      />
      <Route
        exact
        path='/order/refund/'
        component={RefundList}
      />
      <Route
        exact
        path='/order/:id/'
        render={({match}) => <Order id={match.params.id} />}
      />
      <Route
        exact
        path='/order/refund/:id/'
        render={({match}) => <Refund id={match.params.id} />}
      />
    </Switch>
  </section>
)
