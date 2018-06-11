import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Form, Select, Text} from 'react-form'

import * as actions from './redux'
import utils from '../../utils'

class SupplierAction extends PureComponent {
  static vendor_status_list = [{
    label: '不限',
    values: '',
  }].concat(utils.toFormObj('supplier_status'))

  constructor(props) {
    super(props)

    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(values) {
    this.props.getSupplierList({
      params: utils.compact({
        ...values,
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
                <div className='row'>
                  <div className='col-xs-5'>
                    <div className='form-group'>
                      <label className='control-label'>搜索</label>
                      <div>
                        <Text
                          placeholder='供应商名称'
                          className='form-control'
                          field='keyword'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xs-5'>
                    <div className='form-group'>
                      <label className='control-label'>状态</label>
                      <div>
                        <Select
                          placeholder='供应商状态'
                          className='form-control'
                          field='status'
                          options={SupplierAction.vendor_status_list}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xs-2'>
                    <div className='form-group'>
                      <label className='control-label'>&nbsp;</label>
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
)(SupplierAction)
