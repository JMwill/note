import _ from 'lodash'
import React, {PureComponent} from 'react'

class InputInteger extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  onChange(e) {
    const {onChange, pred} = this.props
    const val = e.target.value
    if (val.length === 0) {
      this.setState({
        value: '',
      })
      onChange('')
    } else {
      const n = parseInt(val, 10)
      if (_.isInteger(n) && pred(n) === true) {
        this.setState({
          value: String(n),
        })
        onChange(n)
      }
    }
  }

  render() {
    const {style, className} = this.props
    return (
      <input
        style={style}
        className={className}
        placeholder='0'
        type='text'
        value={this.state.value}
        onChange={this.onChange}
      />
    )
  }
}

InputInteger.defaultProps = {
  value: '',
  onChange() {},
  pred() {
    return true
  },
}

export default InputInteger
