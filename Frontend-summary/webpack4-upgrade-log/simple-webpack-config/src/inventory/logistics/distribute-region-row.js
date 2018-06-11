import React, {PureComponent} from 'react'

import regionData from '../../config/china-region.json'

import RegionSelector from '../../components/region-selector'
import Modal from '../../components/modal'
import Alert from '../../components/alert'

class DistributeRegionRow extends PureComponent {
  constructor(props) {
    super(props)

    let {
      delivery_area,
      initial,
      initial_rate,
      additional,
      additional_rate,
    } = this.props
    this.state = {
      delivery_area,
      initial,
      initial_rate,
      additional,
      additional_rate,
    }

    this.handleChange = this.handleChange.bind(this)
    this.openRegionSelector = this.openRegionSelector.bind(this)
    this.handleRegionConfirm = this.handleRegionConfirm.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  renderAction(index) {
    const {
      delRow,
    } = this.props
    return (
      <div data-action={index}>
        <div className='btn-group'>
          <div
            className='btn btn-default btn-sm btn-bordered'
            onClick={this.openRegionSelector}
          >编辑</div>
          <div
            className='btn btn-default btn-sm btn-bordered'
            onClick={(e) => { delRow(index) }}
          >删除</div>
        </div>
      </div>
    )
  }

  openRegionSelector() {
    Modal({
      component: RegionSelector,
      args: {
        disableCheckedRegion: this.props.disabledRegion,
        checkedRegion: this.props.checkedRegion,
        onConfirm: this.handleRegionConfirm,
      },
      title: '选择区域',
      size: 'lg',
    })
  }

  handleRegionConfirm(val) {
    this.setState({
      delivery_area: val,
    }, () => {
      this.props.onChange(this.props.updateId, this.state)
    })
  }

  handleBlur(e) {
    let val = e.target.value
    if (isNaN(Number(val))) {
      Alert('请输入有效数字')
      e.target.value = ''
      this.handleChange(e)
    }
  }

  handleChange(e) {
    let name = e.target.dataset.name
    let val = e.target.value

    this.setState({
      [name]: val,
    }, () => {
      this.props.onChange(this.props.updateId, this.state)
    })
  }

  componentWillReceiveProps(nextProps) {
    let {
      delivery_area,
      initial,
      initial_rate,
      additional,
      additional_rate,
    } = nextProps
    this.setState({
      delivery_area,
      initial,
      initial_rate,
      additional,
      additional_rate,
    })
  }

  render() {
    const {
      delivery_area,
      initial,
      initial_rate,
      additional,
      additional_rate,
    } = this.state
    return (<tr className='distribute-region-row'>
      <td
        className={'first distribute-td region-td ' + (delivery_area.length ? '' : 'iconpepe-plus need-select-region')}
        onClick={this.openRegionSelector}>
        {_.map(delivery_area, (d) => regionData[d][0]).join('、') || ' 请选择配送区域'}
      </td>
      <td className='distribute-td'>
        <input
          className='form-control'
          value={initial || ''}
          data-name='initial'
          onBlur={this.handleBlur}
          onInput={this.handleChange} />
      </td>
      <td className='distribute-td'>
        <input
          className='form-control'
          value={initial_rate || ''}
          data-name='initial_rate'
          onBlur={this.handleBlur}
          onInput={this.handleChange} />
      </td>
      <td className='distribute-td'>
        <input
          className='form-control'
          value={additional || ''}
          data-name='additional'
          onBlur={this.handleBlur}
          onInput={this.handleChange} />
      </td>
      <td className='distribute-td'>
        <input
          className='form-control'
          value={additional_rate || ''}
          data-name='additional_rate'
          onBlur={this.handleBlur}
          onInput={this.handleChange} />
      </td>
      <td className='operate-td'>{this.renderAction(this.props.updateId)}</td>
    </tr>)
  }
}

DistributeRegionRow.defaultProps = {
  delivery_area: [],
  initial: '',
  initial_rate: '',
  additional: '',
  additional_rate: '',
  delRow() {},
}

export default DistributeRegionRow
