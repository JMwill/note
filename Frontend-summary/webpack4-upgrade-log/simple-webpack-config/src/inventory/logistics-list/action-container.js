import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Form, Text} from 'react-form'

import * as actions from './redux'
import utils from '../../utils'

class LogisticsAction extends PureComponent {
  static vendor_status_list = utils.toFormObj('supplier_status')
  constructor(props) {
    super(props)

    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(values) {
    this.props.getLogisticsList({
      params: utils.compact({
        name__icontains: values.keyword,
      }),
    })
  }

  render() {
    return (
      <div className='box action-container'>
        <Form
          onSubmit={this.handleFilter}
        >
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <div className='filter'>
                  <div className='filter-area'>
                    <div className='form-group'>
                      <label className='control-label'>搜索</label>
                      <div>
                        <Text
                          placeholder='请输入模版名称'
                          className='form-control'
                          field='keyword'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='filter-button'>
                    <div>
                      <button
                        className='btn btn-primary btn-bordered'
                        type='submit'
                      >
                        筛选
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )
          }}
        </Form>
      </div>
    )
  }
}

export default connect(
  null,
  actions
)(LogisticsAction)
