import _ from 'lodash'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {scrollTop} from '../../utils'

import Empty from '../../components/empty'
import Paginator from '../../components/paginator'

import * as actions from './redux'
import LogisticsTable from './table'

class LogisticsList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.go = this.go.bind(this)
  }

  componentDidMount() {
    this.props.getLogisticsList({params: {offset: 0}})
  }

  go(offset) {
    scrollTop()
    this.props.getLogisticsList({
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
      reloadLogisticsList,
      updateLogisticsStatus,
    } = this.props

    if (objects === null) return null

    if (_.result(objects, 'length') === 0) {
      return (
        <Empty />
      )
    }

    return (
      <div className='logistics-list-pane'>
        <div className='pagination-wrap'>
          <div className='alert alert-success'>
            用户下单时将使用组合模版的方式计算最终需要支付的运费。
            <a target='_blank' href='https://minshop.kf5.com/hc/kb/article/1101950/?from=draft'>查看计算规则</a>
          </div>
          <LogisticsTable
            updateLogisticsStatus={updateLogisticsStatus}
            reloadLogisticsList={reloadLogisticsList}
            tableData={objects} />
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
    ...state.logistics_list,
  }),
  actions
)(LogisticsList)
