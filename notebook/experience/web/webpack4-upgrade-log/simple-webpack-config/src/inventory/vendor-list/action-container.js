import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Form, Text} from 'react-form'

import utils from '../../utils'
import * as actions from './redux'

class VendorAction extends PureComponent {
  static vendor_status_list = utils.toFormObj('vendor_status', {
    excludeKeys: ['deleted'],
  })
  constructor(props) {
    super(props)

    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(values) {
    this.props.getVendorList({
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
                  <div className='col-xs-6'>
                    <div className='form-group'>
                      <label className='control-label'>搜索</label>
                      <div>
                        <Text
                          placeholder='品牌名称'
                          className='form-control'
                          field='keyword'
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
)(VendorAction)
