import _ from 'lodash'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Form, Text, Select} from 'react-form'
import RSelect from 'react-select'

import config from '../../config'
import utils from '../../utils'

import InputDateRange from '../../components/input-date-range'

import * as actions from './redux'

const InputDateRangeExt = utils.withReactFromField(InputDateRange)

class RefundListAction extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectedOrderType: [],
      selectedRefundState: [],
      selectedRefundType: [],
    }

    this.handleFilter = this.handleFilter.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOrderType = this.handleOrderType.bind(this)
    this.handleRefundState = this.handleRefundState.bind(this)
    this.handleRefundType = this.handleRefundType.bind(this)
  }

  handleSubmit(values) {
    const {selectedOrderType, selectedRefundState, selectedRefundType} = this.state
    values.created_at = values.created_at || {}
    const params = utils.compact({
      created_at__gte: values.created_at['from'],
      created_at__lt: values.created_at['to'],
      keyword: values.keyword,
      status__in: selectedRefundState.toString(),
      type__in: selectedRefundType.toString(),
      order_type__in: selectedOrderType.toString(),
      product_type: values.product_type,
    })

    if (this.cmd === 'filter') {
      this.props.getRefundList({
        params,
      })
    } else if (this.cmd === 'export') {
      this.props.exportRefund(this.export_node, params)
    }
  }

  handleFilter() {
    this.cmd = 'filter'
  }

  handleExport() {
    this.cmd = 'export'
  }

  handleOrderType(selectedOrderType) {
    this.setState({selectedOrderType})
  }

  handleRefundState(selectedRefundState) {
    this.setState({selectedRefundState})
  }

  handleRefundType(selectedRefundType) {
    this.setState({selectedRefundType})
  }

  render() {
    const refund_status_list = _.map(config.getEnums('refund_status'), x => ({label: x.name, value: x.id}))
    const refund_type_list = _.map(config.getEnums('refund_type'), x => ({label: x.name, value: x.id}))
    const order_type_list = _.map(config.getEnums('order_type'), x => ({label: x.name, value: x.id}))
    const product_type_list = _.map(config.getEnums('product_type'), x => ({label: x.name, value: x.id}))

    const {selectedOrderType, selectedRefundState, selectedRefundType} = this.state
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
                    <div className='col-xs-8'>
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
                    <div className='col-xs-2'>
                      <div className='form-group'>
                        <label className='control-label'>售后状态</label>
                        <div>
                          <RSelect
                            onChange={this.handleRefundState}
                            placeholder='不限'
                            multi
                            simpleValue
                            className='form-select-control'
                            closeOnSelect={false}
                            removeSelected={false}
                            value={selectedRefundState}
                            options={refund_status_list}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xs-2'>
                      <div className='form-group'>
                        <label className='control-label'>售后类型</label>
                        <div>
                          <RSelect
                            onChange={this.handleRefundType}
                            placeholder='不限'
                            multi
                            simpleValue
                            className='form-select-control'
                            closeOnSelect={false}
                            removeSelected={false}
                            value={selectedRefundType}
                            options={refund_type_list}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-4'>
                      <div className='form-group'>
                        <label className='control-label'>申请时间</label>
                        <div>
                          <InputDateRangeExt field='created_at' />
                        </div>
                      </div>
                    </div>
                    <div className='col-xs-2'>
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
                    <div className='col-xs-4'>
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
                          导出售后
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )
            }}
          </Form>
        </div>
      </div>
    )
  }
}

RefundListAction.defaultProps = {
  exportRefund() {},
  getRefundList() {},
}

export default connect(
  null,
  actions
)(RefundListAction)
