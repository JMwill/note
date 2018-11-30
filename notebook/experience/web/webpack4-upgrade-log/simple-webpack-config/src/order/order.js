import _ from 'lodash'
import React from 'react'

import io from '../io'

import alert from '../components/alert'
import lock from '../components/lock'
import modal from '../components/modal'
import OrderDetail from '../components/order-detail'
import ShippingEditor from '../components/shipping-editor'

class Order extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
    }

    this.load = this.load.bind(this)
    this.openShippingEditor = this.openShippingEditor.bind(this)
  }

  openShippingEditor() {
    const that = this
    modal({
      component: ShippingEditor,
      args: {
        orderitem_id: that.props.id,
        waybill_number: that.state.data.waybill_number,
        carrier_id: (_.isEmpty(that.state.data.ship_carrier) ? '' : that.state.data.ship_carrier.value),
        onSuccess(id) {
          that.load()
        },
      },
      title: '物流信息填写',
    })
  }

  componentDidMount() {
    this.load()
  }

  load() {
    const that = this
    const unlock = lock()
    io.getOrder(that.props.id)
      .then(res => {
        unlock()
        that.setState({
          data: {...res.data},
        })
      })
      .catch(err => {
        unlock()
        alert(err.data)
      })
  }

  render() {
    return (
      <div className='wrap js-wrap'>
        <div className='order-detail'>
          {_.isEmpty(this.state.data)
            ? null
            : <OrderDetail {...this.state.data} openShippingEditor={this.openShippingEditor} />}
        </div>
      </div>
    )
  }
}

export default Order
