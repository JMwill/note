import React, {PureComponent} from 'react'
import DistributeRegionRow from './distribute-region-row'
import Alert from '../../components/alert'

class DistributeRegionTable extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item,
    }
    this.addNewRow = this.addNewRow.bind(this)
    this.delRow = this.delRow.bind(this)
    this.handleRowChange = this.handleRowChange.bind(this)
  }

  delRow(index) {
    let newItem = this.state.item.slice()
    if (newItem[index].id > 0) {
      newItem[index].status = 'deleted'
    } else {
      newItem.splice(index, 1)
    }
    this.setState({
      item: newItem,
    }, () => {
      this.handleChange()
    })
  }

  checkCanAddNewRow() {
    let li = _.last(this.state.item)

    let checkKeys = ['initial_rate', 'initial', 'additional_rate', 'additional']
    return _.isUndefined(li)
      ? true
      : li.delivery_area &&
      li.delivery_area.length &&
      _.reduce(_.map(checkKeys, k => !!li[k]), (i, k) => i && k)
  }

  addNewRow() {
    let item = this.state.item
    if (this.checkCanAddNewRow()) {
      this.setState({
        item: item.concat({}),
      }, () => {
        this.handleChange()
      })
    } else {
      Alert('请补充完整前一条配置')
    }
  }

  handleRowChange(updateId, state) {
    let newItem = _.cloneDeep(this.state.item)
    newItem[updateId] = _.assign(newItem[updateId], {...state})
    this.setState({
      item: newItem,
    }, () => {
      this.handleChange()
    })
  }

  handleChange() {
    this.props.onChange(this.props.updateId, this.state)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      item: nextProps.item,
    })
  }

  render() {
    const colsWidth = ['268px', '74px', '74px', '74px', '74px', '144px']
    const {item} = this.state
    const thead = {
      piece: [
        '配送区域',
        '首件',
        '收费',
        '续件',
        '续费',
        '操作',
      ],
      weight: [
        '配送区域',
        '首重',
        '收费',
        '续重',
        '续费',
        '操作',
      ],
    }
    return (
      <table className='pepe-table'>
        <colgroup>
          {_.map(colsWidth, (w) => (<col width={w} />))}
        </colgroup>
        <thead>
          <tr>
            {_.map(
              thead[this.props.ruleType],
              (t, index) => (<th className={index === 0 ? 'first' : null}>{t}</th>)
            )}
          </tr>
        </thead>
        <tbody>
          {_.map(item, (i, index) => {
            if (i.status === 'deleted') {
              return null
            }

            let disabledRegion = []
            let checkedRegion = []
            _.forEach(item, (j, jindex) => {
              if (j.delivery_area) {
                if (jindex !== index) {
                  disabledRegion = disabledRegion.concat(j.delivery_area)
                } else {
                  checkedRegion = checkedRegion.concat(j.delivery_area)
                }
              }
            })
            return (<DistributeRegionRow
              disabledRegion={disabledRegion}
              checkedRegion={checkedRegion}
              delivery_area={i.delivery_area}
              initial={i.initial}
              initial_rate={i.initial_rate}
              additional={i.additional}
              additional_rate={i.additional_rate}
              updateId={index}
              onChange={this.handleRowChange}
              delRow={this.delRow}
            />)
          })}
          <tr>
            <td colSpan='6'>
              <div
                className='iconpepe-plus clickable set-region'
                onClick={this.addNewRow}>&nbsp;设定配送区域及其运费</div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

DistributeRegionTable.defaultProps = {
  onChange() {},
  item: [],
}

export default DistributeRegionTable
