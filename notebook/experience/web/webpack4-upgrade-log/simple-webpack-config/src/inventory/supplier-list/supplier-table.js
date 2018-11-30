import React, {PureComponent} from 'react'
import SupplierTableItem from './supplier-table-item'

class SupplierTable extends PureComponent {
  render() {
    return (
      <div className='pepe-table-wrap'>
        <table className='pepe-table'>
          <thead>
            <tr>
              <th className='first'>
                供应商名称
              </th>
              <th>
                联系方式
              </th>
              <th>
                邮箱
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
              <SupplierTableItem
                {...item}
                key={item.id}
                onUpdateSupplierStatus={this.props.onUpdateSupplierStatus}
                dirty={this.props.supplier_status_dirty.indexOf(item.id) !== -1}
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

SupplierTable.defaultProps = {
  items: [],
  supplier_status_dirty: [],

  onUpdateSupplierStatus() {},
  reloadSupplierList() {},
}

export default SupplierTable
