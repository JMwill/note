import {Form, Text, Textarea} from 'react-form'
import React, {PureComponent} from 'react'

import utils, {scrollTop, makeSimpleValidator} from '../utils'
import io from '../io'

import lock from '../components/lock'
import confirm from '../components/confirm'

const validator = makeSimpleValidator([
  'name',
  'email',
])

const validatorFail = function() {
  setTimeout(function() {
    scrollTop(':visible.FormError', 40, true)
  }, 50)
}

class Supplier extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  submitFormData(values) {
    const {id, history} = this.props
    const unlock = lock()

    function success(res) {
      unlock()
      history.push('/inventory/supplier/')
    }

    function fail(err) {
      unlock()
      utils.fail(err)
    }

    const postData = _.omitBy({
      description: values.description,
      name: values.name,
      phone: values.phone,
      shipping_fee: 0,
      email: values.email,
      cnaps_code: values.cnaps_code,
      bank: values.bank,
      account_number: values.account_number,
    }, _.isUndefined)

    if (id > 0) {
      io.updateSupplier(id, postData)
        .then(success)
        .catch(fail)
    } else {
      io.addSupplier(postData)
        .then(success)
        .catch(fail)
    }
  }

  handleSubmit(values) {
    if (this.props.id) {
      this.submitFormData(values)
    } else {
      confirm({
        message: '供应商信息一旦提交，部分信息将不能修改。请确认信息准确。',
        ok: () => this.submitFormData(values),
        okLabel: '确认提交',
        cancelLabel: '再看看',
      })
    }
  }

  render() {
    const defaultValues = {
      code: this.props.code,
      description: this.props.description,
      name: this.props.name,
      phone: this.props.phone,
      email: this.props.email,
      cnaps_code: this.props.cnaps_code,
      bank: this.props.bank,
      account_number: this.props.account_number,
    }

    const hasId = this.props.id > 0
    return (
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
                {hasId ? '编辑供应商' : '新增供应商'}
              </div>
              <div className='pepe-form__bd'>
                <div className='pepe-form__bd-title'>
                    供应商信息
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>
                    <span className='pepe-form__required-icon'>*</span>供应商名称
                  </label>
                  <div className='pepe-form__control'>
                    {
                      hasId
                        ? (<span className='form-control-content form-control-static'>{defaultValues.name}</span>)
                        : (<Text
                          field='name'
                          className='form-control'
                          placeholder='输入供应商名称' />)
                    }
                  </div>
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>开户银行行号</label>
                  <div className='pepe-form__control'>
                    {
                      hasId && defaultValues.cnaps_code
                        ? (<span className='form-control-content form-control-static'>{defaultValues.cnaps_code}</span>)
                        : (<Text
                          field='cnaps_code'
                          className='form-control'
                          placeholder='请准确输入开户银行行号，该行号将会作为打款行号' />)
                    }
                  </div>
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>开户银行</label>
                  <div className='pepe-form__control'>
                    {
                      hasId && defaultValues.bank
                        ? (<span className='form-control-content form-control-static'>{defaultValues.bank}</span>)
                        : <Text
                          field='bank'
                          className='form-control'
                          placeholder='请准确输入开户银行，该银行将会作为打款银行' />
                    }
                  </div>
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>银行卡号</label>
                  <div className='pepe-form__control'>
                    {
                      hasId && defaultValues.account_number
                        ? <span
                          className='form-control-content form-control-static'
                        >
                          {defaultValues.account_number}
                        </span>
                        : <Text
                          field='account_number'
                          className='form-control'
                          placeholder='请准确输入开户银行账号，该账号将会作为打款账号'
                        />
                    }
                  </div>
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>
                    联系方式
                  </label>
                  <div className='pepe-form__control'>
                    <Text field='phone' className='form-control' placeholder='输入联系方式' />
                  </div>
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>
                    <span className='pepe-form__required-icon'>*</span>邮箱
                  </label>
                  <div className='pepe-form__control'>
                    <Text field='email' className='form-control' placeholder='输入邮箱' />
                  </div>
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label mt-0'>
                    简介
                  </label>
                  <div className='pepe-form__control'>
                    <Textarea field='description' className='form-control' rows='4' placeholder='输入供应商简介' />
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
    )
  }
}

Supplier.defaultProps = {
  name: '',
  description: '',
  logo: '',
}

export default Supplier
