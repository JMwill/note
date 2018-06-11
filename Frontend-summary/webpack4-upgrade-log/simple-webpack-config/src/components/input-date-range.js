import React, {PureComponent} from 'react'
import InputDate from './input-date'
import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm:ss'

class InputDateRange extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      from: props.from,
      to: props.to,
    }

    this.onFromChange = this.onFromChange.bind(this)
    this.onToChange = this.onToChange.bind(this)
    this.notify = this.notify.bind(this)

    // 刷新默认值
    this.notify(props.from, props.to)
  }

  onFromChange(value) {
    if (value === this.state.from) return
    let from_str = value
    let to_str = this.state.to
    let format = DATE_FORMAT

    if (from_str.length >= 10 && to_str.length >= 10) {
      const f = moment(from_str, format)
      const t = moment(to_str, format)
      if (f.valueOf() > t.valueOf()) { // 如果范围不正确则自动清除相对的字段
        to_str = ''
        this.setState({
          to: to_str,
        })
      }
    }

    this.setState({
      from: from_str,
    })

    this.notify(from_str, to_str)
  }

  onToChange(value) {
    if (value === this.state.to) return

    let from_str = this.state.from
    let to_str = value
    let format = DATE_FORMAT

    if (from_str.length >= 10 && to_str.length >= 10) {
      const f = moment(from_str, format)
      const t = moment(to_str, format)
      if (f.valueOf() > t.valueOf()) { // 如果范围不正确则自动清除相对的字段
        from_str = ''
        this.setState({
          from: from_str,
        })
      }
    }

    this.setState({
      to: to_str,
    })

    this.notify(from_str, to_str)
  }

  notify(from_str, to_str) {
    let format = DATE_FORMAT
    if (this.props.time) {
      format += ' ' + TIME_FORMAT
    }
    let data = {
    }
    if (from_str.length >= 10) {
      data.from = moment(from_str, format).unix()
    }
    if (to_str.length >= 10) {
      if (this.props.time) {
        data.to = moment(to_str, format).unix()
      } else {
        data.to = moment(to_str, format).add(1, 'day').unix()
      }
    }
    this.props.onChange(data)
  }

  render() {
    return (
      <div className='input-date-range row'>
        <div className='col-xs-12'>
          <div className='pepe-flex'>
            <div className='pepe-flex__item'>
              <InputDate
                value={this.state.from}
                onChange={this.onFromChange}
                time={this.props.time}
                readOnly={this.props.readOnly}
                disabledPastDay={this.props.disabledPastDay}
              />
            </div>
            <div className='input-date-range__label' style={{width: '30px', float: 'left'}}>至</div>
            <div className='pepe-flex__item'>
              <InputDate
                value={this.state.to}
                onChange={this.onToChange}
                time={this.props.time}
                readOnly={this.props.readOnly}
                disabledPastDay={this.props.disabledPastDay}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

InputDateRange.defaultProps = {
  readOnly: false,
  time: false,
  disabledPastDay: false,
  from: '',
  to: '',
  onChange() {},
}

export default InputDateRange
