import React from 'react'
import {Route, Switch} from 'react-router-dom'

import io from '../io'

import DetailComponent from '../components/detail-component'
import assetLoader from '../components/asset-loader'

const VendorList = assetLoader(
  () => import(/* webpackChunkName: "vendor-list" */ './vendor-list')
)
const Vendor = assetLoader(
  () => import(/* webpackChunkName: "vendor" */ './vendor')
)
const SupplierList = assetLoader(
  () => import(/* webpackChunkName: "supplier-list" */ './supplier-list')
)
const Supplier = assetLoader(
  () => import(/* webpackChunkName: "supplier" */ './supplier')
)
const LogisticsList = assetLoader(
  () => import(/* webpackChunkName: "logistics-list" */ './logistics-list')
)
const Logistics = assetLoader(
  () => import(/* webpackChunkName: "logistics" */ './logistics')
)

const vendorEdit = ({match, history}) =>
  React.createElement(
    DetailComponent(Vendor, () => io.getVendor(match.params.id)),
    {id: match.params.id, history},
    null
  )

const supplierEdit = ({match, history}) =>
  React.createElement(
    DetailComponent(Supplier, () => io.getSupplier(match.params.id)),
    {id: match.params.id, history},
    null
  )

const logisticsEdit = ({match, history}) =>
  React.createElement(
    DetailComponent(Logistics, () => io.getLogistics(match.params.id)),
    {id: match.params.id, history},
    null
  )

export default () => (
  <section>
    <Switch>
      <Route exact path='/inventory/vendor/' component={VendorList} />
      <Route exact path='/inventory/vendor/:id/edit/' render={vendorEdit} />
      <Route exact path='/inventory/vendor/create/' component={Vendor} />
      <Route exact path='/inventory/supplier/' component={SupplierList} />
      <Route exact path='/inventory/supplier/:id/edit/' render={supplierEdit} />
      <Route exact path='/inventory/supplier/create/' component={Supplier} />
      <Route exact path='/inventory/logistics/' component={LogisticsList} />
      <Route exact path='/inventory/logistics/:id/edit/' render={logisticsEdit} />
      <Route exact path='/inventory/logistics/create/' component={Logistics} />
    </Switch>
  </section>
)
