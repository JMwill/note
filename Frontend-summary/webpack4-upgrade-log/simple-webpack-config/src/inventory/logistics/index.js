import _ from 'lodash'
import React, {PureComponent} from 'react'
import {Form, Text, Radio, RadioGroup} from 'react-form'

import config from '../../config'
import utils, {scrollTop, makeSimpleValidator, withReactFromField} from '../../utils'
import io from '../../io'

import lock from '../../components/lock'
import Alert from '../../components/alert'

import DistributeRegionEditor from './distribute-region-editor'

const DistributeRegionEditorExt = withReactFromField(DistributeRegionEditor)
const validator = makeSimpleValidator([
  'name',
  'charge_type',
  'couriers',
])

const STATUS = {
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
}

const validatorFail = function() {
  setTimeout(function() {
    scrollTop(':visible.FormError', 40, true)
  }, 50)
}

class Logistics extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.srouceData = _.cloneDeep(this.props)
    this.state = {
      charge_type: this.props.charge_type,
      name: this.props.name,
      couriers: this.props.couriers,
    }
  }

  compareBeforeSubmit(values) {
    const {
      name,
      couriers,
      charge_type,
    } = this.srouceData
    const {
      name: newName,
      couriers: newRule,
      charge_type: newRuleType,
    } = values

    let result = {}
    result.couriers = newRule.slice()
    if (name !== newName) { result.name = newName }
    if (charge_type !== newRuleType) { result.charge_type = newRuleType }

    _.forEach(couriers, (r) => {
      let compareOne = _.find(newRule, {id: r.id})
      let isEqual = _.isEqual(compareOne, r)
      if (isEqual) {
        _.remove(result.couriers, rr => rr.id === r.id)
      }
    })

    return result
  }

  checkValidationOfData(data) {
    const {
      couriers,
    } = data
    const ERROR_MSG = {
      setRule: '请完成所有运费规则的设置',
      fillCouriersName: '请选择相应的配送方式',
      defaultCouriers: '请选择默认运费方式',
    }

    let notDeletedCouriers = _.filter(couriers, c => c.status !== STATUS.deleted)

    if (_.filter(notDeletedCouriers, c => c.is_default).length < 1) { return ERROR_MSG.defaultCouriers }
    if (_.some(couriers, c => !c.name)) { return ERROR_MSG.fillCouriersName }
    if (_.isEmpty(couriers) || _.some(couriers, (c) => !(c.item && c.item.length))) { return ERROR_MSG.setRule }
    if (_.every(couriers, c => c.status === STATUS.deleted)) { return ERROR_MSG.setRule }
    if (_.every(couriers, c => _.every(c.item, i => i.status === STATUS.deleted))) { return ERROR_MSG.setRule }

    let checkKeys = ['initial_rate', 'initial', 'additional_rate', 'additional']
    for (var i = 0; i < couriers.length; i++) {
      let c = couriers[i]
      if (!c.name) { return ERROR_MSG.setRule }
      if (c.status !== STATUS.deleted) {
        for (var j = 0; j < c.item.length; j++) {
          let item = c.item[j]
          if (
            !(item.delivery_area &&
            item.delivery_area.length &&
            _.reduce(_.map(checkKeys, k => !!item[k]), (prev, next) => prev && next))
          ) {
            return ERROR_MSG.setRule
          }
        }
      }
    }
  }

  handleSubmit(values) {
    const {id, history} = this.props
    const unlock = lock()

    function success(res) {
      unlock()
      history.push('/inventory/logistics/')
    }

    function fail(err) {
      unlock()
      utils.fail(err)
    }

    const postData = {
      name: values.name,
      charge_type: values.charge_type,
      couriers: values.couriers,
    }

    let msg = this.checkValidationOfData(postData)
    if (msg) {
      Alert(msg)
      unlock()
    } else {
      if (id > 0) {
        let compareedPostData = this.compareBeforeSubmit(postData)
        compareedPostData.id = this.props.id
        io.updateLogistics(id, compareedPostData)
          .then(success)
          .catch(fail)
      } else {
        io.addLogistics(postData)
          .then(success)
          .catch(fail)
      }
    }
  }

  render() {
    const defaultValues = _.assign({
      charge_type: 'piece',
    }, this.state ? {
      // name: this.status.name,
      charge_type: this.state.charge_type,
      couriers: this.state.couriers,
      name: this.props.name,
    } : {})

    const isEdit = this.props.id > 0
    return (
      <div className={isEdit ? 'logistics-edit' : 'logistics-create'}>
        <Form
          defaultValues={defaultValues}
          onSubmit={this.handleSubmit}
          validate={validator}
          onValidationFail={validatorFail}
        >
          {({submitForm, values}) => (
            <div className='wrap js-wrap'>
              <form className='pepe-form' onSubmit={submitForm}>
                <div className='pepe-form__hd'>
                  {isEdit ? '编辑运费模版' : '新增运费模版'}
                </div>
                <div className='pepe-form__bd'>
                  <div className='pepe-form__bd-title'>
                      规则设置
                  </div>
                  <div className='pepe-form__group clearfix'>
                    <label className='pepe-form__label'>
                      <span className='pepe-form__required-icon'>*</span>模板名称
                    </label>
                    <div className='pepe-form__control'>
                      <Text field='name' className='form-control' placeholder='请输入运费模版名称' />
                    </div>
                  </div>
                  {!isEdit
                    ? (<div className='pepe-form__group clearfix'>
                      <label className='pepe-form__label'>
                        <span className='pepe-form__required-icon'>*</span>计算方式
                      </label>
                      <div className='pepe-form__control pepe-form__radiogroup'>
                        <RadioGroup field='charge_type'>
                          {_.map(config.getEnums('logistics_charge_type'), (t) => (
                            <label htmlFor={t.id} ><Radio value={t.id} id={t.id} />{t.name}</label>
                          ))}
                        </RadioGroup>
                      </div>
                      <div className='mb-12 notice'>（发布后无法修改）</div>
                    </div>)
                    : null}
                  <div className='pepe-form__group clearfix'>
                    <label className='pepe-form__label'>
                      <span className='pepe-form__required-icon'>*</span>配送方式
                    </label>
                    <div className='pepe-form__control'>
                      {<DistributeRegionEditorExt field='couriers' ruleType={values.charge_type} />}
                    </div>
                  </div>
                </div>
                <div className='pepe-form__ft'>
                  <button className='btn btn-primary' type='submit'>提交</button>
                </div>
              </form>
            </div>
          )}
        </Form>
      </div>
    )
  }
}

Logistics.defaultProps = {
  charge_type: 'piece',
  couriers: [{
    is_default: true,
    status: STATUS.active,
  }],
}

export default Logistics
