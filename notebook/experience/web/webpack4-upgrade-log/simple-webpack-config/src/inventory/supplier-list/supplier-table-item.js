import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

class SupplierTableItem extends PureComponent {
  renderAction() {
    const {
      merchandise_count,
      id,
      dirty,

      onUpdateSupplierStatus,
    } = this.props
    if (dirty) {
      return (<span>-</span>)
    } else {
      return (
        <div data-action={id}>
          <div className='btn-group'>
            <Link
              className='btn btn-default btn-sm btn-bordered'
              to={`/inventory/supplier/${id}/edit/`}
            >
              编辑
            </Link>
            {merchandise_count > 0 ? null : (
              <button
                className='btn btn-default btn-sm btn-bordered'
                onClick={(e) => { onUpdateSupplierStatus(id, 'deleted', '删除', `[data-action="${id}"]`) }}
              >
                删除
              </button>
            )}
          </div>
        </div>
      )
    }
  }

  render() {
    const {
      email,
      merchandise_count,
      name,
      phone,
    } = this.props

    return (
      <tr>
        <td className='first'>
          {name}
        </td>
        <td>
          {phone}
        </td>
        <td>
          {email}
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

export default SupplierTableItem
