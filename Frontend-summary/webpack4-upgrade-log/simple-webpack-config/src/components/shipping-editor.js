import React, {PureComponent} from 'react'

import alert from './alert'
import config from '../config'
import io from '../io'
import lock from './lock'
import utils from '../utils'

const carrier_list = config.getAppConfig('carrier_list')

function Option({value, display_name}) {
  return (<option value={value}>{display_name}</option>)
}

class ShippingEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  submit(e) {
    e.preventDefault()
    const carrier_id = this.carrier_id__node.value.trim()
    const waybill_number = this.waybill_number__node.value.trim()

    if (carrier_id && waybill_number) {
      const unlock = lock(this.container)
      const id = this.props.orderitem_id
      const params = {
        status: 'shipped',
        ship_carrier: {
          value: carrier_id,
        },
        waybill_number,
      }
      this.props.onRequest(id)
      io.shipOrder(id, params)
        .then(res => {
          unlock()
          this.props.onSuccess(id)
          this.props.close && this.props.close()
        })
        .catch(err => {
          unlock()
          utils.fail(err)
          this.props.onFailure(id)
        })
    } else {
      alert('请选择物流，并输入单号')
    }
  }

  cancel() {
    this.props.close() && this.props.close()
    this.props.onCancel()
  }

  render() {
    return (
      <div ref={(container) => { this.container = container }} className='form-horizontal pepe-modal-table'>
        <div>
          <div className='form-group'>
            <label className='col-sm-2 control-label'>物流公司</label>
            <div className='col-sm-10'>
              <select
                style={{width: '260px'}}
                className='form-control'
                defaultValue={this.props.carrier_id}
                ref={(node) => { this.carrier_id__node = node }}
              >
                <option value=''>请选择物流公司</option>
                {carrier_list.map(item => <Option {...item} />)}
              </select>
            </div>
          </div>
          <div className='form-group mb-0'>
            <label className='col-sm-2 control-label'>物流单号</label>
            <div className='col-sm-10'>
              <input
                style={{width: '260px'}}
                type='text'
                className='form-control'
                placeholder='请输入单号'
                defaultValue={this.props.waybill_number}
                ref={(node) => { this.waybill_number__node = node }}
              />
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

ShippingEditor.defaultProps = {
  carrier_id: '',
  waybill_number: '',
  orderitem_id: '',

  onRequest() {},
  onSuccess() {},
  onFailure() {},
  onCancel() {},
}

export default ShippingEditor
