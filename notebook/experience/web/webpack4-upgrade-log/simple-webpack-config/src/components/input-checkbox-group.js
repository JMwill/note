import React, {PureComponent} from 'react'
import _ from 'lodash'

class InputCheckboxGroup extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: _.map(props.value, x => String(x)),
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    let value = this.state.value
    if (e.target.checked) {
      value = [...value, e.target.value]
    } else {
      value = _.filter(value, id => String(id) !== e.target.value)
    }
    this.setState({
      value,
    })
    this.props.onChange(value)
  }

  render() {
    return (
      <div>
        {this.props.options.map(opt => (
          <label key={opt.value}>
            <input
              type='checkbox'
              value={opt.value}
              checked={_.includes(this.state.value, String(opt.value))}
              onChange={this.onChange}
            />
            {opt.label}
          </label>
        ))}
      </div>
    )
  }
}

InputCheckboxGroup.defaultProps = {
  options: [],
  value: [],
  onChange() {},
}

export default InputCheckboxGroup
