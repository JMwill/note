import React from 'react'
import {
  map,
  prop,
  intersection,
} from 'lodash/fp'

import utils from '../../utils'
import TableItem from './table-item'

const TableItemWrap = ({
  id,
  orderid,
  created_at,
  item,
  contact_info = {},
  final_cost,
  shipping_rate,

  colgroup,
  selected,

  toggleOrder,
  reloadOrderList,
}) => {
  const created_at__str = utils.toFriendlyDate(created_at)
  const orderitemIds = map(prop('id'), item)

  const checked = intersection(selected, orderitemIds).length > 0

  const orderitems = map((x) => ({
    ...x,
    buyer: {
      name: contact_info.contact,
      phone: contact_info.phone,
    },
    single: item.length === 1, // 一个子订单
    first: x.id === item[0].id,
    orderFinalCost: final_cost,
    orderShippingFee: shipping_rate,
  }), item)

  return (
    <table className='pepe-table solo' key={id} >
      {colgroup}
      <thead>
        <tr className='order-table__heading'>
          <td className='first' colSpan='7'>
            <input
              type='checkbox'
              checked={checked}
              onChange={e => toggleOrder(e.target.checked, id)}
            />
            <span className='text-item'>
              单号：<span>{orderid}</span>
            </span>
            <span className='text-item'>
              创建时间：<span>{created_at__str}</span>
            </span>
          </td>
        </tr>
      </thead>
      {map(orderitem => (
        <TableItem
          key={orderitem.id}
          orderitem={orderitem}
          reloadOrderList={reloadOrderList}
        />
      ), orderitems)}
    </table>
  )
}
export default TableItemWrap
