import React, {PureComponent} from 'react'
import {Form, Text} from 'react-form'

import utils, {scrollTop, withReactFromField, makeSimpleValidator} from '../utils'
import io from '../io'

import lock from '../components/lock'
import Uploader from '../components/uploader'

const UploaderExt = withReactFromField(Uploader)

const validatorFail = function() {
  setTimeout(function() {
    scrollTop(':visible.FormError', 40, true)
  }, 50)
}

const validator = makeSimpleValidator([
  'cover_image',
  'name',
])

class Category extends PureComponent {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    const {id, history} = this.props

    const postData = {...values}

    function success(res) {
      unlock()
      history.push('/product/category/')
    }

    function fail(err) {
      unlock()
      utils.fail(err)
    }

    const unlock = lock()
    if (id > 0) {
      io.updateCategory(id, postData)
        .then(success)
        .catch(fail)
    } else {
      io.addCategory(postData)
        .then(success)
        .catch(fail)
    }
  }

  render() {
    const defaultProps = this.props
    return (
      <Form
        defaultValues={defaultProps}
        onSubmit={this.handleSubmit}
        validate={validator}
        onValidationFail={validatorFail}
      >
        {({submitForm}) => (
          <div className='wrap js-wrap'>
            <form className='pepe-form' onSubmit={submitForm}>
              <div className='pepe-form__hd'>
                {this.props.id > 0 ? '编辑分类' : '新增分类'}
              </div>
              <div className='pepe-form__bd'>
                <div className='pepe-form__bd-title'>
                    基础信息
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>
                    <span className='pepe-form__required-icon'>*</span>
                    分类名称
                  </label>
                  <div className='pepe-form__control'>
                    <Text field='name' className='form-control' placeholder='请输入分类名称' />
                  </div>
                </div>
                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>
                    分类简介
                  </label>
                  <div className='pepe-form__control'>
                    <Text field='description' className='form-control' placeholder='请输入分类简介' />
                  </div>
                </div>

                <div className='pepe-form__group clearfix'>
                  <label className='pepe-form__label'>
                    <span className='pepe-form__required-icon'>*</span>
                    分类图标
                  </label>
                  <div className='pepe-form__control'>
                    <UploaderExt
                      field='cover_image'
                      imgs={this.props.cover_image}
                      width={800}
                      height={600}
                    />
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

Category.defaultProps = {
  cover_image: '',
  description: '',
  name: '',
}

export default Category
