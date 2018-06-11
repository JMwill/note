import $ from 'jquery'
import _ from 'lodash'
import React, {PureComponent} from 'react'

import ProductSpec from './product-spec'
import ProductStock from './product-stock'

let mapToData = function(selected, data, skus) {
  const postData = []

  _.each(selected, spec_list => {
    const line = data[spec_list] || {}
    const original_price = line['original_price']
    const discount_price = line['discount_price']
    const inventory = line['inventory']
    const bar_code = line['bar_code']
    const unit_cost = line['unit_cost']
    const status = line['status']

    const supplier_code = line['supplier_code']
    let sku_image = line['sku_image']
    if (!sku_image) sku_image = null

    if ((original_price != null && parseFloat(original_price, 10) >= 0) &&
      (discount_price != null && parseFloat(discount_price, 10) > 0) &&
      (unit_cost != null && parseFloat(unit_cost, 10) >= 0) &&
      (inventory != null && parseInt(inventory, 10) >= 0) &&
      (!!bar_code)) {
      let id = 0 // sku id
      const found = _.find(skus, x => x.spec_list === spec_list)
      if (found != null) {
        id = found.id
      }

      postData.push({
        id,
        spec_list,
        original_price,
        discount_price,
        unit_cost,
        inventory,
        bar_code,
        supplier_code,
        sku_image,
        status,
      })
    }
  })
  return postData
}

class ProductStockEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      all_specs: props.all_specs,
      skus: props.skus,
    }

    this.onProductSpecsChange = this.onProductSpecsChange.bind(this)
    this.onProductSkusChange = this.onProductSkusChange.bind(this)
  }

  onProductSpecsChange(all_specs) {
    this.setState({
      all_specs: all_specs,
    })
  }

  onProductSkusChange(selected, data) {
    let error = ''
    const postData = mapToData(selected, data, this.props.skus)
    if (postData.length !== selected.length) {
      error = '选中的 SKU 必填进价、原价、折后价、库存、条码'
    } else {
      error = ''
    }
    $(this.error_node).text(error)
    this.setState({
      skus: [...postData],
    })

    // 拼接 spec_str
    const specMap = {}
    const specValueMap = {}
    _.each(this.state.all_specs, item => {
      specMap[item.spec_key_id] = item.spec_key_name
      _.each(item.spec_value_list, value => {
        specValueMap[value.spec_value_id] = value.spec_value_name
      })
    })

    if (postData.length) {
      _.each(postData, item => {
        let spec_str = []
        if (item.spec_list.length) {
          let parts = item.spec_list.split(',')
          _.each(parts, part => {
            let pair = part.split(':')
            pair = [specMap[pair[0]], specValueMap[pair[1]]].join(':')
            spec_str.push(pair)
          })
        }
        item.spec_str = spec_str.join(',')
      })
    }

    this.props.onChange(postData)
  }

  render() {
    return (
      <div className='product-spec-editor'>
        <div className='pepe-form__group clearfix'>
          <label className='pepe-form__label'>
            商品规格
          </label>
          <div className='pepe-form__control'>
            <ProductSpec
              product_id={this.props.product_id}
              all_specs={this.state.all_specs}
              onChange={this.onProductSpecsChange}
            />
          </div>
        </div>
        <div className='pepe-form__group clearfix'>
          <label className='pepe-form__label mt-0'>
            商品库存
            <div className='FormError skus-error' ref={(n) => { this.error_node = n }} />
          </label>
          <div className='pepe-form__control clearfix'>
            <ProductStock
              all_specs={this.state.all_specs}
              skus={this.state.skus}
              onChange={this.onProductSkusChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

ProductStockEditor.defaultProps = {
  product_id: 0,
  all_specs: [],
  skus: [],
  onChange() {},
}

export default ProductStockEditor
