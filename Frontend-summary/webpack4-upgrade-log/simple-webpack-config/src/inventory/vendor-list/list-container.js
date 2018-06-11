import _ from 'lodash'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import Paginator from '../../components/paginator'
import Empty from '../../components/empty'

import * as actions from './redux'
import VendorTable from './vendor-table'
import {scrollTop} from '../../utils'

class VendorList extends PureComponent {
  constructor(props) {
    super(props)
    this.go = this.go.bind(this)
  }

  componentDidMount() {
    this.props.getVendorList()
  }

  go(offset) {
    scrollTop()

    this.props.getVendorList({
      params: {
        ...this.props.params,
        offset,
      },
    })
  }

  render() {
    const {
      objects,
      meta,
      vendor_status_dirty,

      reloadVendorList,
      updateVendorStatus,
    } = this.props

    if (objects === null) return null

    if (_.result(objects, 'length') === 0) {
      return (
        <Empty />
      )
    }

    return (
      <div className='vendor-list-pane'>
        <VendorTable
          vendor_status_dirty={vendor_status_dirty}
          items={objects}
          reloadVendorList={reloadVendorList}
          onUpdateVendorStatus={updateVendorStatus}
        />
        <div className='pagination-wrap'>
          <Paginator
            {...meta}
            go={this.go}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state.vendor_list,
    vendor_status_dirty: state.vendor_status_dirty,
  }),
  actions
)(VendorList)
