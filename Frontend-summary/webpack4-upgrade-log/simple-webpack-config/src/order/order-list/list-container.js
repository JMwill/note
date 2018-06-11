import _ from 'lodash'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {scrollTop} from '../../utils'

import Empty from '../../components/empty'
import Paginator from '../../components/paginator'

import * as actions from './redux'
import OrderTable from './table'

class OrderList extends PureComponent {
  componentDidMount() {
    const {getOrderList} = this.props
    getOrderList()
  }

  render() {
    const {
      params,
      objects,
      meta,
      order_ids_selected,

      getOrderList,
      reloadOrderList,
      selectAllOrder,
      selectOrder,
      unselectAllOrder,
      unselectOrder,
    } = this.props

    if (objects === null) return null

    if (_.result(objects, 'length') === 0) {
      return (
        <Empty />
      )
    }

    const toggleOrder = (checked, id) => {
      const found = _.find(objects, x => x.id === id)
      if (!found) return
      const orderitemIds = _.map(found.item, y => y.id)
      if (checked) {
        selectOrder(orderitemIds)
      } else {
        unselectOrder(orderitemIds)
      }
    }

    return (
      <div className='order-list-pane'>
        <OrderTable
          items={objects}
          selected={order_ids_selected}
          toggleOrder={toggleOrder}
          selectAllOrder={selectAllOrder}
          unselectAllOrder={unselectAllOrder}
          reloadOrderList={reloadOrderList}
        />
        <div className='pagination-wrap'>
          <Paginator
            {...meta}
            go={(offset) => {
              scrollTop()
              getOrderList({
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

OrderList.defaultProps = {
  params: {},
  objects: [],
  meta: {},
  order_ids_selected: [],

  getOrderList() {},
  reloadOrderList() {},
  selectAllOrder() {},
  selectOrder() {},
  unselectAllOrder() {},
  unselectOrder() {},
}

export default connect(
  state => ({
    ...state.order_list,
    order_ids_selected: state.order_ids_selected,
  }),
  actions
)(OrderList)
