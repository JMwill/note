import * as actions from './redux'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {compact} from '../../utils'
import config from '../../config'
import InputLookup from '../../components/input-lookup'
import Select from 'react-select'

function Option({id, name}) {
  return (
    <option value={id}>{name}</option>
  )
}

class ProductAction extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      shelf: null,
      selectedOption: [],
    }

    this.handleFilter = this.handleFilter.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.parseParams = this.parseParams.bind(this)
    this.onShelfChange = this.onShelfChange.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.updateProductPriority = this.updateProductPriority.bind(this)
  }

  isMultIdKeyword() {
    const numReg = /^\d+$/
    let ids = this.keyword_node.value.split(',')
    return _.every(ids, id => numReg.test(id.trim()))
  }

  parseParams() {
    const params = {
      keyword: !this.isMultIdKeyword() ? this.keyword_node.value : null,
      id__in: this.isMultIdKeyword() ? this.keyword_node.value : null,
      status__in: this.state.selectedOption.toString(),
      product_type: this.product_type_node.value,
      order_by: this.product_order_node.value,
    }
    if (this.state.shelf != null) {
      params.shelf_id = this.state.shelf.id
    }

    return compact(params)
  }

  handleFilter(e) {
    e.preventDefault()
    this.props.getProductList({
      params: this.parseParams(),
    })
  }

  updateProductPriority(e) {
    this.props.updateProductPriority()
  }

  handleOptionChange(selectedOption) {
    this.setState({selectedOption})
  }

  handleExport(e) {
    e.preventDefault()
    this.props.exportProduct(this.export_node, this.parseParams())
  }

  onShelfChange(shelf) {
    this.setState({
      shelf,
    })
  }

  render() {
    const {selectedOption} = this.state

    return (
      <div className='page-action-pane'>
        <div className='box'>
          <form onSubmit={this.handleFilter}>
            <div className='row'>
              <div className='col-xs-4'>
                <div className='form-group'>
                  <label className='control-label'>关键字</label>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='请输入商品名称、商品 ID'
                      ref={(keyword_node) => { this.keyword_node = keyword_node }}
                    />
                  </div>
                </div>
              </div>
              <div className='col-xs-4'>
                <div className='form-group'>
                  <label className='control-label'>所属货架</label>
                  <InputLookup onChange={this.onShelfChange} />
                </div>
              </div>
              <div className='col-xs-4'>
                <div className='form-group'>
                  <label className='control-label'>商品状态</label>
                  <div>
                    <Select
                      onChange={this.handleOptionChange}
                      placeholder='不限'
                      multi
                      simpleValue
                      className='form-select-control'
                      closeOnSelect={false}
                      removeSelected={false}
                      value={selectedOption}
                      options={
                        config
                          .getEnums('product_status')
                          .map(s => ({value: s.id, label: s.name}))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-4'>
                <div className='form-group'>
                  <label className='control-label'>商品类型</label>
                  <div>
                    <select
                      className='form-control'
                      ref={product_type_node => (this.product_type_node = product_type_node)}
                    >
                      <option value={''}>不限</option>
                      {config.getEnums('product_type').map(s => <Option key={s.id} {...s} />)}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-xs-4'>
                <div className='form-group'>
                  <label className='control-label'>排序</label>
                  <div>
                    <select
                      className='form-control'
                      ref={product_order_node => (this.product_order_node = product_order_node)}
                    >
                      <option value={''}>不限</option>
                      {config.getEnums('product_order_by').map(s => <Option key={s.id} {...s} />)}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-xs-4'>
                <div className='form-group'>
                  <div className='pull-right cta-group' style={{marginTop: '32px'}} >
                    <button
                      className='btn btn-bordered btn-primary'
                      type='submit'
                    >
                      筛选
                    </button>
                    <button
                      className='btn btn-bordered btn-default'
                      type='button'
                      onClick={this.updateProductPriority}
                    >
                      更新优先级
                    </button>
                    <button
                      type='button'
                      className='btn btn-bordered btn-default'
                      ref={(export_node) => { this.export_node = export_node }}
                      onClick={this.handleExport}
                    >
                      导出商品
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state.shelf_list,
  }),
  actions
)(ProductAction)
