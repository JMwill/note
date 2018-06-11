import $ from 'jquery'
import _ from 'lodash'
import React, {PureComponent} from 'react'

import io from '../../../io'
import utils from '../../../utils'

import alert from '../../../components/alert'
import lock from '../../../components/lock'
import Paginator from '../../../components/paginator'

const colgroupPart = (
  <colgroup>
    <col style={{width: '50px'}} />
    <col style={{width: '100px'}} />
    <col style={{width: '243px'}} />
  </colgroup>
)

class Editor extends PureComponent {
  constructor(props) {
    super(props)

    const defaultParams = {
      ...props.filter,
      offset: props.offset,
      limit: props.limit,
    }

    this.state = {
      meta: {
        offset: 0,
        limit: 0,
        total_count: 0,
      },
      objects: [],
      checkedIds: [],
      params: defaultParams,
    }

    this.doAction = this.doAction.bind(this)
    this.getList = this.getList.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onCheckAll = this.onCheckAll.bind(this)
    this.onKeywordChange = this.onKeywordChange.bind(this)
    this.scrollTop = this.scrollTop.bind(this)
  }

  doAction() {
    if (this.state.checkedIds.length === 0) {
      alert('至少选择一个选项')
      return
    }
    const unlock = lock(this._actionNode)
    this.props.doAction(this.state.checkedIds)
      .then(() => {
        this.getList({
          ...this.state.params,
          offset: 0,
        })
        this.props.notify()
        unlock()
      })
      .catch(err => {
        unlock()
        utils.fail(err)
      })
  }

  getList(params) {
    const unlock = lock(this._listNode)
    io.getProductList(params)
      .then(res => {
        unlock()
        this.setState({
          objects: res.data.objects,
          meta: res.data.meta,
          checkedIds: [],
          params,
        })
      })
      .catch(err => {
        unlock()
        utils.fail(err)
      })
  }

  onCheck(id, checked) {
    if (checked) {
      this.setState({
        checkedIds: [...this.state.checkedIds, id],
      })
    } else {
      this.setState({
        checkedIds: _.filter(this.state.checkedIds, item => item != id),
      })
    }
  }

  onCheckAll(checked) {
    if (!checked) {
      this.setState({
        checkedIds: [],
      })
    } else {
      this.setState({
        checkedIds: _.map(this.state.objects, item => item.id),
      })
    }
  }

  onKeywordChange(e) {
    const keyword = e.target.value
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.scrollTop()
      this.getList({
        ...this.state.params,
        offset: 0,
        keyword,
      })
    }, 500)
  }

  scrollTop() {
    $(this._listNode).animate({
      scrollTop: '0px',
    }, 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.identifier !== nextProps.identifier) {
      this.getList({
        ...this.state.params,
        offset: 0,
      })
    }
  }

  componentDidMount() {
    this.getList({
      ...this.state.params,
      offset: 0,
    })
  }

  render() {
    const {
      searchLabel,
      actionLabel,
      actionIcon,
      actionClass,
    } = this.props

    const {
      meta,
      objects,
      checkedIds,
      params,
    } = this.state

    const hasPagination = meta.total_count > meta.limit
    const isChecked = checkedIds.length > 0 && checkedIds.length === objects.length

    return (
      <div className='product-table'>
        <div className='product-table__hd'>
          <label>{searchLabel}</label>
          <input
            className='form-control'
            type='text'
            placeholder='请输入商品关键字 / 商品 ID 搜索商品'
            onChange={this.onKeywordChange}
          />
        </div>
        <div className='product-table__bd'>
          <table>
            {colgroupPart}
            <tbody>
              <tr>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => this.onCheckAll(e.target.checked)}
                    checked={isChecked}
                  />
                </td>
                <td>
                  商品 ID
                </td>
                <td>
                  商品名称
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{height: hasPagination ? '268px' : '300px'}}
            className='product-table__scroll'
            ref={node => (this._listNode = node)}>
            <table>
              {colgroupPart}
              <tbody>
                {objects.map(item => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type='checkbox'
                        checked={checkedIds.indexOf(item.id) > -1}
                        onChange={e => this.onCheck(item.id, e.target.checked)}
                      />
                    </td>
                    <td>
                      {item.id}
                    </td>
                    <td>
                      {item.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='product-table__ft'>
          <Paginator
            className='pull-left'
            {...this.state.meta}
            go={(offset) => {
              this.scrollTop()
              this.getList({
                ...params,
                offset,
              })
            }}
            size='sm'
          />
          <div>
            <button
              className={`btn btn-sm with-icon ${actionClass}`}
              onClick={this.doAction}
              ref={node => (this._actionNode = node)}
            >
              <i className={actionIcon} />{actionLabel}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Editor.defaultProps = {
  searchLabel: '',
  actionLabel: '',
  actionIcon: '',
  actionClass: '',
  filter: {},
  limit: 20,
  offset: 0,
  identifier: 0,
  notify() {},
}

export default Editor
