import React, {PureComponent} from 'react'

class InputRadioGroup extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    })
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <div>
        {this.props.options.map(opt => (
          <label key={opt.value}>
            <input
              type='checkbox'
              value={opt.value}
              checked={this.state.value === opt.value}
              onChange={this.onChange}
            />
            {opt.label}
          </label>
        ))}
      </div>
    )
  }
}

InputRadioGroup.defaultProps = {
  options: [],
  value: '',
  onChange() {},
}

export default InputRadioGroup
