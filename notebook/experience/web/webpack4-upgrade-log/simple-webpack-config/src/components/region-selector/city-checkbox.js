import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class CityCheckbox extends Component {
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
      parentChecked,
    } = props
    const {
      checkedRegion,
      disabledRegion,
      disableCheckedRegion,
    } = context

    this.state = {
      checked: parentChecked || _.includes(checkedRegion, regionNum),
    }

    this.isDisabled = _.includes(disabledRegion, regionNum)
    this.isDisableChecked = _.includes(disableCheckedRegion, regionNum)
    this.handleChange = this.handleChange.bind(this)
  }

  setChecked(checked) {
    this.setState({
      checked,
    }, () => {
      this.props.onNotify(checked)
    })
  }

  handleChange(e) {
    if (!this.isDisabled && !this.isDisableChecked) {
      const checked = e.target.checked
      this.setChecked(checked)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isReturnChecked: prevIsReturnChecked,
      parentChecked: prevParentChecked,
    } = prevProps
    const {
      isReturnChecked,
      regionNum,
      parentChecked,
    } = this.props
    const {
      checked,
    } = this.state

    if (
      parentChecked !== prevParentChecked &&
      !this.isDisabled &&
      !this.isDisableChecked
    ) {
      this.setChecked(parentChecked)
    }

    if (
      (isReturnChecked !== prevIsReturnChecked) &&
      isReturnChecked &&
      checked
    ) {
      this.props.onCollect(regionNum)
    }
  }

  render() {
    const {
      regionNum,
      parentDisabled,
    } = this.props
    const {
      checked,
    } = this.state
    const regionData = this.context.regionData
    return (
      <div className='r-checkbox r-c-checkbox__container'>
        <label>
          <input
            type='checkbox'
            onChange={this.handleChange}
            disabled={parentDisabled || this.isDisabled || this.isDisableChecked}
            checked={checked || this.isDisableChecked} />

          <span>{regionData[regionNum][0]}</span>
        </label>
      </div>
    )
  }
}

export default CityCheckbox
