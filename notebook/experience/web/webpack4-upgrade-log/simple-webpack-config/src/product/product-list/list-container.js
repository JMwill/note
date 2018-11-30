import * as actions from './redux'
import _ from 'lodash'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import Empty from '../../components/empty'
import Paginator from '../../components/paginator'
import ProductTable from './product-table'
import {scrollTop} from '../../utils'

class ProductList extends PureComponent {
  componentDidMount() {
    const {getProductList} = this.props
    getProductList()
  }

  render() {
    const {
      params,
      objects,
      meta,
      product_ids_selected,
      product_priorities,
      product_status_dirty,

      changePriority,
      getProductList,
      reloadProductList,
      selectAllProduct,
      selectProduct,
      unselectAllProduct,
      unselectProduct,
      updateProductStatus,
    } = this.props

    if (objects === null) return null

    if (_.result(objects, 'length') === 0) {
      return (
        <Empty />
      )
    }

    return (
      <div className='product-list-pane'>
        <ProductTable
          items={objects}
          selected={product_ids_selected}
          priorities={product_priorities}
          dirty={product_status_dirty}
          onToggleProduct={(checked, id) => {
            if (checked) {
              selectProduct(id)
            } else {
              unselectProduct(id)
            }
          }}
          onChangePriority={changePriority}
          selectAllProduct={selectAllProduct}
          unselectAllProduct={unselectAllProduct}
          onUpdateProductStatus={updateProductStatus}
          reloadProductList={reloadProductList}
        />
        <div className='pagination-wrap'>
          <Paginator
            {...meta}
            go={(offset) => {
              scrollTop()
              getProductList({
                params: {
                  ...params,
                  offset,
                },
              })
            }}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state.product_list,
    product_ids_selected: state.product_ids_selected,
    product_status_dirty: state.product_status_dirty,
    product_priorities: state.product_priorities,
  }),
  actions
)(ProductList)
