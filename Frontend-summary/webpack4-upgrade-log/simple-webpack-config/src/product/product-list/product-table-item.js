import _ from 'lodash'
import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

import {toFriendlyPrice} from '../../utils'
import config from '../../config'

import InputInteger from '../../components/input-integer'
import modal from '../../components/modal'

import SkuTable from './sku-table'
import SkuTableEditor from './sku-table-editor'
import ProductPreview from './product-preview'

const statusDisplayName = config.makeEnumDisplayName('product_status')

const defaultImgStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#f7f7f7',
  position: 'absolute',
  left: 0,
  top: 0,
}

const statusClassMap = {
  'in_stock': '',
  'sold_out': 'danger',
  'off_shelf': 'ignore',
}

function showSkuTable(skus) {
  modal({
    component: SkuTable,
    args: {items: skus},
    title: '商品 SKU',
  })
}

function productPreview(id) {
  modal({
    component: ProductPreview,
    args: {id},
    title: '商品预览',
    size: 'lg',
  })
}

function showSkuTableEditor(id, skus, reloadProductList) {
  modal({
    component: SkuTableEditor,
    args: {
      items: skus,
      id,
      ok() {
        reloadProductList && reloadProductList()
      },
    },
    title: '管理库存',
  })
}

function mapProduct(item) {
  let price = []
  if (item.skus.length === 1) {
    price = [item.skus[0].discount_price]
  } else if (item.skus.length > 1) {
    const start = _.minBy(item.skus, sku => parseInt(sku.discount_price, 10)).discount_price
    const end = _.maxBy(item.skus, sku => parseInt(sku.discount_price, 10)).discount_price
    if (start !== end) {
      price = [start, end]
    } else {
      price = [start]
    }
  }
  const price__computed = toFriendlyPrice(price)

  const inventory__computed = _.sumBy(item.skus, sku => (sku.inventory || 0))
  const sold_count__computed = _.sumBy(item.skus, sku => (sku.sold_count || 0))
  const status__computed = statusDisplayName(item.status)
  let supplier__computed = '-'
  if (item.supplier) {
    supplier__computed = item.supplier.name
  }

  return {
    ...item,
    price__computed,
    inventory__computed,
    sold_count__computed,
    status__computed,
    supplier__computed,
  }
}

export default class ProductTableItem extends PureComponent {
  static defaultProps = {
    debounceTime: 300,
  }

  render() {
    const {
      product,
      selected,
      dirty,
      priority,
      resource_uri,

      onToggleProduct,
      onUpdateProductStatus,
      reloadProductList,
    } = this.props
    let onChangePriority = _.debounce(
      this.props.onChangePriority,
      this.props.debounceTime
    )

    const item = mapProduct(product)
    const merchantId = config.getAppConfig('merchant_id')

    let btnGroup = null

    const edit_btn = (
      <p>
        <Link
          className='btn btn-default btn-sm btn-bordered'
          to={`/product/${item.id}/edit/`}
        >
          编辑
        </Link>
      </p>
    )
    const view_btn = (
      <p>
        <a
          className='btn btn-default btn-sm btn-bordered'
          onClick={(e) => { e.preventDefault(); productPreview(item.id) }}
        >
          查看
        </a>
      </p>
    )
    if (dirty) {
      btnGroup = (<span>-</span>)
    } else if (item.status === 'in_stock' || item.status === 'sold_out') {
      btnGroup = (
        <div data-action={item.id}>
          <p>
            <button
              className='btn btn-primary btn-sm btn-bordered'
              onClick={(e) => { onUpdateProductStatus(item.id, 'off_shelf', '下架', `[data-action="${item.id}"]`) }}
            >
              下架
            </button>
          </p>
          {edit_btn}
          {merchantId === 1 && view_btn}
          <p>
            <a
              className='btn btn-default btn-sm btn-bordered'
              href='#'
              onClick={(e) => { e.preventDefault(); showSkuTableEditor(item.id, item.skus, reloadProductList) }}
            >
              管理库存
            </a>
          </p>
        </div>
      )
    } else {
      btnGroup = (
        <div data-action={item.id}>
          <p>
            <button
              className='btn btn-primary btn-sm btn-bordered'
              onClick={(e) => { onUpdateProductStatus(item.id, 'in_stock', '上架', `[data-action="${item.id}"]`) }}
            >
            上架
            </button>
          </p>
          {edit_btn}
          {merchantId === 1 && view_btn}
          <p>
            <button
              className='btn btn-default btn-sm btn-bordered'
              onClick={(e) => { onUpdateProductStatus(item.id, 'deleted', '删除', `[data-action="${item.id}"]`) }}
            >
            删除
            </button>
          </p>
        </div>
      )
    }

    return (
      <tr>
        <td className='first'>
          <div>
            <input
              style={{marginTop: '2px'}}
              className='pull-left'
              checked={selected}
              type='checkbox'
              onChange={(e) => { onToggleProduct(e.target.checked, item.id) }}
            />
            <InputInteger
              className='pull-left priority-input form-control'
              value={priority}
              onChange={(value) => { onChangePriority({id: item.id, resource_uri, value}) }}
            />
          </div>
        </td>
        <td>
          <span className='pull-left' style={{lineHeight: '1'}}>{item.id}</span>
        </td>
        <td>
          <div className='pepe-media' style={{paddingLeft: '76px'}}>
            {item.cover_image
              ? (<img src={item.cover_image} alt={item.title} style={{left: '0'}} />)
              : (<div style={defaultImgStyle} />)}
            <div className='pepe-media__title' title={item.title}>
              {item.title}
            </div>
          </div>
        </td>
        <td>
          {item.price__computed}
        </td>
        <td>
          {item.supplier__computed}
        </td>
        <td>
          {item.sold_count}
        </td>
        <td>
          <a className='second' href='#' onClick={(e) => { e.preventDefault(); showSkuTable(item.skus) }}>点击查看</a>
        </td>
        <td className={statusClassMap[item.status]}>
          {item.status__computed}
        </td>
        <td className='table-action-group'>
          {btnGroup}
        </td>
      </tr>
    )
  }
}
