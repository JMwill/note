import React, {PureComponent} from 'react'

import TableColgroup from '../../components/table-colgroup'

import RefundTableItem from './refund-table-item'

const total_width = 896
const cell_width_list = [260, 96, 80, 172, 96, 96, 96]
const colgroup = (
  <TableColgroup
    total_width={total_width}
    cell_width_list={cell_width_list}
  />
)

class RefundTable extends PureComponent {
  render() {
    const allSelected = this.props.items.length === this.props.selected.length

    return (
      <div className='order-table'>
        <table className='pepe-table'>
          {colgroup}
          <thead>
            <tr>
              <th className='first'>
                <input
                  checked={allSelected}
                  type='checkbox'
                  onChange={(e) => {
                    if (e.target.checked) {
                      this.props.selectAllRefund(this.props.items.map(item => item.id))
                    } else {
                      this.props.unselectAllRefund()
                    }
                  }}
                />
                商品
              </th>
              <th>
                售后类型
              </th>
              <th>
                图片凭证
              </th>
              <th>
                买家信息
              </th>
              <th>
                售后状态
              </th>
              <th>
                申请退款金额
              </th>
              <th>
                操作
              </th>
            </tr>
          </thead>
        </table>

        {this.props.items.map(item =>
          <RefundTableItem
            key={item.id}
            refund={item}
            selected={this.props.selected.indexOf(item.id) !== -1}
            updating={this.props.updating.indexOf(item.id) !== -1}
            dirty={this.props.dirty.indexOf(item.id) !== -1}
            colgroup={colgroup}

            reloadRefundList={this.props.reloadRefundList}
            onToggleRefund={this.props.onToggleRefund}
            updateRefundStatus={this.props.updateRefundStatus}
          />
        )}
      </div>
    )
  }
}

export default RefundTable
