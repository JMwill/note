import _ from 'lodash'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {scrollTop} from '../../utils'

import Empty from '../../components/empty'
import Paginator from '../../components/paginator'

import RefundTable from './refund-table'
import * as actions from './redux'

class RefundList extends PureComponent {
  componentDidMount() {
    const {getRefundList} = this.props
    getRefundList()
  }

  render() {
    const {
      params,
      objects,
      meta,
      refund_ids_selected,
      refund_status_updating,
      refund_status_dirty,

      getRefundList,
      reloadRefundList,
      selectAllRefund,
      selectRefund,
      unselectAllRefund,
      unselectRefund,
      updateRefundStatus,
    } = this.props

    if (objects === null) return null

    if (_.result(objects, 'length') === 0) {
      return (
        <Empty />
      )
    }

    return (
      <div className='refund-list-pane'>
        <RefundTable
          items={objects}
          selected={refund_ids_selected}
          updating={refund_status_updating}
          dirty={refund_status_dirty}

          onToggleRefund={(checked, id) => {
            if (checked) {
              selectRefund(id)
            } else {
              unselectRefund(id)
            }
          }}
          selectAllRefund={selectAllRefund}
          unselectAllRefund={unselectAllRefund}
          reloadRefundList={reloadRefundList}
          updateRefundStatus={updateRefundStatus}
        />
        <div className='pagination-wrap'>
          <Paginator
            {...meta}
            go={(offset) => {
              scrollTop()
              getRefundList({
                params: {
                  ...params,
                  offset,
                },
              })
            }}
          />
        </div>
      </div>
    )
  }
}

RefundList.defaultProps = {
  params: {},
  objects: [],
  meta: {},
  refund_ids_selected: [],
  refund_status_updating: [],
  refund_status_dirty: [],

  getRefundList() {},
  reloadRefundList() {},
  selectAllRefund() {},
  selectRefund() {},
  unselectAllRefund() {},
  unselectRefund() {},
}

export default connect(
  state => ({
    ...state.refund_list,
    refund_ids_selected: state.refund_ids_selected,
    refund_status_updating: state.refund_status_updating,
    refund_status_dirty: state.refund_status_dirty,
  }),
  actions
)(RefundList)
