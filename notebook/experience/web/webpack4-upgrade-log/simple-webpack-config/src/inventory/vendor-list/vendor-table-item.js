import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

class VendorTableItem extends PureComponent {
  renderAction() {
    const {
      id,
      dirty,
      onUpdateVendorStatus,
    } = this.props
    if (dirty) {
      return (<span>-</span>)
    } else {
      return (
        <div data-action={id}>
          <div className='btn-group'>
            <Link
              className='btn btn-default btn-sm btn-bordered'
              to={`/inventory/vendor/${id}/edit/`}
            >
              编辑
            </Link>
            <button
              className='btn btn-default btn-sm btn-bordered'
              onClick={(e) => { onUpdateVendorStatus(id, 'deleted', '删除', `[data-action="${id}"]`) }}
            >
              删除
            </button>
          </div>
        </div>
      )
    }
  }

  render() {
    const {
      logo,
      name,
      merchandise_count,
    } = this.props

    return (
      <tr>
        <td className='first'>
          <div className='flex-media'>
            <img src={logo} alt={name} />
            <div className='text'>{name}</div>
          </div>
        </td>
        <td>
          {merchandise_count}
        </td>
        <td className='table-action-group'>
          {this.renderAction()}
        </td>
      </tr>
    )
  }
}

export default VendorTableItem
