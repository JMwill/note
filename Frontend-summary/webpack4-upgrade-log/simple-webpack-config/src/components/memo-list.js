import React, {PureComponent} from 'react'
import lock from './lock'
import io from '../io'
import alert from './alert'
import Timeline from './timeline'
import config from '../config'
import _ from 'lodash'
import utils from '../utils'

const displayNameMap = {
  'ORDER': config.makeEnumDisplayName('order_status'),
  'REFUND': config.makeEnumDisplayName('refund_status'),
}

function mapToItem(type, item) {
  return ({
    title: displayNameMap[type](item.status),
    date: utils.toFriendlyDate(item.created_at),
    content: item.content,
  })
}

function mapToItems(type, data) {
  return _.map(data, item => mapToItem(type, item))
}

class MemoList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      first_loading: true,
    }

    this.addMemo = this.addMemo.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  componentDidMount() {
    let params = {
      offset: 0,
      limit: 1000,
    }
    const that = this
    const {id, type} = that.props
    let method = ''

    if (type === 'ORDER') {
      method = 'getOrderMemoList'
    } else if (type === 'REFUND') {
      method = 'getRefundMemoList'
    }

    if (method === '') return

    const unlock = lock(that.container)
    io[method](id, params)
      .then(res => {
        unlock()
        that.setState({
          items: mapToItems(type, res.data.objects),
          first_loading: false,
        })
      })
      .catch(err => {
        utils.fail(err)
      })
  }

  cancel(e) {
    e.preventDefault()
    this.props.close && this.props.close()
  }

  addMemo(e) {
    e.preventDefault()
    const that = this

    const content = that.content_node.value.trim()

    if (content.length === 0) {
      alert(that.props.placeholder)
      return
    }

    if (that.props.asTextEditor) {
      that.props.onSuccess(content)
      that.props.close && that.props.close()
      return
    }

    const {id, type} = that.props
    let item = null
    let method = ''
    let params = {content}

    if (type === 'ORDER') {
      method = 'addOrderMemo'
    } else if (type === 'REFUND') {
      method = 'addRefundMemo'
    }

    if (method === '') return

    const unlock = lock(that.container)
    io[method](id, params)
      .then(res => {
        unlock()
        item = mapToItem(type, res.data)
        that.setState({
          items: [item, ...this.state.items],
        })
        that.content_node.value = ''
        that.props.onSuccess(id)
        if (that.props.closeWhenSuccess) {
          that.props.close && that.props.close()
        }
      })
      .catch(err => {
        alert(err.data)
      })
  }

  render() {
    return (
      <div className='memo-list' ref={(container) => { this.container = container }}>
        <div className='memo-list__bd'>
          {this.state.first_loading ? null : (<Timeline items={this.state.items} />)}
        </div>
        <div className='memo-list__ft'>
          <div className='memo-list__ft-content' >
            <textarea
              ref={(node) => { this.content_node = node }}
              className='form-control'
              rows='4'
              placeholder={this.props.placeholder}
            />
          </div>
          <div className='memo-list__ft-action'>
            <button className='btn btn-primary' onClick={this.addMemo}>确定</button>
            <button className='btn btn-default' onClick={this.cancel}>取消</button>
          </div>
        </div>
      </div>
    )
  }
}

MemoList.defaultProps = {
  id: '', // 订单或备注的 ID
  type: '', // 支持 订单的备注 ORDER， 售后的备注 REFUND
  onSuccess() {},
  closeWhenSuccess: false,
  placeholder: '请输入您的备注',
  asTextEditor: false,
}

export default MemoList
