import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import CityCheckbox from './city-checkbox'

class ProvinceCheckbox extends Component {
  static defaultProps = {
    onCollect() {},
    isReturnChecked: false,
    parentChecked: false,
  }
  static propTypes = {
    parentChecked: PropTypes.bool.isRequired,
    regionNum: PropTypes.string.isRequired,
    isReturnChecked: PropTypes.bool.isRequired,
  }
  static contextTypes = {
    regionData: PropTypes.object.isRequired,
    childRegionData: PropTypes.object.isRequired,

    checkedRegion: PropTypes.array.isRequired,
    disabledRegion: PropTypes.array.isRequired,
    disableCheckedRegion: PropTypes.array.isRequired,
  }

  constructor(props, context) {
    super(props)
    const {
      regionNum,
    } = props

    const {
      childRegionData,
      checkedRegion,
      disabledRegion,
      disableCheckedRegion,
    } = context

    this.state = {
      collapsed: true,
      checked: _.includes(checkedRegion, regionNum),
    }

    this.childs =
    _.map(childRegionData[regionNum],
      (child) => ({
        checked: this.state.checked || _.includes(checkedRegion, child[1]),
        regionNum: child[1],
      }))

    this.state.checkedChildLength = this.checkedChild.length
    this.collectRegions = []

    this.isDisabled = _.includes(disabledRegion, regionNum)
    this.isDisableChecked = _.includes(disableCheckedRegion, regionNum)

    this.handleChange = this.handleChange.bind(this)
    this.handleToggleCollapsed = this.handleToggleCollapsed.bind(this)
    this.handleNotify = this.handleNotify.bind(this)
    this.handleCollect = this.handleCollect.bind(this)
  }

  get checkedChild() {
    return _.filter(this.childs, c => c.checked)
  }

  setChecked(checked) {
    this.checkbox.indeterminate = false
    this.setState({
      checked,
    }, () => {
      this.props.onNotify(checked)
    })
  }

  handleCollect(data) {
    if (this.isDisableChecked || this.isDisabled) {
      return
    }
    this.collectRegions = this.collectRegions.concat(data)
    if (this.collectRegions.length === this.childs.length) {
      this.collectRegions = [this.props.regionNum]
    }
  }

  handleToggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleNotify(childIndex, checked) {
    const childs = this.childs
    childs[childIndex].checked = checked
    this.setState({
      checkedChildLength: this.checkedChild.length,
    })

    if (_.every(childs, (c) => c.checked)) {
      this.setChecked(true)
    } else if (_.some(childs, (c) => c.checked)) {
      this.checkbox.indeterminate = true
    } else {
      this.setChecked(false)
    }
  }

  handleChange(e) {
    if (!this.isDisabled && !this.isDisableChecked) {
      const checked = e.target.checked
      this.setChecked(checked)
    }
  }

  componentDidMount() {
    this.checkbox.indeterminate =
    _.some(this.childs, (c) => c.checked) &&
    !_.every(this.childs, (c) => c.checked)
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isReturnChecked: prevIsReturnChecked,
      parentChecked: prevParentChecked,
    } = prevProps
    const {
      isReturnChecked,
      parentChecked,
    } = this.props

    if (
      parentChecked !== prevParentChecked &&
      !this.isDisabled &&
      !this.isDisableChecked
    ) {
      this.setChecked(parentChecked)
    }

    if (
      (isReturnChecked !== prevIsReturnChecked) &&
      isReturnChecked
    ) {
      if (
        !this.collectRegions.length && this.state.checked
      ) {
        this.collectRegions = [this.props.regionNum]
      }
      this.props.onCollect(this.collectRegions)
      this.collectRegions = []
    }
  }

  render() {
    const {
      collapsed,
      checked,
    } = this.state
    const {
      regionData,
    } = this.context
    const {
      regionNum,
      isReturnChecked,
    } = this.props
    const childs = this.childs

    return (
      <div className={`r-p-checkbox ${collapsed ? '' : 'r-p-checkbox_spread'}`}>
        <div className={`r-checkbox r-p-checkbox__container ${collapsed ? '' : 'r-p-checkbox__container_spread'}`}>
          <label>
            <input
              type='checkbox'
              onChange={this.handleChange}
              checked={checked || this.isDisableChecked}
              disabled={this.isDisabled || this.isDisableChecked}
              ref={checkbox => { this.checkbox = checkbox }} />
            <span>{regionData[regionNum][0]}</span>
            {
              this.state.checkedChildLength
                ? <span className='text-danger'>({this.state.checkedChildLength})</span>
                : null
            }
          </label>
          {
            childs.length
              ? (collapsed
                ? <i onClick={this.handleToggleCollapsed} className='toggle-icon'>&#9660;</i>
                : <i onClick={this.handleToggleCollapsed} className='toggle-icon'>&#9650;</i>
              )
              : null
          }
        </div>
        {
          childs.length
            ? <div className={`r-c-checkbox ${collapsed ? '' : 'r-c-checkbox_spread'}`}>
              {_.map(childs, (c, index) => (
                <CityCheckbox
                  key={c.regionNum}
                  regionNum={c.regionNum}
                  parentChecked={checked || this.isDisableChecked}
                  parentDisabled={this.isDisabled || this.isDisableChecked}
                  isReturnChecked={isReturnChecked}
                onNotify={this.handleNotify.bind(this, index)} // eslint-disable-line
                  onCollect={this.handleCollect} />
              ))}
              <div className='r-c-checkbox__closer'>
                <span onClick={this.handleToggleCollapsed}>关闭</span>
              </div>
            </div>
            : null
        }
      </div>
    )
  }
}

export default ProvinceCheckbox
