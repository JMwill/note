import React, {PureComponent} from 'react'

import TableColgroup from '../../components/table-colgroup'

import LogisticsTableOperateRow from './operate-row'
import LogisticsTableRuleRow from './rule-row'

const total_width = 896
const cell_width_list = [120, 392, 96, 96, 96, 96]

class LogisticsTable extends PureComponent {
  genRows() {
    return _.flatten(this.props.tableData.map((d) => {
      let ruleItems = _.map(d.couriers, (r) => {
        return _.map(r.item, (i) => <LogisticsTableRuleRow item={i} carrier={r.name} />)
      })
      return [
        <tr><td className='spacing-td' colSpan='6' /></tr>,
        <LogisticsTableOperateRow
          updateLogisticsStatus={this.props.updateLogisticsStatus}
          reloadLogisticsList={this.props.reloadLogisticsList}
          item={d} />,
      ].concat(ruleItems)
    }))
  }
  render() {
    return (
      <div className='pepe-table-wrap'>
        <table className='pepe-table'>
          <TableColgroup total_width={total_width} cell_width_list={cell_width_list} />
          <thead>
            <tr>
              <th className='first'>快递方式</th>
              <th>配送区域</th>
              <th>首件（重）</th>
              <th>收费</th>
              <th>续件（重）</th>
              <th>续费</th>
            </tr>
          </thead>
          <tbody>
            {this.genRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

LogisticsTable.defaultProps = {
  tableData: [],
  logistics_status_dirty: [],
  reloadLogisticsList() {},
}

export default LogisticsTable
