import React, {PureComponent} from 'react'
import {Form, Text, Textarea} from 'react-form'

import utils, {scrollTop, withReactFromField, makeSimpleValidator} from '../utils'
import io from '../io'

import lock from '../components/lock'
import Uploader from '../components/uploader'

const UploaderExt = withReactFromField(Uploader)

const validator = makeSimpleValidator([
  'name',
  'description',
])

const validatorFail = function() {
  setTimeout(function() {
    scrollTop(':visible.FormError', 40, true)
  }, 50)
}

class Vendor extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    const {id, history} = this.props
    const unlock = lock()

    function success(res) {
      unlock()
      history.push('/inventory/vendor/')
    }

    function fail(err) {
      unlock()
      utils.fail(err)
    }

    const postData = {
      name: values.name,
      description: values.description,
      logo: values.logo,
    }

    if (id > 0) {
      io.updateVendor(id, postData)
        .then(success)
        .catch(fail)
    } else {
      io.addVendor(postData)
        .then(success)
        .catch(fail)
    }
  }

  render() {
    const defaultValues = {
      name: this.props.name,
      description: this.props.description,
      logo: this.props.logo,
    }

    return (
      <Form
        defaultValues={defaultValues}
        onSubmit={this.handleSubmit}
        validate={validator}
        onValidationFail={validatorFail}
      >
        {({submitForm}) => (
          <div className='wrap js-wrap'>
            <form className='pepe-form' onSubmit={submitForm}>
              <div className='pepe-form__hd'>
                {this.props.id > 0 ? '编辑品牌' : '新增品牌'}
              </div>
              <div className='pepe-form__bd'>
                <div className='pepe-form__bd-title'>
                    品牌信息
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>
                    <span className='pepe-form__required-icon'>*</span>品牌名称
                  </label>
                  <div className='pepe-form__control'>
                    <Text field='name' className='form-control' placeholder='输入品牌名称' />
                  </div>
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label mt-0'>
                    <span className='pepe-form__required-icon'>*</span>品牌简介
                  </label>
                  <div className='pepe-form__control'>
                    <Textarea
                      field='description'
                      className='form-control pepe-form__control'
                      rows='4'
                      placeholder='输入品牌简介'
                    />
                  </div>
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label mt-0'>
                    品牌图标
                  </label>
                  <div className='pepe-form__control'>
                    <UploaderExt field='logo' imgs={this.props.logo} width='140' height='140' />
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

Vendor.defaultProps = {
  name: '',
  description: '',
  logo: '',
}

export default Vendor
