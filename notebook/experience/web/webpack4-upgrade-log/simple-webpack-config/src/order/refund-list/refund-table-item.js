import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

import config from '../../config'
import utils from '../../utils'

import confirm from '../../components/confirm'
import ImgPreview from '../../components/img-preview'
import MemoList from '../../components/memo-list'
import modal from '../../components/modal'

import RefundAmountEditor from './refund-amount-editor'

const statusDisplayname = config.makeEnumDisplayName('refund_status')
const typeDisplayname = config.makeEnumDisplayName('refund_type')

function mapToItem(raw) {
  return {
    ...raw,
    created_at__str: utils.toFriendlyDate(raw.created_at),
    amount__str: utils.toFriendlyPrice(raw.refund_amount),
    spec_str__computed: utils.toCSVList(raw.spec_str),
    status__str: statusDisplayname(raw.status),
    type__str: typeDisplayname(raw.refund_type),
    detail_url: `/order/refund/${raw.id}/`,
    is_gift: raw.gift_order != null,
  }
}

class RefundTableItem extends PureComponent {
  constructor(props) {
    super(props)

    this.openMemoList = this.openMemoList.bind(this)
    this.openImgPreview = this.openImgPreview.bind(this)
    this.handleRefund = this.handleRefund.bind(this)
    this.handleAccept = this.handleAccept.bind(this)
    this.handleReject = this.handleReject.bind(this)
  }

  openImgPreview(e) {
    e.preventDefault()
    const imgs = this.props.refund.images
    modal({
      component: ImgPreview,
      args: {
        imgs,
      },
      title: '图片凭证',
      size: 'lg',
    })
  }

  openMemoList(e) {
    e.preventDefault()

    modal({
      component: MemoList,
      args: {
        type: 'REFUND',
        id: this.props.refund.id,
      },
      title: '售后备注',
    })
  }

  handleAccept(e) {
    e.preventDefault()
    const id = this.props.refund.id
    const updateRefundStatus = this.props.updateRefundStatus
    const sales_mode = this.props.refund.sales_mode
    const currentStatus = this.props.refund.status

    let nextStatus = null

    // 代销
    if (sales_mode === 'consignment') {
      if (currentStatus === 'approved') {
        nextStatus = 'item_received'
      } else {
        nextStatus = 'approved'
      }
    } else {
      nextStatus = 'item_received'
    }

    confirm({
      title: '通过退款',
      message: '确定要通过吗？',
      ok() {
        updateRefundStatus(id, nextStatus, null, `[data-action=${id}]`)
      },
    })
  }

  handleReject(e) {
    e.preventDefault()
    const id = this.props.refund.id
    const updateRefundStatus = this.props.updateRefundStatus
    const currentStatus = this.props.refund.status

    let nextStatus = null

    // 供应商待确认
    if (currentStatus === 'approved') {
      nextStatus = 'pending_review'
    } else {
      nextStatus = 'denied'
    }

    modal({
      component: MemoList,
      args: {
        type: 'REFUND',
        id,
        asTextEditor: true,
        placeholder: '请填写驳回理由',
        onSuccess(content) {
          updateRefundStatus(id, nextStatus, content, `[data-action=${id}]`)
        },
      },
      title: '售后备注',
    })
  }

  handleRefund(e) {
    e.preventDefault()
    const id = this.props.refund.id
    const refund_amount = this.props.refund.refund_amount
    const final_cost = this.props.refund.final_cost
    const shipping_rate = this.props.refund.shipping_rate
    const reloadRefundList = this.props.reloadRefundList

    modal({
      component: RefundAmountEditor,
      args: {
        id,
        refund_amount,
        final_cost,
        shipping_rate,
        onSuccess() {
          reloadRefundList()
        },
      },
      title: '输入退款金额',
    })
  }

  render() {
    const {
      refund,
      selected,
      dirty,
      colgroup,

      onToggleRefund,
    } = this.props
    const item = mapToItem(refund)

    let actionBtns = (<span>-</span>)
    const showConfirm = status => status === 'pending_review' || status === 'approved'
    if (!dirty && showConfirm(refund.status)) {
      actionBtns = (
        <div data-action={refund.id}>
          <p>
            <button className='btn btn-primary btn-sm btn-bordered' onClick={this.handleAccept}>通过</button>
          </p>
          <p>
            <button className='btn btn-default btn-sm btn-bordered' onClick={this.handleReject}>驳回</button>
          </p>
        </div>
      )
    } else if (!dirty && refund.status === 'item_received') {
      actionBtns = (
        <div data-action={refund.id}>
          <button className='btn btn-primary btn-sm btn-bordered' onClick={this.handleRefund}>退款</button>
        </div>
      )
    }

    return (
      <table className='pepe-table solo'>
        {colgroup}
        <thead>
          <tr className='order-table__heading'>
            <td className='first' colSpan='7'>
              <input
                checked={selected}
                type='checkbox'
                onChange={(e) => { onToggleRefund(e.target.checked, item.id) }}
              />
              <span className='text-item'>
                单号：<span>{item.orderid}</span>
              </span>
              <span className='text-item'>序列号：<span>{item.serial_number}</span></span>
              <span className='text-item'>申请时间：<span>{item.created_at__str}</span></span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='first'>
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
            <td>
              <ul className='pepe-list'>
                <li>
                  {item.type__str}
                </li>
              </ul>
            </td>
            <td className='img'>
              {item.images.length > 0
                ? (<div
                  className='clickable-img'
                  onClick={this.openImgPreview}
                >
                  <img src={item.images[0]} alt='' />
                  <p className='small muted'>{item.images.length} 张</p>
                </div>)
                : (<span>-</span>)}
            </td>
            <td>
              <ul className='pepe-list'>
                <li>{item.contact_info.contact}</li>
                <li>{item.contact_info.phone}</li>
              </ul>
            </td>
            <td>
              <ul className='pepe-list'>
                <li className='muted'>
                  {item.status__str}
                </li>
                <li>
                  <Link to={item.detail_url}>售后详情</Link>
                </li>
                <li>
                  <a className='muted-link' href='#' onClick={this.openMemoList}>售后备注</a>
                </li>
              </ul>
            </td>
            <td>
              <ul className='pepe-list'>
                {item.status === 'refund_issued' && (
                  <li>实退：</li>
                )}
                <li>{item.amount__str}</li>
              </ul>
            </td>
            <td className='table-action-group'>
              {actionBtns}
            </td>
          </tr>
          {item.description && (
            <tr>
              <td colSpan='7' style={{padding: 0}}>
                <div className='extra'>
                  <p>申请说明：{item.description}</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default RefundTableItem
