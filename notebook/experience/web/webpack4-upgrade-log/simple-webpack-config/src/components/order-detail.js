import _ from 'lodash'
import React, {PureComponent} from 'react'

import config from '../config'
import utils from '../utils'

import TableColgroup from './table-colgroup'

const statusDisplayname = config.makeEnumDisplayName('order_status')
const statusClassMap = {
  'initiated': 'danger',
  'cancelled': 'ignore',
  'processing': 'danger',
  'shipped': 'danger',
  'delivered': '',
}

const total_width = 840
const cell_width_list = [280, 188, 100, 100, 100, 72]
const colgroup = (
  <TableColgroup total_width={total_width} cell_width_list={cell_width_list} />
)

class OrderDetail extends PureComponent {
  render() {
    const {
      contact_info,
      contentonly,
      cover_image,
      final_cost,
      memo,
      orderid,
      paid_at,
      product_type,
      quantity,
      readonly,
      serial_number,
      ship_carrier,
      spec_str,
      status,
      title,
      tracking_info,
      transaction_id,
      unit_price,
      user_message,
      waybill_number,

      openShippingEditor,
    } = this.props

    const is_gift = this.props.gift_order != null

    let part = null

    let updateActionPart = null
    if (!readonly && status === 'shipped') {
      updateActionPart = <a href='#' onClick={(e) => { e.preventDefault(); openShippingEditor() }}>点击修改</a>
    }

    const hasExtra = user_message || memo.length > 0

    if (!_.isEmpty(ship_carrier) && ship_carrier.value != null) {
      part = (
        <tbody>
          <tr>
            <td><label>物流公司：</label>{ship_carrier.display_name}</td>
            <td className='pb-0'>
              <label>物流单号：</label>{waybill_number}
              {' '}
              {updateActionPart}
            </td>
          </tr>
          {tracking_info != null && tracking_info.length > 0 ? (
            <tr>
              <td colSpan='2'>
                <div className='tracking-info'>
                  <div className='time-line'>
                    <ul>
                      {tracking_info.map((item, idx) => (
                        <li key={item.time} className={idx === 0 ? 'active' : ''}>
                          <i className='time-line__dot' />
                          <div className='time-line__hd'>
                            {item.time}
                          </div>
                          <div className='time-line__bd'>
                            {item.context}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ) : null}
        </tbody>
      )
    } else if (!readonly && status === 'processing') {
      part = (
        <tr>
          <td
            className='pb-0'
            style={{paddingTop: '12px'}}
          >
            <button
              className='btn btn-primary btn-bordered'
              onClick={(e) => { e.preventDefault(); openShippingEditor() }}
            >
              发货
            </button>
          </td>
        </tr>
      )
    }

    return (
      <div className={contentonly ? '' : 'detail'}>
        {contentonly ? (null) : (
          <div>
            <div className='detail__hd'>订单详情</div>
            <div className='detail__band'>
              <h1 className='detail__band-title'>订单状态</h1>
              <div className={`detail__band-status ${statusClassMap[status]}`}>{statusDisplayname(status)}</div>
            </div>
          </div>
        )}
        <div className='detail__band'>
          <h1 className='detail__band-title'>订单信息</h1>
          <table>
            <tbody>
              <tr>
                <td><label>订单编号：</label>{orderid}</td>
                <td><label>订单序列号：</label>{serial_number}</td>
              </tr>
              <tr>
                <td><label>支付单号：</label>{transaction_id}</td>
                <td><label>支付时间：</label>{utils.toFriendlyDate(paid_at, true)}</td>
              </tr>
            </tbody>
          </table>

          <table className='pepe-table detail-table'>
            {colgroup}
            <thead>
              <tr><th>商品</th><th>商品 SKU</th><th>单价</th><th>数量</th><th>实收付款</th><th style={{padding: '0'}}>订单状态</th></tr>
            </thead>
            <tbody>
              <tr>
                <td style={{borderLeft: 0}}>
                  <div className='pepe-media'>
                    <img src={cover_image} alt={title} />
                    <div className='pepe-media__title' title={title}>
                      {title}
                    </div>
                    {is_gift && (<div className='pepe-media__label'>
                      <span>送礼</span>
                    </div>)}
                  </div>
                </td>
                <td>
                  <ul>
                    {utils.toCSVList(spec_str).map(s => (
                      <li className='spec-item' title={s.value} key={s.value}>
                        {s.label}：{s.value}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  {utils.toFriendlyPrice(unit_price)}
                </td>
                <td>
                  {quantity}
                </td>
                <td>
                  {utils.toFriendlyPrice(final_cost)}
                </td>
                <td style={{padding: '0'}}>
                  <span className={statusClassMap[status]}>
                    {statusDisplayname(status)}
                  </span>
                </td>
              </tr>
              {hasExtra && (
                <tr>
                  <td colSpan='6'>
                    <div>
                      <ul className='pepe-list'>
                        {user_message && <li><span className='muted'>用户留言</span>：{user_message}</li>}
                        {memo.length > 0 && (
                          <li>
                            {memo.filter(x => !!x.value).map((x, xindex) =>
                              <span
                                style={{marginRight: '16px'}}
                                key={xindex}
                              >
                                <span className='muted'>{x.display_name}</span>：{x.value}
                              </span>
                            )}
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {product_type === 'physical' && status !== 'pending_redemption' && <div className='detail__band'>
          <h1 className='detail__band-title'>买家信息</h1>
          <table>
            <tbody>
              <tr>
                <td><label>买家呢称：</label>{contact_info.contact}</td>
                <td><label>联系方式：</label>{contact_info.phone}</td>
              </tr>
              <tr>
                <td colSpan='2' style={{paddingBottom: '0'}}><label>联系地址：</label>{contact_info.address}</td>
              </tr>
            </tbody>
          </table>
        </div>}

        {product_type === 'physical' && status !== 'pending_redemption' && <div className='detail__band'>
          <h1 className='detail__band-title'>物流信息</h1>
          <table>
            <tbody>
              <tr>
                <td colSpan='2'><label>收货地址：</label>{contact_info.address}</td>
              </tr>
            </tbody>
            {part}
          </table>
        </div>}

      </div>
    )
  }
}

OrderDetail.defaultProps = {
  readonly: false,
  contentonly: false,
}

export default OrderDetail
