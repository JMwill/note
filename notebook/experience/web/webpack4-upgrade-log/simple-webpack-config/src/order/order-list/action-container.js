import _ from 'lodash'
import React, {PureComponent} from 'react'
import RSelect from 'react-select'
import {connect} from 'react-redux'
import {Form, Text, Select} from 'react-form'
import $ from 'jquery'

import config from '../../config'
import utils from '../../utils'
import io from '../../io'

import alert from '../../components/alert'
import InputDateRange from '../../components/input-date-range'
import lock from '../../components/lock'

import * as actions from './redux'

const InputDateRangeExt = utils.withReactFromField(InputDateRange)

class OrderListAction extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectedOrderState: [],
      selectedOrderType: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.batchShip = this.batchShip.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.handleOrderType = this.handleOrderType.bind(this)
    this.handleOrderState = this.handleOrderState.bind(this)
  }

  handleSubmit(values) {
    values.created_at = values.created_at || {}

    const {selectedOrderState, selectedOrderType} = this.state
    const params = utils.compact({
      created_at__gte: values.created_at['from'],
      created_at__lt: values.created_at['to'],
      keyword: values.keyword,
      status__in: selectedOrderState.toString(),
      order_type__in: selectedOrderType.toString(),
      product_type: values.product_type,
    })

    if (this.cmd === 'filter') {
      this.props.getOrderList({
        params,
      })
    } else if (this.cmd === 'export') {
      this.props.exportOrder(this.export_node, params)
    }
  }

  handleFilter() {
    this.cmd = 'filter'
  }

  handleExport() {
    this.cmd = 'export'
  }

  batchShip(e) {
    e.preventDefault()
    $(this.fileNode).click()
  }

  handleOrderState(selectedOrderState) {
    this.setState({selectedOrderState})
  }

  handleOrderType(selectedOrderType) {
    this.setState({selectedOrderType})
  }

  onFileChange() {
    const accept = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]
    const files = $(this.fileNode)[0].files
    if (files == null || files.length === 0) return

    if (_.indexOf(accept, files[0].type) === -1) {
      alert('请上传 .xls/.xlsx 文件')
      return
    }

    const unlock = lock()

    const formData = new FormData()
    formData.append('file', files[0])

    io.shipBatch(formData)
      .then(() => {
        alert({
          message: '操作成功',
          ok: () => this.props.reloadOrderList(),
        })
        unlock()
        $(this.fileNode).val(null)
      })
      .catch(() => {
        alert('请上传有效的 .xls/.xlsx 文件')
        unlock()
      })
  }

  render() {
    const order_status_list = _.map(config.getEnums('order_status'), x => ({label: x.name, value: x.id}))

    const order_type_list = _.map(config.getEnums('order_type'), x => ({label: x.name, value: x.id}))

    const product_type_list = _.map(config.getEnums('product_type'), x => ({label: x.name, value: x.id}))

    const {selectedOrderState, selectedOrderType} = this.state

    return (
      <div className='order-list-action'>
        <div className='box'>
          <Form
            onSubmit={this.handleSubmit}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <div className='row'>
                    <div className='col-xs-5'>
                      <div className='form-group'>
                        <label className='control-label'>关键字</label>
                        <div>
                          <Text
                            placeholder='请输入序列号／下单人名／联系电话／商品名称／订单编号'
                            className='form-control'
                            field='keyword'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xs-4'>
                      <div className='form-group'>
                        <label className='control-label'>订单状态</label>
                        <div className=''>
                          <RSelect
                            onChange={this.handleOrderState}
                            placeholder='不限'
                            multi
                            simpleValue
                            className='form-select-control'
                            closeOnSelect={false}
                            removeSelected={false}
                            value={selectedOrderState}
                            options={order_status_list}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xs-3'>
                      <div className='form-group'>
                        <label className='control-label'>订单类型</label>
                        <div className=''>
                          <RSelect
                            onChange={this.handleOrderType}
                            placeholder='不限'
                            multi
                            simpleValue
                            className='form-select-control'
                            closeOnSelect={false}
                            removeSelected={false}
                            value={selectedOrderType}
                            options={order_type_list}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-5'>
                      <div className='form-group'>
                        <label className='control-label'>创建时间</label>
                        <div className=''>
                          <InputDateRangeExt field='created_at' />
                        </div>
                      </div>
                    </div>
                    <div className='col-xs-2'>
                      <div className='form-group'>
                        <label className='control-label'>商品类型</label>
                        <div className=''>
                          <Select
                            className='form-control'
                            field='product_type'
                            options={[
                              {label: '不限', value: ''},
                              ...product_type_list,
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xs-5'>
                      <div className='form-group'>
                        <div className='pull-right cta-group' style={{marginTop: '32px'}}>
                          <button
                            className='btn btn-primary btn-bordered'
                            type='submit'
                            onClick={this.handleFilter}
                          >
                            筛选
                          </button>
                          <button
                            type='submit'
                            className='btn btn-default btn-bordered'
                            ref={(export_node) => { this.export_node = export_node }}
                            onClick={this.handleExport}
                          >
                            导出订单
                          </button>
                          <button
                            type='button'
                            className='btn btn-default btn-bordered'
                            onClick={this.batchShip}
                            ref={node => (this.batchShipNode = node)}
                          >
                            批量发货
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type='file'
                    ref={node => (this.fileNode = node)}
                    style={{position: 'absolute', top: '-1000px'}}
                    onChange={this.onFileChange}
                  />
                </form>
              )
            }}
          </Form>
        </div>
      </div>
    )
  }
}

OrderListAction.defaultProps = {
  exportOrder() {},
  getOrderList() {},
}

export default connect(
  null,
  actions
)(OrderListAction)
