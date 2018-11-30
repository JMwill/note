import React from 'react'
import ProductTableItem from './product-table-item'
import TableColgroup from '../../components/table-colgroup'

const total_width = 896
const cell_width_list = [114, 50, 186, 91, 111, 76, 86, 86, 96]

export default function ProductTable(props) {
  const allSelected = props.items.length === props.selected.length
  const priorities = props.priorities

  return (
    <div className='pepe-table-wrap'>
      <table className='pepe-table'>
        <TableColgroup total_width={total_width} cell_width_list={cell_width_list} />
        <thead>
          <tr>
            <th className='first'>
              <input
                checked={allSelected}
                type='checkbox'
                onChange={(e) => {
                  if (e.target.checked) {
                    props.selectAllProduct(props.items.map(item => item.id))
                  } else {
                    props.unselectAllProduct()
                  }
                }}
              />
              优先级
            </th>
            <th>
              ID
            </th>
            <th>
              商品
            </th>
            <th >
              价格
            </th>
            <th >
              供应商
            </th>
            <th >
              总销量
            </th>
            <th >
             SKU
            </th>
            <th >
              商品状态
            </th>
            <th >
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {props.items.map(item =>
            <ProductTableItem
              key={item.id}
              resource_uri={item.resource_uri}
              priority={priorities[item.id] ? priorities[item.id].priority : item.priority}
              reloadProductList={props.reloadProductList}
              onToggleProduct={props.onToggleProduct}
              onChangePriority={props.onChangePriority}
              onUpdateProductStatus={props.onUpdateProductStatus}
              selected={props.selected.indexOf(item.id) !== -1}
              dirty={props.dirty.indexOf(item.id) !== -1}
              product={item}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}
