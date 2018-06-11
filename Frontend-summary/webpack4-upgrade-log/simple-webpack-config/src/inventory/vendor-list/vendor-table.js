import React, {PureComponent} from 'react'
import VendorTableItem from './vendor-table-item'
import TableColgroup from '../../components/table-colgroup'

const total_width = 896
const cell_width_list = [454, 270, 172]

class VendorTable extends PureComponent {
  render() {
    return (
      <div className='order-table pepe-table-wrap'>
        <table className='pepe-table'>
          <TableColgroup total_width={total_width} cell_width_list={cell_width_list} />
          <thead>
            <tr>
              <th className='first'>
                品牌
              </th>
              <th>
                商品数量
              </th>
              <th>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item) =>
              <VendorTableItem
                {...item}
                key={item.id}
                onUpdateVendorStatus={this.props.onUpdateVendorStatus}
                dirty={this.props.vendor_status_dirty.indexOf(item.id) !== -1}
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

VendorTable.defaultProps = {
  items: [],
  vendor_status_dirty: [],

  onUpdateVendorStatus() {},
  reloadVendorList() {},
}

export default VendorTable
