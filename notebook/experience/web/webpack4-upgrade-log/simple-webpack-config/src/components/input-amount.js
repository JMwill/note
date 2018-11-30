import _ from 'lodash'
import React, {PureComponent} from 'react'

class InputAmount extends PureComponent {
  constructor(props) {
    super(props)

    let val = props.value
    if (val == null) {
      val = ''
    }

    this.state = {
      value: val,
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      let val = nextProps.value
      if (isNaN(parseFloat(val, 10))) {
        val = ''
      }
      this.setState({
        value: val,
      })
    }
  }

  onChange(e) {
    const {onChange, pred} = this.props
    const val = e.target.value
    if (val == null || val.length === 0 || isNaN(parseFloat(val, 10))) {
      this.setState({
        value: '',
      })
      onChange('')
    } else {
      let limitValid = true
      let part = val.split('.')
      if (part.length > 1) {
        limitValid = part[1].length <= this.props.precise
      }
      const n = parseFloat(val, 10)
      if (limitValid && _.isNumber(n) && !_.isNaN(n) && pred(n) === true) {
        let newVal = String(n)
        if (part[1] === '') {
          newVal += '.'
        } else if (parseInt(part[1], 10) === 0) {
          newVal += '.' + part[1]
        }

        this.setState({
          value: newVal,
        })
        onChange(newVal)
      }
    }
  }

  render() {
    const {style, className, precise} = this.props
    let p = '0.' + _.padEnd(0, precise, '0')
    return (
      <input
        placeholder={p}
        type='text'
        style={style}
        className={className}
        value={this.state.value}
        onChange={this.onChange}
      />
    )
  }
}

InputAmount.defaultProps = {
  precise: 2,
  onChange() {},
  pred() {
    return true
  },
}

export default InputAmount
