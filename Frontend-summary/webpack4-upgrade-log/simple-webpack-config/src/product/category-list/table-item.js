import _ from 'lodash'
import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

import config from '../../config'

import modal from '../../components/modal'
import InputInteger from '../../components/input-integer'

import ProductEditor from './product-editor'

const statusDisplayname = config.makeEnumDisplayName('category_status')

class CategoryTableItem extends PureComponent {
  static defaultProps = {
    debounceTime: 300,
  }

  constructor(props) {
    super(props)

    this.showProductEditor = this.showProductEditor.bind(this)
  }

  showProductEditor(id) {
    modal({
      component: ProductEditor,
      args: {
        category_id: id,
        onClose: () => {
          this.props.reloadCategoryList()
        },
      },
      title: '管理商品',
      size: 'lg',
      headerCloseBtn: false,
    })
  }

  renderAction() {
    const {
      status,
      id,
      resource_uri,
      dirty,
      onUpdateCategoryStatus,
    } = this.props

    if (dirty) {
      return (<span>-</span>)
    } else {
      return (
        <div data-action={id}>
          <div className='btn-group'>
            {status === 'inactive' && (
              <button
                className='btn btn-bordered btn-sm btn-default'
                onClick={(e) => { onUpdateCategoryStatus(id, resource_uri, 'active', '激活', `[data-action="${id}"]`) }}
              >
                马上使用
              </button>
            )}
            {status === 'active' && (
              <button
                className='btn btn-default btn-sm btn-bordered'
                onClick={(e) => { onUpdateCategoryStatus(id, resource_uri, 'inactive', '关闭', `[data-action="${id}"]`) }}
              >
                暂停使用
              </button>
            )}
            <Link
              className='btn btn-bordered btn-sm btn-default'
              to={`/product/category/${id}/edit/`}
            >
              编辑
            </Link>
            {status === 'inactive' && (
              <button
                className='btn btn-default btn-sm btn-bordered'
                onClick={(e) => { onUpdateCategoryStatus(id, resource_uri, 'deleted', '删除', `[data-action="${id}"]`) }}
              >
                删除
              </button>
            )}
            <a
              className='btn btn-bordered btn-sm btn-default'
              href='#'
              onClick={(e) => { e.preventDefault(); this.showProductEditor(id) }}
            >
              管理商品
            </a>
          </div>
        </div>
      )
    }
  }

  render() {
    const {
      id,
      cover_image,
      name,
      merchandise_count,
      status,
      priority,
      resource_uri,
    } = this.props

    let onChangePriority = _.debounce(
      this.props.onChangePriority,
      CategoryTableItem.defaultProps.debounceTime
    )

    return (
      <tr>
        <td className='first'>
          {id}
        </td>
        <td>
          <div className='flex-media'>
            <img src={cover_image} alt={name} style={{marginLeft: '0'}} />
            <div className='text'>{name}</div>
          </div>
        </td>
        <td>
          {merchandise_count}
        </td>
        <td>
          <InputInteger
            className='priority-input'
            value={priority}
            onChange={(value) => { onChangePriority({id, resource_uri, value}) }}
          />
        </td>
        <td>
          <span className={status === 'inactive' ? 'ignore' : ''}>
            {statusDisplayname(status)}
          </span>
        </td>
        <td className='table-action-group'>
          {this.renderAction()}
        </td>
      </tr>
    )
  }
}

export default CategoryTableItem
