import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Form, Text, Select} from 'react-form'

import config from '../../config'
import utils from '../../utils'

import * as actions from './redux'

const defaultLimit = config.getAppConfig('limit')

class CategoryAction extends PureComponent {
  static category_status_list = utils.toFormObj('category_status', {
    excludeKeys: ['deleted'],
  })

  static category_order_by_list = utils.toFormObj('default_order_by')

  constructor(props) {
    super(props)

    this.state = {
      keyword: '',
      status: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateCategoryPriority = this.updateCategoryPriority.bind(this)
  }

  handleSubmit(values) {
    this.setState({
      ...values,
    }, () => {
      this.props.getCategoryList({
        params: utils.compact({
          order_by: this.state.order_by,
          category_type: this.props.type,
          offset: 0,
          limit: defaultLimit + 1,
          keyword: this.state.keyword,
          status: this.state.status,
        }),
      })
    })
  }

  updateCategoryPriority(e) {
    this.props.updateCategoryPriority()
  }

  render() {
    const isNormalType = this.props.type === 'normal' || this.props.type === undefined
    return (
      <div className='category-list-action'>
        <div className='box'>
          <Form
            onSubmit={this.handleSubmit}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <div className='row'>
                    <div className='col-xs-3'>
                      <div className='form-group'>
                        <label className='control-label'>搜索</label>
                        <div>
                          <Text
                            placeholder={isNormalType ? '分类名称' : '广告名称'}
                            className='form-control'
                            field='keyword'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xs-3'>
                      <div className='form-group'>
                        <label className='control-label'>状态</label>
                        <div className=''>
                          <Select
                            className='form-control'
                            field='status'
                            options={[
                              {label: '不限', value: ''},
                              ...CategoryAction.category_status_list,
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xs-3'>
                      <div className='form-group'>
                        <label className='control-label'>排序</label>
                        <div className=''>
                          <Select
                            className='form-control'
                            field='order_by'
                            options={[
                              {label: '不限', value: ''},
                              ...CategoryAction.category_order_by_list,
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xs-3'>
                      <div className='form-group'>
                        <label className='control-label'>&nbsp;</label>
                        <div className='cta-group'>
                          <button
                            className='btn btn-primary btn-bordered'
                            type='submit'
                          >
                            筛选
                          </button>
                          <button
                            className='btn btn-bordered btn-default'
                            type='button'
                            onClick={this.updateCategoryPriority}
                          >
                            更新优先级
                          </button>
                        </div>
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

export default connect(
  null,
  actions
)(CategoryAction)
