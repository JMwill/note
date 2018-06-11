import _ from 'lodash'
import DayPicker, {DateUtils} from 'react-day-picker'
import moment from 'moment'
import MomentLocaleUtils from 'react-day-picker/moment'
import React, {PureComponent} from 'react'
import TimePicker from 'rc-time-picker'

import 'moment/locale/zh-cn'

// 必须严格遵守此格式
const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm:ss'

function noop() { return false }

class InputDate extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
      show: false,
    }

    this.defaultTime = '00:00:00'
    if (props.time && props.value != null) {
      let part = props.value.split(' ')
      part = part[1]
      if (part != null) {
        this.defaultTime = part
      }
    }

    this.onDayClick = this.onDayClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onDayFocus = this.onDayFocus.bind(this)
    this.process = this.process.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.onTimeFocus = this.onTimeFocus.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.process(nextProps.value)
    }
  }

  onFocus() {
    this.setState({show: true})
  }

  onDayFocus() {
    clearTimeout(this.blurTimer)
    this.setState({show: true})
  }

  onBlur() {
    clearTimeout(this.blurTimer)
    this.blurTimer = setTimeout(() => {
      this.setState({show: false})
    }, 200)
  }

  onChange(e) {
    const val = e.target.value
    this.process(val)
  }

  onTimeFocus(e) {
    clearTimeout(this.blurTimer)
    this.setState({show: true})
  }

  process(val) {
    const len = val.length
    let accepted = false
    let show = true
    if (val === '') {
      this.daypicker.showMonth(new Date())
      accepted = true
      show = false
    } else if (len < 5 && _.isInteger(Number(val))) {
      accepted = true
    } else if (len === 5 && val[4] === '-') {
      const d = new Date(val.slice(0, 4), 0)
      this.daypicker.showMonth(d)
      accepted = true
    } else if (len === 6) {
      if (val[5] === '0' || val[5] === '1') {
        accepted = true
      }
    } else if (val[4] === '-' && len < 8) {
      const n = Number(val.slice(5))
      if (_.isInteger(n) && n < 13 && n > 0) {
        accepted = true
      }
    } else if (len === 8 && val[7] === '-') {
      this.daypicker.showMonth(moment(val, 'YYYY-MM-').toDate())
      accepted = true
    } else if (len === 9) {
      if (val[8] === '0' || val[8] === '1' || val[8] === '2' || val[8] === '3') {
        accepted = true
      }
    } else if (val[7] === '-' && len < 11) {
      if (moment(val, DATE_FORMAT).isValid()) {
        accepted = true

        if (len === 10) {
          show = false
        }
      }
    }

    if (this.props.time) {
      if (moment(val, DATE_FORMAT + ' ' + TIME_FORMAT).isValid()) {
        accepted = true
      }
    }

    if (accepted) {
      this.setState({value: val, show})
      this.props.onChange(val)
    }
  }

  onDayClick(day) {
    clearTimeout(this.blurTimer)
    let value = moment(day).format(DATE_FORMAT)
    if (this.props.time) {
      value += ' ' + this.defaultTime
    }

    if (this.props.disabledPastDay && DateUtils.isPastDay(day)) {
      return
    }

    this.setState({value, show: false})
    this.props.onChange(value)
  }

  onTimeChange(m) {
    clearTimeout(this.blurTimer)
    this.setState({show: true})
    if (m) {
      const value = m.format(DATE_FORMAT + ' ' + TIME_FORMAT)
      this.setState({value, show: true})
      this.props.onChange(value)
    } else {
      this.setState({show: false})
    }
    this._input.focus()
  }

  render() {
    let m = ''
    if (this.state.value) {
      m = moment(this.state.value, DATE_FORMAT + ' ' + TIME_FORMAT)
      if (!m.isValid()) {
        m = ''
      }
    }

    return (
      <div className='input-date'>
        {this.props.readOnly
          ? (<input className='form-control' readOnly value={this.state.value} />)
          : (<input
            type='text'
            className='form-control'
            placeholder='年-月-日'
            value={this.state.value}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            ref={input => (this._input = input)}
          />)}

        <div className='day-picker-warp' style={this.state.show ? ({display: 'block'}) : ({display: 'none'})}>
          <div className='pepe-flex'>
            <div style={{width: '240px'}}>
              <DayPicker
                ref={(el) => { this.daypicker = el }}
                onDayClick={this.onDayClick}
                locale='zh-cn'
                localeUtils={MomentLocaleUtils}
                onFocus={this.onDayFocus}
                onBlur={this.onBlur}
                value={m}
                disabledDays={this.props.disabledPastDay ? DateUtils.isPastDay : noop}
              />
            </div>
            {this.props.time && (
              <div style={{width: '186px'}} tabIndex={0} onClick={this.onTimeFocus}>
                <TimePicker
                  value={m}
                  open
                  onChange={this.onTimeChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

InputDate.defaultProps = {
  readOnly: false,
  time: false,
  value: '',
  disabledPastDay: false,
  onChange() {},
}

export default InputDate
