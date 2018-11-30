import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

import config from '../../config'
import utils from '../../utils'
import io from '../../io'

import modal from '../../components/modal'
import ShippingEditor from '../../components/shipping-editor'
import MemoList from '../../components/memo-list'
import confirm from '../../components/confirm'

const statusDisplayname = config.makeEnumDisplayName('order_status')
const statusClassMap = {
  'initiated': 'danger',
  'cancelled': 'ignore',
  'processing': 'danger',
  'shipped': 'danger',
  'delivered': '',
  'pending_redemption': '',
}

function UserMessage({content, close}) {
  return (
    <div className='pepe-modal-table'>
      <div>{content}</div>
      <div className='ft'>
        <button className='btn btn-primary' onClick={close}>确定</button>
      </div>
    </div>
  )
}

function mapToItem(raw) {
  const fee = raw.orderShippingFee || 0
  const refund_id = raw.refund_id || 0
  return {
    ...raw,
    spec_str__computed: utils.toCSVList(raw.spec_str),
    status__str: statusDisplayname(raw.status),
    unit_price__str: utils.toFriendlyPrice(raw.unit_price),
    detail_url: `/order/${raw.id}/`,
    is_gift: raw.gift_order != null,
    orderFinalCostStr: utils.toFriendlyPrice(raw.orderFinalCost),
    orderShippingFeeStr: utils.toFriendlyPrice(fee),
    refundDetailUrl: `/order/refund/${refund_id}/`,
  }
}

class OrderTableItem extends PureComponent {
  constructor(props) {
    super(props)
    this.showMessage = this.showMessage.bind(this)
    this.openShippingEditor = this.openShippingEditor.bind(this)
    this.openMemoList = this.openMemoList.bind(this)
  }

  openShippingEditor(e) {
    e.preventDefault()
    const {reloadOrderList, orderitem} = this.props

    if (orderitem.product_type === 'virtual') {
      confirm({
        message: '确定要发货吗？',
        ok() {
          io.shipOrder(orderitem.id, {status: 'shipped'})
            .then(() => {
              reloadOrderList()
            })
        },
      })
    } else {
      modal({
        component: ShippingEditor,
        args: {
          orderitem_id: orderitem.id,
          onSuccess() {
            reloadOrderList()
          },
        },
        title: '物流信息填写',
      })
    }
  }

  openMemoList(e) {
    e.preventDefault()
    modal({
      component: MemoList,
      args: {
        type: 'ORDER',
        id: this.props.orderitem.id,
      },
      title: '订单备注',
    })
  }

  showMessage(e) {
    e.preventDefault()
    modal({
      component: UserMessage,
      args: {
        content: this.props.orderitem.user_message,
      },
      title: '买家留言',
      size: 'sm',
    })
  }

  renderAction() {
    return (
      <div>
        {this.props.orderitem.status === 'processing' && (
          <p>
            <button
              onClick={this.openShippingEditor}
              className='btn btn-primary btn-bordered btn-sm'
            >
              发货
            </button>
          </p>
        )}
        <p>
          <button
            onClick={this.openMemoList}
            className='btn btn-primary btn-bordered btn-sm'
          >
            订单备注
          </button>
        </p>
      </div>
    )
  }

  render() {
    const {
      orderitem,
    } = this.props
    const item = mapToItem(orderitem)
    let extraColSpan = 4
    if (orderitem.single) {
      extraColSpan = 7
    }

    const hasExtra = item.user_message || item.memo.length > 0

    let s1 = {}
    let s2 = {}
    let s3 = {
      border: '2px solid #f6f9fc',
      borderLeft: 0,
      borderRight: 0,
    }

    if (!orderitem.single) {
      s1 = {
        border: '2px solid #f6f9fc',
        borderTop: 0,
        borderBottom: 0,
      }

      s2 = {
        border: '2px solid #f6f9fc',
      }
    }

    return (
      <tbody>
        <tr>
          <td className='first' title={item.title} style={s3}>
            <div className='pepe-media'>
              <img src={item.cover_image} alt={item.title} />
              <div className='pepe-media__title' title={item.title}>
                {item.title}
              </div>
              {item.is_gift && (<div className='pepe-media__label'>
                <span>送礼</span>
              </div>)}
              {item.spec_str__computed.length > 0 && (
                <ul className='pepe-list' style={{marginTop: '10px', color: '#9ba4b0'}}>
                  {item.spec_str__computed.map(s => <li key={s.value}>{s.label}: {s.value}</li>)}
                </ul>
              )}
            </div>
          </td>
          <td style={s3}>
            {item.unit_price__str}
          </td>
          <td style={s3}>
            {item.quantity}
          </td>
          <td style={s3}>
            <ul className='pepe-list'>
              <li className={statusClassMap[item.status]}>
                {item.status__str}
              </li>
              <li>
                <Link to={item.detail_url}>订单详情</Link>
              </li>
              {item.ship_carrier && item.ship_carrier.display_name && (
                <li>配送：{item.ship_carrier.display_name}</li>
              )}
              {!!item.refund_id && (
                <li>
                  <Link to={item.refundDetailUrl}>售后详情</Link>
                </li>
              )}
            </ul>
          </td>
          <td style={s1}>
            {item.first && item.buyer != null && (
              <div style={{padding: '0 16px'}}>
                <ul className='pepe-list'>
                  <li>{item.buyer.name}</li>
                  {item.buyer.phone && (<li>{item.buyer.phone}</li>)}
                </ul>
              </div>
            )}
          </td>
          <td style={s1}>
            {item.first && (
              <div style={{padding: '0 16px'}}>
                <ul className='pepe-list'>
                  <li>{item.orderFinalCostStr}</li>
                  <li style={{fontSize: '12px'}}>(运费：{item.orderShippingFeeStr})</li>
                </ul>
              </div>
            )}
          </td>
          <td className='table-action-group' style={s2} rowSpan={hasExtra && !orderitem.single ? 2 : 1}>
            <div style={{padding: '0 16px'}}>
              {this.renderAction()}
            </div>
          </td>
        </tr>
        {hasExtra && (
          <tr>
            <td colSpan={extraColSpan} style={{padding: '0'}}>
              <div className='extra'>
                {item.user_message && (
                  <p>
                    用户留言：{item.user_message}
                  </p>
                )}
                {item.memo.length > 0 && (
                  <p>
                    {item.memo.filter(x => !!x.value).map((x, xindex) =>
                      (<span className='memo-text' key={xindex}>{x.display_name}：{x.value}</span>)
                    )}
                  </p>
                )}
              </div>
            </td>
            {!orderitem.single && (
              <td style={s1} />
            )}
            {!orderitem.single && (
              <td style={s1} />
            )}
          </tr>
        )}
      </tbody>
    )
  }
}

export default OrderTableItem
