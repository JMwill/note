import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

import InputLookup from '../../components/input-lookup'

class SalesModeSupplierEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      sales_mode: props.value.sales_mode,
      supplier: props.value.supplier,
    }

    this.onSalesModeChange = this.onSalesModeChange.bind(this)
    this.onSupplierChange = this.onSupplierChange.bind(this)
  }

  onSalesModeChange(e) {
    this.setState({
      sales_mode: e.target.value,
    }, () => {
      this.props.onChange(this.state)
    })
  }

  onSupplierChange(value) {
    this.setState({
      supplier: value,
    }, () => {
      this.props.onChange(this.state)
    })
  }

  render() {
    return (
      <div>
        <select
          className='form-control'
          value={this.state.sales_mode}
          onChange={this.onSalesModeChange}
        >
          <option value='consignment'>代销</option>
          <option value='retail'>购销</option>
        </select>
        {this.state.sales_mode === 'consignment' && (
          <div>
            <div style={{float: 'left', marginLeft: '16px'}}>
              <InputLookup
                placeholder='请选择供应商'
                type='SUPPLIER'
                value={this.state.supplier}
                onChange={this.onSupplierChange}
              />
            </div>
            <Link
              target='__blank'
              to='/inventory/supplier/create/'
              className='pepe-form__link'
            >
              去新建
            </Link>
          </div>
        )}
      </div>
    )
  }
}

SalesModeSupplierEditor.defaultProps = {
  value: {},
  onChange() {},
}

export default SalesModeSupplierEditor
