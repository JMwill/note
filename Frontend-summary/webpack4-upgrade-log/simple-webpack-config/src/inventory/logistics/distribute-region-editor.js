import React, {PureComponent} from 'react'
import DistributeRegionTable from './distribute-region-table'
import Alert from '../../components/alert'

class DistributeRegionEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.data = {
      rule: this.props.value,
    }

    this.carrierList = window.__app_config__.carrier_list

    this.onChange = this.onChange.bind(this)
    this.addNewShippingRule = this.addNewShippingRule.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
    this.handleStatusTrigger = this.handleStatusTrigger.bind(this)
    this.handleCarrierChange = this.handleCarrierChange.bind(this)
    this.handleDelRule = this.handleDelRule.bind(this)
    this.handleSetDefault = this.handleSetDefault.bind(this)
  }

  get selectedCarriers() {
    return _.filter(this.data.rule, r => r.status !== 'deleted')
      .map(r => r.name)
  }

  addNewShippingRule(e) {
    let notDeletedRules = _.filter(this.data.rule, r => (r.status !== 'deleted'))
    if (notDeletedRules.length >= 5) {
      return Alert('最多可以设置5种配送方式')
    }
    this.data.rule = this.data.rule.concat({
      is_default: !this.data.rule.length, // 第一个新建的默认选中
      status: 'active',
    })
    this.onChange()
  }

  handleItemChange(updateId, state) {
    let path = `[${updateId}].item`
    _.set(this.data.rule, path, state.item)
    this.onChange()
  }

  handleStatusTrigger(e) {
    let index = e.target.parentNode.dataset.index
    let val = e.target.checked ? 'active' : 'inactive'
    let path = `[${index}].status`
    _.set(this.data.rule, path, val)
    this.onChange()
  }

  handleCarrierChange(e) {
    let index = e.target.parentNode.dataset.index
    let val = e.target.value
    let path = `[${index}].name`
    _.set(this.data.rule, path, val)
    this.onChange()
  }

  handleDelRule(e) {
    let rule = this.data.rule
    let index = e.target.parentNode.dataset.index
    let isCreated = _.some(rule[index].item, 'id')
    if (isCreated) {
      rule[index].status = 'deleted'
    } else {
      rule.splice(index, 1)
    }
    this.onChange()
  }

  handleSetDefault(e) {
    let index = Number(e.target.dataset.index)
    let val = e.target.checked
    let path = `[${index}].is_default`
    if (val) {
      _.forEach(this.data.rule, (r, i) => {
        r.is_default = (i === index)
      })
    } else {
      _.set(this.data.rule, path, val)
    }
    this.onChange()
  }

  onChange() {
    this.props.onChange(this.data.rule)
  }

  render() {
    return (
      <div className='shipping-template'>
        {_.map(this.data.rule, (r, index) =>
          r.status !== 'deleted'
            ? (<div className='distribute-region-editor'>
              <div
                data-index={index}
                className='dispatch-type'>
                <input
                  type='checkbox'
                  checked={r.status === 'active'}
                  onChange={this.handleStatusTrigger} />
                <select
                  className='form-control'
                  placeholder=''
                  value={r.name || null}
                  onChange={this.handleCarrierChange} >
                  <option value='' disabled selected>物流名称</option>
                  {_.map(this.carrierList, (cl) => (
                    <option
                      value={cl.value}
                      disabled={this.selectedCarriers.indexOf(cl.value) > -1}
                    >{cl.display_name}</option>
                  ))}
                </select>
                <label>
                  <input
                    type='radio'
                    data-index={index}
                    name='is_default'
                    value={index.toString()}
                    checked={r.is_default}
                    onChange={this.handleSetDefault}
                  />设为默认运费
                </label>
                <span
                  className='del-rule'
                  onClick={this.handleDelRule}>删除</span>
              </div>
              <div className='pepe-table-wrap'>
                <DistributeRegionTable
                  item={r.item}
                  ruleType={this.props.ruleType}
                  updateId={index}
                  onChange={this.handleItemChange} />
              </div>
            </div>)
            : null
        )}
        <button
          type='button'
          className='btn btn-lg btn-success iconpepe-plus add-distribute-btn'
          onClick={this.addNewShippingRule}>&nbsp;添加配送方式</button>
      </div>
    )
  }
}

export default DistributeRegionEditor
