import React from 'react'
import {
  compose,
  map,
  reduce,
  prop,
  concat,
} from 'lodash/fp'

import TableItemWrap from './table-item-wrap'
import TableColgroup from '../../components/table-colgroup'

const total_width = 896
const cell_width_list = [260, 96, 60, 116, 160, 108, 96]
const colgroup = (
  <TableColgroup
    total_width={total_width}
    cell_width_list={cell_width_list}
  />
)

const TableHeader = ({onCheck, checked}) => (
  <table className='pepe-table'>
    {colgroup}
    <thead>
      <tr>
        <th className='first' >
          <input type='checkbox' onChange={onCheck} checked={checked} />
          <span>商品</span>
        </th>
        <th>商品单价</th>
        <th>数量</th>
        <th>订单状态</th>
        <th>买家信息</th>
        <th>实收付款</th>
        <th>操作</th>
      </tr>
    </thead>
  </table>
)

const getOrderItemId = compose(map(prop('id')), prop('item'))
const getAllOrderItemId = reduce((acc, o) => concat(acc, getOrderItemId(o)), [])

const TableWrap = children => (
  <div>
    {children}
  </div>
)

const TableContent = compose(
  TableWrap,
  map(TableItemWrap),
  prop('orders')
)

const OrderTable = ({
  items,
  selected,

  selectAllOrder,
  unselectAllOrder,
  toggleOrder,
  reloadOrderList,
}) => {
  const ids = getAllOrderItemId(items)

  const onCheck = (e) => {
    if (e.target.checked) {
      selectAllOrder(ids)
    } else {
      unselectAllOrder()
    }
  }

  const checked = selected.length === ids.length

  const orders = map(x => ({
    ...x,
    toggleOrder,
    reloadOrderList,
    colgroup,
    selected,
  }), items)

  return (
    <div>
      <TableHeader onCheck={onCheck} checked={checked} />
      <TableContent orders={orders} />
    </div>
  )
}

export default OrderTable
