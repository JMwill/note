import React, {Component} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import regionData from '../../config/china-region.json'
import ProvinceCheckbox from './province-checkbox'

const COUNTRY_CODE = '086'
const childRegionData = (() => {
  let regionDataKeys = _.keys(regionData)
  let regionDataWithOwnKey = _.map(regionDataKeys, k => [regionData[k][0], k])
  let childRegionData = _.groupBy(regionDataWithOwnKey, (k) => regionData[k[1]][1])
  return childRegionData
})()

class RegionSelector extends Component {
  static defaultProps = {
    onCollect() {},

    disableCheckedRegion: [],
    disabledRegion: [],
    checkedRegion: [],
  }

  static propTypes = {
    disableCheckedRegion: PropTypes.array,
    disabledRegion: PropTypes.array,
    checkedRegion: PropTypes.array,
  }

  static childContextTypes = {
    regionData: PropTypes.object.isRequired,
    childRegionData: PropTypes.object.isRequired,

    checkedRegion: PropTypes.array.isRequired,
    disabledRegion: PropTypes.array.isRequired,
    disableCheckedRegion: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    const {
      checkedRegion: propsCheckedRegion,
      disabledRegion: propsDisabledRegion,
      disableCheckedRegion: propsDisableCheckedRegion,
    } = props

    this.state = {
      isReturnChecked: false,
      geoRegion: [
        {
          name: '华东',
          provincesGroup: ['310000', '320000', '330000', '340000', '360000'],
        },
        {
          name: '华北',
          provincesGroup: ['110000', '120000', '140000', '370000', '130000', '150000'],
        },
        {
          name: '华中',
          provincesGroup: ['430000', '420000', '410000'],
        },
        {
          name: '华南',
          provincesGroup: ['440000', '450000', '350000', '460000'],
        },
        {
          name: '东北',
          provincesGroup: ['210000', '220000', '230000'],
        },
        {
          name: '西北',
          provincesGroup: ['610000', '650000', '620000', '640000', '630000'],
        },
        {
          name: '西南',
          provincesGroup: ['500000', '530000', '520000', '540000', '510000'],
        },
        {
          name: '港澳台',
          provincesGroup: [ '810000', '820000', '710000' ],
        },
      ],
    }

    this.checkedProvinceStorage = []
    this.collectRegions = []
    this.geoRegionInputRef = []

    this.allProvinces = _.map(childRegionData[COUNTRY_CODE], (c) => c[1])
    this.checkedRegion =
      _.includes(propsCheckedRegion, COUNTRY_CODE)
        ? this.allProvinces
        : propsCheckedRegion
    this.disabledRegion =
      _.includes(propsDisabledRegion, COUNTRY_CODE)
        ? this.allProvinces
        : propsDisabledRegion
    this.disableCheckedRegion =
      _.includes(propsDisableCheckedRegion, COUNTRY_CODE)
        ? this.allProvinces
        : propsDisableCheckedRegion

    _.forEach(this.state.geoRegion, (r, index) => {
      this.checkedProvinceStorage[index] =
        _.map(r.provincesGroup, p => this.checkedRegion.indexOf(p) > -1)

      r.checked = !_.difference(r.provincesGroup, this.checkedRegion).length
      r.disabled = !_.difference(r.provincesGroup, this.disabledRegion).length
      r.disableChecked = !_.difference(r.provincesGroup, this.disableCheckedRegion).length
    })

    this.handleGeoRegionChange = this.handleGeoRegionChange.bind(this)
    this.handleNotify = this.handleNotify.bind(this)
    this.handleCollect = this.handleCollect.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  /**
   * 处理点击大区事件，批量添加／取消选中省会 ID
   */
  handleGeoRegionChange(e) {
    let checked = e.target.checked
    let index = e.target.dataset.index
    let geoRegion = _.cloneDeep(this.state.geoRegion)

    this.geoRegionInputRef[index].indeterminate = false
    _.set(geoRegion, `[${index}].checked`, checked)

    this.setState({
      geoRegion,
    })
  }

  handleNotify(regionNum, geoIndex, checked) {
    let provincesGroup = this.state.geoRegion[geoIndex]['provincesGroup']
    let index = provincesGroup.indexOf(regionNum)
    this.checkedProvinceStorage[geoIndex][index] = checked

    this.geoRegionInputRef[geoIndex].indeterminate = false
    if (_.every(this.checkedProvinceStorage[geoIndex], Boolean)) {
      let geoRegion = _.cloneDeep(this.state.geoRegion)
      _.set(geoRegion, `[${geoIndex}].checked`, true)

      this.setState({
        geoRegion,
      })
    } else if (_.some(this.checkedProvinceStorage[geoIndex], Boolean)) {
      this.geoRegionInputRef[geoIndex].indeterminate = true
    }
  }

  handleCollect(data) {
    this.collectRegions = this.collectRegions.concat(data)
  }

  handleConfirm() {
    this.setState({
      isReturnChecked: true,
    })
  }

  getChildContext() {
    return {
      regionData,
      childRegionData,

      checkedRegion: this.checkedRegion,
      disabledRegion: this.disabledRegion,
      disableCheckedRegion: this.disableCheckedRegion,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isReturnChecked: prevIsReturnChecked,
    } = prevState
    const {
      isReturnChecked,
    } = this.state
    if (
      isReturnChecked !== prevIsReturnChecked &&
      isReturnChecked
    ) {
      if (
        this.collectRegions.length === this.allProvinces.length &&
        !_.difference(this.collectRegions, this.allProvinces).length
      ) {
        this.collectRegions = [COUNTRY_CODE]
      }
      this.props.onConfirm(this.collectRegions)
      this.props.close()
      this.collectRegions = []
    }
  }

  render() {
    const {
      geoRegion,
      isReturnChecked,
    } = this.state

    return (
      <div className='r-selector'>
        <div className='r-selector__content'>
          {_.map(geoRegion, (gr, index) =>
            (<div className='r-selector__row' key={index}>
              <div className='r-selector__col-3'>
                <div className='r-checkbox'>
                  <label>
                    <input
                      type='checkbox'
                      onChange={this.handleGeoRegionChange}
                      disabled={gr.disabled || gr.disableChecked}
                      checked={gr.checked || gr.disableChecked}
                      ref={(input) => { this.geoRegionInputRef[index] = input }}
                      data-index={index} />
                    <span>{gr.name}</span>
                  </label>
                </div>
              </div>
              <div className='r-selector__col-9'>
                <div className='r-selector__row'>
                  {_.map(gr.provincesGroup, (regionNum, provinceIndex) => (
                    <div className='r-selector__col-4' key={regionNum}>
                      <ProvinceCheckbox
                        regionNum={regionNum}
                        isReturnChecked={isReturnChecked}
                        parentDisabled={this.isDisabled || this.isDisableChecked}
                        onNotify={this.handleNotify.bind(this, regionNum, index)} // eslint-disable-line
                        onCollect={this.handleCollect}
                        parentChecked={gr.checked} />
                    </div>
                  ))}
                </div>
              </div>
            </div>)
          )}
        </div>
        <div className='addr-selector__footer'>
          <div type='button' className='btn btn-success' onClick={this.handleConfirm}>保存</div>
          <div type='button' className='btn btn-default' onClick={this.props.close}>取消</div>
        </div>
      </div>
    )
  }
}

export default RegionSelector
