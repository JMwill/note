import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

import enums from '../../config/enums.json'

class LogisticsTableOperateRow extends PureComponent {
  constructor(props) {
    super(props)
    this.delLogistics = this.delLogistics.bind(this)
  }

  renderAction() {
    const {
      id,
    } = this.props.item
    return (
      <div data-action={id}>
        <div className='btn-group'>
          <Link className='btn btn-default btn-sm btn-bordered' to={`/inventory/logistics/${id}/edit/`}>编辑</Link>
          <button
            className='btn btn-default btn-sm btn-bordered'
            onClick={(e) => { this.delLogistics(id) }}
          >
            删除
          </button>
        </div>
      </div>
    )
  }

  delLogistics(id) {
    this.props.updateLogisticsStatus(id, 'deleted', '删除')
  }

  render() {
    const {
      name,
      merchandise_count,
      charge_type,
    } = this.props.item

    return (
      <tr>
        <td colSpan='4' className='first operate-td'>
          <div>
            <div className='message-item'><span>模版名称：</span>{name}</div>
            <div className='message-item'><span>商品数量：</span>{merchandise_count}件</div>
            <div className='message-item'><span>计费方式：</span>{enums.logistics_charge_type[charge_type]}</div>
          </div>
        </td>
        <td colSpan='2' className='table-action-group operate-td'>
          {this.renderAction()}
        </td>
      </tr>
    )
  }
}

export default LogisticsTableOperateRow
