import React, {PureComponent} from 'react'
import lock from './lock'
import io from '../io'
import utils from '../utils'
import Alert from './alert'

class PaymentConfirm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      serialNum: '',
    }

    this.handleSerialChange = this.handleSerialChange.bind(this)
    this.handlePay = this.handlePay.bind(this)
  }

  handleSerialChange(e) {
    const num = e.target.value
    this.setState({
      serialNum: num,
    })
  }

  handlePay() {
    let validSerialNum = utils.accountNumberValidator(this.state.serialNum)
    let serialNum = this.state.serialNum.split(' ').join('')
    if (!serialNum || !validSerialNum) { return Alert('输入有误！') }

    const {
      id,
      reload,
    } = this.props
    let unlock = lock(this.btn)

    io.paySupplierBill(id, {
      bank_transaction_id: serialNum,
      status: 'pending_receipt',
    })
      .then(() => {
        unlock()
        reload()
        this.props.close()
      })
      .catch((err) => {
        unlock()
        utils.fail(err)
      })
  }

  render() {
    return (
      <form>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='请输入准确的流水单号'
            onChange={this.handleSerialChange} />
        </div>
        <button
          type='button'
          className='btn btn-primary'
          ref={btn => { this.btn = btn }}
          onClick={this.handlePay}>确认提交</button>
      </form>
    )
  }
}

export default PaymentConfirm
