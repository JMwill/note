import _ from 'lodash'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {scrollTop} from '../../utils'

import Empty from '../../components/empty'
import Paginator from '../../components/paginator'

import * as actions from './redux'
import SupplierTable from './supplier-table'

class SupplierList extends PureComponent {
  constructor(props) {
    super(props)
    this.go = this.go.bind(this)
  }

  componentDidMount() {
    this.props.getSupplierList()
  }

  go(offset) {
    scrollTop()

    this.props.getSupplierList({
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
      supplier_status_dirty,

      reloadSupplierList,
      updateSupplierStatus,
    } = this.props

    if (objects === null) return null

    if (_.result(objects, 'length') === 0) {
      return (
        <Empty />
      )
    }

    return (
      <div className='supplier-list-pane'>
        <SupplierTable
          supplier_status_dirty={supplier_status_dirty}
          items={objects}
          reloadSupplierList={reloadSupplierList}
          onUpdateSupplierStatus={updateSupplierStatus}
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
    ...state.supplier_list,
    supplier_status_dirty: state.supplier_status_dirty,
  }),
  actions
)(SupplierList)
