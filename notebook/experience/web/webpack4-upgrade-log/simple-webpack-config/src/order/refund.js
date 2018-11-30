import React, {PureComponent} from 'react'

import io from '../io'
import utils from '../utils'
import config from '../config'

import {Loading} from '../components/lock'
import modal from '../components/modal'
import OrderDetail from '../components/order-detail'
import ImgPreview from '../components/img-preview'

const statusDisplayname = config.makeEnumDisplayName('refund_status')
const typeDisplayname = config.makeEnumDisplayName('refund_type')

class Refund extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      refund: null,
      order: null,
    }

    this.openImgPreview = this.openImgPreview.bind(this)
  }

  componentDidMount() {
    const that = this
    let refund = null
    let order = null
    io.getRefund(this.props.id)
      .then(refundRes => {
        refund = refundRes.data
        io.getOrder(refund.orderitem_id)
          .then(orderRes => {
            order = orderRes.data
            that.setState({
              loading: false,
              refund,
              order,
            })
          })
      })
  }

  openImgPreview(e) {
    e.preventDefault()
    const imgs = this.state.refund.images
    modal({
      component: ImgPreview,
      args: {
        imgs,
      },
      title: '图片凭证',
      size: 'lg',
    })
  }

  render() {
    if (this.state.loading) {
      return (<Loading />)
    }

    const {refund, order} = this.state

    return (
      <div className='wrap js-wrap'>
        <div className='refund'>
          <div className='detail'>
            <div className='detail__hd'>售后详情</div>
            <div className='detail__band'>
              <h1 className='detail__band-title'>售后状态</h1>
              <div className='detail__band-status'>{statusDisplayname(refund.status)}</div>
            </div>
            <div className='detail__band'>
              <h1 className='detail__band-title'>售后信息</h1>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>售后类型：</label>{typeDisplayname(refund.refund_type)}
                    </td>
                    <td>
                      <label>申请时间：</label>{utils.toFriendlyDate(refund.created_at, true)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='2'>
                      {refund.images.length > 0 ? (
                        <div className='clearfix'>
                          <span className='pull-left'><label>图片凭证：</label></span>
                          <div
                            className='clickable-img pull-left'
                            style={{width: 'auto'}}
                            onClick={this.openImgPreview}
                          >
                            <img className='pull-left' src={refund.images[0]} style={{width: '60px'}} alt='' />
                            <p className='pull-left small muted' style={{marginLeft: '8px', marginTop: '15px'}}>
                              {refund.images.length} 张
                            </p>
                          </div>
                        </div>
                      ) : (<div><label>图片凭证：</label><span>无</span></div>) }
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='2'>
                      <label>申请说明：</label><span className='muted'>{refund.description}</span>
                    </td>
                  </tr>
                  <tr>
                    <td><label>物流公司：</label>{refund.ship_carrier.display_name || '无'}</td>
                    <td><label>物流单号：</label>{refund.waybill_number || '无'}</td>
                  </tr>
                  <tr>
                    <td
                      colSpan='2'
                      className='p0'
                    >
                      <label>退款金额：</label>
                      {utils.toFriendlyPrice(refund.refund_amount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <OrderDetail {...order} readonly contentonly />
          </div>
        </div>
      </div>
    )
  }
}

export default Refund
