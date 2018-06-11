import React from 'react'
import {Route, Switch} from 'react-router-dom'

import io from '../io'

import DetailComponent from '../components/detail-component'
import assetLoader from '../components/asset-loader'

const ProductList = assetLoader(
  () => import(/* webpackChunkName: "product-list" */ './product-list')
)
const CategoryList = assetLoader(
  () => import(/* webpackChunkName: "category-list" */ './category-list')
)
const Product = assetLoader(
  () => import(/* webpackChunkName: "product" */ './product')
)
const Category = assetLoader(
  () => import(/* webpackChunkName: "category" */ './category')
)

const productEdit = ({match, history}) =>
  React.createElement(
    DetailComponent(Product, () => io.getProduct(match.params.id)),
    {id: match.params.id, history},
    null
  )

const categoryEdit = ({match, history}) =>
  React.createElement(
    DetailComponent(Category, () => io.getCategory(match.params.id)),
    {id: match.params.id, history},
    null
  )

export default () => (
  <section>
    <Switch>
      <Route exact path='/product/' component={ProductList} />
      <Route exact path='/product/category/' component={CategoryList} />
      <Route exact path='/product/:id/edit/' render={productEdit} />
      <Route exact path='/product/create/' component={Product} />
      <Route exact path='/product/category/:id/edit/' render={categoryEdit} />
      <Route exact path='/product/category/create/' component={Category} />
    </Switch>
  </section>
)
