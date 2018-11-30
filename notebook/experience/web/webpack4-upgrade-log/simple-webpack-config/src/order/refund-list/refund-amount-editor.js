import React, {PureComponent} from 'react'

import io from '../../io'
import utils from '../../utils'

import InputAmount from '../../components/input-amount'
import InputRadioGroup from '../../components/input-radio-group'
import lock from '../../components/lock'
import alert from '../../components/alert'

class RefundAmountEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      refund_type: 'full_refund',
      debit: 0,
      supplier_debit: 0,
      shipping_rate: 0,
    }

    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.onRefundTypeChange = this.onRefundTypeChange.bind(this)
    this.onDebitChange = this.onDebitChange.bind(this)
    this.onSupplierDebitChange = this.onSupplierDebitChange.bind(this)
    this.onShippingFeeChange = this.onShippingFeeChange.bind(this)
  }

  submit(e) {
    e.preventDefault()

    if (utils.toCent(this.state.shipping_rate) > utils.toCent(this.props.shipping_rate)) {
      alert('物流退费不能超过' + utils.toFriendlyPrice(this.props.shipping_rate))
      return
    }

    let postData = {
      status: 'refund_issued',
      refund_type: this.state.refund_type,
      refund_shipping_rate: this.state.shipping_rate,
    }

    if (this.state.refund_type === 'partial_refund') {
      const total = utils.toCent(this.state.debit) + utils.toCent(this.state.supplier_debit)
      if (total > utils.toCent(this.props.final_cost)) {
        alert('商品退费不能超过' + utils.toFriendlyPrice(this.props.final_cost))
        return
      }

      postData.debit = this.state.debit
      postData.supplier_debit = this.state.supplier_debit
    }

    const unlock = lock(this.container)

    io.updateRefundStatus(this.props.id, postData)
      .then(res => {
        unlock()
        this.props.onSuccess && this.props.onSuccess()
        this.props.close() && this.props.close()
      })
      .catch(err => {
        unlock()
        utils.fail(err)
      })
  }

  cancel() {
    this.props.close()
  }

  onRefundTypeChange(val) {
    this.setState({
      refund_type: val,
    })
  }

  onDebitChange(val) {
    val = parseFloat(val || 0, 10)
    this.setState({
      debit: val,
    })
  }

  onSupplierDebitChange(val) {
    val = parseFloat(val || 0, 10)
    this.setState({
      supplier_debit: val,
    })
  }

  onShippingFeeChange(val) {
    val = parseFloat(val || 0, 10)
    this.setState({
      shipping_rate: val,
    })
  }

  render() {
    const shippingFeeLeft = utils.toFriendlyPrice(this.props.shipping_rate)
    const finalCost = utils.toFriendlyPrice(this.props.final_cost)

    return (
      <div ref={container => (this.container = container)} className='form-horizontal pepe-modal-table'>
        <div className='pepe-form__alert'>注意：该操作不可逆，请谨慎操作</div>
        <div className='pepe-flex pepe-form-section'>
          <div className='pepe-form-section__label' style={{marginTop: '0'}}>
            商品退费
          </div>
          <div className='pepe-flex__item'>
            <div className='pepe-form-section__control'>
              <InputRadioGroup
                options={[{label: '全额退款', value: 'full_refund'}, {label: '部分退款', value: 'partial_refund'}]}
                value={this.state.refund_type}
                onChange={this.onRefundTypeChange}
              />
            </div>

            {this.state.refund_type === 'full_refund' && (
              <div className='pepe-form-section__control'>
                退款金额：{finalCost}
              </div>
            )}

            {this.state.refund_type === 'partial_refund' && (
              <div>
                <div className='pepe-form-section__control'>
                  <span className='pepe-form-section__text pull-left'>己方退款</span>
                  <InputAmount
                    className='form-control pull-left'
                    style={{width: '80px', margin: '0 12px'}}
                    onChange={this.onDebitChange}
                    value={this.state.debit}
                  />
                  <span className='pepe-form-section__desc'>0 则为不承担退款</span>
                </div>
                <div className='pepe-form-section__control'>
                  <span className='pepe-form-section__text pull-left'>供应商退款</span>
                  <InputAmount
                    className='form-control pull-left'
                    style={{width: '80px', margin: '0 12px'}}
                    onChange={this.onSupplierDebitChange}
                    value={this.state.supplier_debit}
                  />
                  <span className='pepe-form-section__desc pull-left'>0 则为不承担退款</span>
                </div>
                <div className='pepe-form-section__control'>
                  最高总退费：{finalCost}
                </div>
              </div>
            )}

          </div>
        </div>
        <div className='pepe-flex pepe-form-section'>
          <div className='pepe-form-section__label'>
            物流退费
          </div>
          <div className='pepe-flex__item'>
            <div className='pepe-form-section__control'>
              <InputAmount
                className='form-control pull-left'
                style={{width: '80px', margin: '0 12px 0 0'}}
                value={this.state.shipping_rate}
                onChange={this.onShippingFeeChange}
              />
              <span className='pepe-form-section__desc pull-left'>最高可退 {shippingFeeLeft}</span>
            </div>
          </div>
        </div>
        <div className='ft'>
          <button className='btn btn-primary' onClick={this.submit}>确定</button>
          <button className='btn btn-default' onClick={this.cancel}>取消</button>
        </div>
      </div>
    )
  }
}

RefundAmountEditor.defaultProps = {
  id: 0,
  refund_amount: 0,
  final_cost: 0,
  shipping_rate: 0,
  close() {},
}

export default RefundAmountEditor
