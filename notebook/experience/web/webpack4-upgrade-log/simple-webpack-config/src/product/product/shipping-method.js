import _ from 'lodash/fp'
import React, {PureComponent} from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import InputAmount from '../../components/input-amount'
import InputLookup from '../../components/input-lookup'

const styles = {
  checkboxwrap: {
    marginRight: '12px',
    marginBottom: '0',
    lineHeight: '44px',
    float: 'left',
  },
  checkbox: {
    marginRight: '12px',
  },
  table: {
    margin: '24px 0 0',
  },
}

const toDefaultState = props => {
  if (props.shipping_rate_schedule != null) {
    return {
      active: 'shipping_rate_schedule',
      shipping_rate: 0,
      shipping_rate_schedule: props.shipping_rate_schedule,
      error: null,
    }
  }

  return {
    active: 'shipping_rate',
    shipping_rate: props.shipping_rate,
    shipping_rate_schedule: null,
    error: null,
  }
}

const toSku = (prevSku, localSku) => _.map(x => {
  const obj = {
    id: x.id,
    spec_list: x.spec_list,
    spec_str: x.spec_str,
    value: 0,
  }

  const pred = y => y.spec_list === x.spec_list
  let found = _.find(pred)(localSku)
  if (!found) {
    found = _.find(pred)(prevSku)
  }

  if (found != null) {
    obj.value = found.value
  }

  return obj
})

class ShippingMethodEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = toDefaultState(props)

    this.onSelect = this.onSelect.bind(this)
    this.onSkuChange = this.onSkuChange.bind(this)

    this.sku = []
  }

  onSelect(active) {
    return (value, item) => {
      if (active === 'shipping_rate') {
        if (typeof value === 'object') {
          value = this.state.shipping_rate
        } else {
          value = parseFloat(value, 10)
          if (_.isNaN(value)) {
            value = 0
          }
        }

        this.setState({
          error: null,
          active,
          shipping_rate: value,
          shipping_rate_schedule: null,
        }, () => {
          this.props.onChange({
            active,
            shipping_rate: value,
            shipping_rate_schedule: null,
          })
        })
      } else if (active === 'shipping_rate_schedule') {
        let shippingFeeSchedule = null
        if (item != null) {
          shippingFeeSchedule = {
            id: item.id,
            name: item.name,
            charge_type: item.charge_type,
            sku: [],
          }
        }

        let error = null
        if (shippingFeeSchedule == null) {
          error = '请选择运费模版'
        } else if (shippingFeeSchedule.charge_type === 'weight') {
          error = '所有 SKU 的重量都是必填'
        }

        this.setState({
          error,
          active,
          shipping_rate: 0,
          shipping_rate_schedule: shippingFeeSchedule,
        }, () => {
          this.props.onChange({
            active,
            shipping_rate: 0,
            shipping_rate_schedule: shippingFeeSchedule,
          })
        })
      }
    }
  }

  onSkuChange(spec_list) {
    return (val) => {
      const found = _.find(x => x.spec_list === spec_list)(this.sku)
      if (found != null) {
        found.value = parseFloat(val, 10)
      }

      const newVal = {
        active: this.state.active,
        shipping_rate: 0,
        shipping_rate_schedule: {
          ...this.state.shipping_rate_schedule,
        },
      }

      if (_.every(x => x.value > 0)(this.sku)) {
        newVal.shipping_rate_schedule.sku = this.sku
        this.props.onChange(newVal)
      } else {
        newVal.shipping_rate_schedule.sku = []
        this.props.onChange(newVal)
      }

      let error = null
      if (newVal.shipping_rate_schedule.sku.length === 0) {
        error = '所有 SKU 的重量都是必填'
      }
      this.setState({
        error,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.equals(nextProps.sku, this.props.sku)) {
      if (this.state.active === 'shipping_rate_schedule') {
        let error = ''
        const shippingFeeSchedule = this.state.shipping_rate_schedule

        if (shippingFeeSchedule != null && shippingFeeSchedule.charge_type === 'weight') {
          const skuView = toSku(shippingFeeSchedule.sku, this.sku)(nextProps.sku)
          if (!_.every(x => parseFloat(x.value) > 0, skuView)) {
            error = '所有 SKU 的重量都是必填'
          }
        }

        this.setState({
          error,
        })
      }
    }
  }

  render() {
    let shippingFeeSchedule = null
    if (this.state.active === 'shipping_rate_schedule' && this.state.shipping_rate_schedule != null) {
      shippingFeeSchedule = {
        id: this.state.shipping_rate_schedule.id,
        name: this.state.shipping_rate_schedule.name,
      }
      // 转换为重量表单
      if (this.state.shipping_rate_schedule.charge_type === 'weight') {
        this.sku = toSku(this.state.shipping_rate_schedule.sku, this.sku)(this.props.sku)
      } else {
        this.sku = []
      }
    } else {
      this.sku = []
    }

    return (
      <div>
        <div className='clearfix'>
          <div
            className='pull-left'
            onClick={this.onSelect('shipping_rate')}
          >
            <label style={styles.checkboxwrap}>
              <input
                style={styles.checkbox}
                type='checkbox'
                checked={this.state.active === 'shipping_rate'}
                readOnly
              />
              <span>统一运费</span>
            </label>
            <InputAmount
              className='form-control'
              style={{width: '80px'}}
              placeholder='0.00'
              value={this.state.shipping_rate}
              onChange={this.onSelect('shipping_rate')}
            />
          </div>
          <span className='pepe-form__tips'>运费为 0 则视为所有区域包邮</span>
        </div>
        <div
          className='clearfix'
          style={{marginTop: '24px'}}
        >
          <div className='pull-left' onClick={this.onSelect('shipping_rate_schedule')}>
            <label style={styles.checkboxwrap} >
              <input
                type='checkbox'
                style={styles.checkbox}
                checked={this.state.active === 'shipping_rate_schedule'}
              />
              <span>使用运费模版</span>
            </label>
            <div style={{float: 'left'}}>
              <InputLookup
                placeholder='请选择运费模版'
                type='SHIPPING_RATE_SCHEDULE'
                value={shippingFeeSchedule}
                onChange={this.onSelect('shipping_rate_schedule')}
              />
            </div>
            <a
              target='__blank'
              href='#/inventory/logistics/create/'
              className='pepe-form__link'
            >
              去新建
            </a>
          </div>

        </div>
        <div>
          {this.sku.length > 0 && (
            <table className='table table-bordered' style={styles.table}>
              <thead>
                <tr><th>SKU</th><th>重量（kg）</th></tr>
              </thead>
              <tbody>
                {this.sku.map(skuItem => (
                  <tr key={skuItem.spec_list}>
                    <td>
                      {skuItem.spec_str}
                    </td>
                    <td>
                      <InputAmount
                        className='form-control'
                        style={{width: '80px'}}
                        value={skuItem.value}
                        precise={3}
                        onChange={this.onSkuChange(skuItem.spec_list)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {this.state.error && (
          <div className='FormError pull-left'>
            {this.state.error}
          </div>
        )}
      </div>
    )
  }
}

ShippingMethodEditor.defaultProps = {
  sku: [],
  shipping_rate: 0,
  shipping_rate_schedule: null,

  onChange() {},
}

export default (mount, args) => {
  render(<ShippingMethodEditor {...args} />, mount)

  return () => {
    setTimeout(() => {
      if (mount != null) { unmountComponentAtNode(mount) }
    }, 100)
  }
}
