import Empty from './empty'
import io from '../io'
import lock from './lock'
import Paginator from './paginator'
import React, {PureComponent} from 'react'
import utils from '../utils'

const limit = 10

class Lookup extends PureComponent {
  constructor(props) {
    super(props)

    if (props.type === 'SHELF') {
      this.name_field = 'name' // 货架的
      this.io_method = 'getShelfList'
    } else if (props.type === 'PRODUCT') { // 商品的
      this.name_field = 'title'
      this.io_method = 'getProductList'
    } else if (props.type === 'VENDOR') { // 品牌商
      this.name_field = 'name'
      this.io_method = 'getVendorList'
    } else if (props.type === 'SUPPLIER') { // 供应商
      this.name_field = 'name'
      this.io_method = 'getSupplierList'
    } else if (props.type === 'SHIPPING_RATE_SCHEDULE') { // 供应商
      this.name_field = 'name'
      this.io_method = 'getLogisticsList'
    } else {
      throw new Error('无法识别 type: ' + props.type + '')
    }

    this.state = {
      meta: {},
      objects: null,
      params: {},
      loading: false,
      enabledMap: {},
    }

    this.loadData = this.loadData.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    this.loadData({
      offset: 0,
      limit,
    })
  }

  loadData(params) {
    this.setState({
      loading: true,
    })
    const unlock = lock(this.lookup_node)

    let options = {
      ...params,
      ...this.props.filter,
    }

    io[this.io_method](options)
      .then(res => {
        if (!this.props.activityId) {
          unlock()
          this.setState({
            loading: false,
            params: {...params},
            objects: [...res.data.objects],
            meta: {...res.data.meta},
          })
        } else {
          io.validActivityProduct({
            activity_id: this.props.activityId,
            product_id__in: res.data.objects.map(x => x.id),
          })
            .then(productRes => {
              unlock()
              this.setState({
                loading: false,
                params: {...params},
                objects: [...res.data.objects],
                meta: {...res.data.meta},
                enabledMap: {...productRes.data},
              })
            })
        }
      })
      .catch(err => {
        utils.fail(err)
      })
  }

  search() {
    const keyword = this.keyword_node.value.trim()
    const params = {
      offset: 0,
      keyword,
      limit,
    }

    this.loadData(params)
  }

  renderTable() {
    if (this.state.objects === null) return null

    if (_.result(this.state.objects, 'length') === 0) {
      return (
        <Empty />
      )
    }

    return (
      <ul className='list-group mb-0'>
        {this.state.objects.map(item => (
          <li
            key={item.id}
            style={{cursor: 'pointer'}}
            className={(this.props.activityId && !this.state.enabledMap[item.id])
              ? 'list-group-item disabled'
              : 'list-group-item'}
            onClick={(e) => {
              e.preventDefault()
              if (this.props.activityId && !this.state.enabledMap[item.id]) {
                return
              }
              this.props.onChange(item.id, item[this.name_field], item)
              this.props.close && this.props.close()
            }}
          >
            {item[this.name_field]}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className='lookup' ref={(e) => { this.lookup_node = e }}>
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
              <button className='btn btn-primary btn-bordered' onClick={this.search}>搜索</button>
            </div>
          </div>
        </div>
        <div className='lookup__bd'>
          {this.renderTable()}
        </div>
        <div className='lookup__ft'>
          <Paginator
            {...this.state.meta}
            go={(offset) => {
              this.loadData({
                ...this.state.params,
                offset,
              })
            }}
          />
        </div>
      </div>
    )
  }
}

Lookup.defaultProps = {
  activityId: 0,
  filter: {},
  onChange() {
  },
}

export default Lookup
