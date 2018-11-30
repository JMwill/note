import React, {PureComponent} from 'react'

import config from '../../config'
import utils from '../../utils'
import io from '../../io'

import Empty from '../../components/empty'
import alert from '../../components/alert'

const max_limit = config.getAppConfig('max_limit')

class LookupShelf extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      meta: {},
      objects: [],
      keyword: '',
      loading: true,
      checked: [],
    }

    this.loadData = this.loadData.bind(this)
    this.search = this.search.bind(this)
    this.renderTable = this.renderTable.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
    this.confirm = this.confirm.bind(this)
  }

  componentDidMount() {
    this.loadData({
      offset: 0,
      limit: max_limit,
      shelf_type: this.props.shelf_type,
    })
  }

  loadData(params) {
    io.getShelfList(params)
      .then(res => {
        this.setState({
          objects: [...res.data.objects],
          meta: {...res.data.meta},
          loading: false,
        })
      })
      .catch(err => {
        this.setState({
          objects: [],
          meta: {},
          loading: false,
        })
        utils.fail(err)
      })
  }

  search() {
    const keyword = this.keyword_node.value.trim()
    this.setState({
      keyword: keyword,
    })
  }

  handleChecked(checked, item) {
    let checkedList = this.state.checked
    if (checked) {
      checkedList.push(item)
    } else {
      checkedList = _.filter(checkedList, x => x.id !== item.id)
    }
    this.setState({
      checked: checkedList,
    })
  }

  confirm() {
    if (this.state.checked.length === 0) {
      alert('至少选择一项')
      return
    }
    this.props.onChange(this.state.checked)
    this.props.close()
  }

  renderTable() {
    let list = this.state.objects
    if (this.state.keyword) {
      list = _.filter(list, x => x.name.indexOf(this.state.keyword) > -1)
    }

    if (this.props.excluded.length > 0) {
      list = _.filter(list, x => this.props.excluded.indexOf(x.id) === -1)
    }

    if (list.length === 0) {
      return (
        <Empty />
      )
    }

    return (
      <ul className='list-group mb-0'>
        {list.map(item => (
          <li className='list-group-item' key={item.id} style={{padding: '0'}}>
            <label style={{display: 'block', margin: '0', padding: '10px 15px', cursor: 'pointer'}}>
              <input
                type='checkbox'
                onChange={(e) => this.handleChecked(e.target.checked, item)}
              />
              <span style={{display: 'inline-bock', marginLeft: '8px'}}>{item.name}</span>
            </label>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='lock' style={{height: '400px'}}>
          <div className='loader' />
          <div className='mask' />
        </div>
      )
    }

    return (
      <div className='lookup'>
        <div className='lookup__hd' style={{marginBottom: '12px'}}>
          <div className='pepe-flex'>
            <div className='pepe-flex__item'>
              <input
                ref={(e) => { this.keyword_node = e }}
                type='text'
                className='form-control'
                placeholder='请输入关键字搜索'
              />
            </div>
            <div style={{marginLeft: '24px'}}>
              <button className='btn btn-primary' onClick={this.search}>搜索</button>
            </div>
          </div>
        </div>
        <div className='lookup__bd' style={{height: '431px', overflow: 'auto'}}>
          {this.renderTable()}
        </div>
        <div className='lookup__ft' style={{marginTop: '28px', overflow: 'hidden'}}>
          <button className='btn btn-primary pull-right' onClick={this.confirm}>确定</button>
        </div>
      </div>
    )
  }
}

LookupShelf.defaultProps = {
  shelf_type: 'normal',
  excluded: [],
  onChange() {},
  close() {},
}

export default LookupShelf
