import React, {PureComponent} from 'react'

import config from '../../config'
import regionData from '../../config/china-region.json'

class LogisticsTableRuleRow extends PureComponent {
  render() {
    const carrierList = config.getAppConfig('carrier_list')
    const {
      delivery_area,
      initial_rate,
      initial,
      additional_rate,
      additional,
    } = this.props.item
    const carrierObj = _.find(carrierList, {value: this.props.carrier})

    return (
      <tr>
        <td className='first'>{(carrierObj && carrierObj.display_name) || '快递'}</td>
        <td>{_.map(delivery_area, d => (regionData[d][0])).join('、')}</td>
        <td>{initial}</td>
        <td>¥{initial_rate}</td>
        <td>{additional}</td>
        <td>¥{additional_rate}</td>
      </tr>
    )
  }
}

export default LogisticsTableRuleRow
