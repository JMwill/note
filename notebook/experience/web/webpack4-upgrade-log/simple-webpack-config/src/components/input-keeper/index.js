import React, {PureComponent} from 'react'
import storage from './storage'
import strategy from './strategy'
import _ from 'lodash/fp'

class InputKeeper extends PureComponent {
  constructor(props) {
    super(props)

    if (!props.strategy) {
      this.strategy = strategy(props.name, {
        storage,
        limit: props.limit,
        max_size: props.max_size,
        default_key: props.default_key,
      })
    } else {
      this.strategy = props.strategy
    }

    this.state = {
      key: '',
      value: '',
      show_key_options: false,
      show_value_options: false,
    }

    this.onKeyFocus = this.onKeyFocus.bind(this)
    this.onKeyChange = this.onKeyChange.bind(this)
    this.onKeyBlur = this.onKeyBlur.bind(this)
    this.onKeySelected = this.onKeySelected.bind(this)
    this.onValueFocus = this.onValueFocus.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onValueBlur = this.onValueBlur.bind(this)
    this.onValueSelected = this.onValueSelected.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  onKeyFocus() {
    this.setState({
      show_key_options: true,
    })
  }

  onKeyBlur() {
    setTimeout(() => {
      this.setState({
        show_key_options: false,
      })
    }, 200)
  }

  onKeyChange(e) {
    this.setState({
      key: e.target.value,
      value: this.strategy.recommend(e.target.value),
    })
  }

  onKeySelected(key) {
    this.setState({
      key,
      value: this.strategy.recommend(key),
    })
  }

  onValueFocus() {
    this.setState({
      show_value_options: true,
    })
  }

  onValueBlur() {
    setTimeout(() => {
      this.setState({
        show_value_options: false,
      })
    }, 200)
  }

  onValueChange(e) {
    this.setState({
      value: e.target.value,
    })
  }

  onValueSelected(value) {
    this.setState({
      value,
    })
  }

  onConfirm(e) {
    e.preventDefault()

    if (this.state.key.length > 0 && this.state.value.length > 0) {
      this.strategy.add(this.state.key, this.state.value)
      this.props.onConfirm({
        key: this.state.key,
        value: this.state.value,
      })
      this.setState({
        key: '',
        value: '',
      })
    }
  }

  render() {
    let keys = this.strategy.getKeys(this.state.key)
    keys = _.filter(x => x != this.state.key)(keys)
    let values = this.strategy.getValues(this.state.key, this.state.value)
    values = _.filter(x => x != this.state.value)(values)

    return (
      <div className='input-keeper' style={{width: '536px'}}>
        <div className='clearfix'>
          <div
            className='pull-left'
            style={{position: 'relative', marginRight: '16px'}}
          >
            <input
              type='text'
              className='form-control'
              placeholder={this.props.key_placeholder}
              onFocus={this.onKeyFocus}
              onChange={this.onKeyChange}
              onBlur={this.onKeyBlur}
              value={this.state.key}
            />
            {this.state.show_key_options && (
              <ul className='input-keeper-options'>
                {keys.map(x => (<li key={x} onClick={() => this.onKeySelected(x)} >{x}</li>))}
              </ul>
            )}
          </div>
          <div className='pull-left' style={{position: 'relative'}}>
            <input
              type='text'
              className='form-control'
              placeholder={this.props.value_placeholder}
              value={this.state.value}
              onFocus={this.onValueFocus}
              onChange={this.onValueChange}
              onBlur={this.onValueBlur}
            />
            {this.state.show_value_options && (
              <ul className='input-keeper-options'>
                {values.map(x => (<li key={x} onClick={() => this.onValueSelected(x)} >{x}</li>))}
              </ul>
            )}
          </div>
        </div>
        <div className='clearfix' style={{color: '#9ba4b0', padding: '8px 0'}}>
          <div className='pull-left' style={{width: '260px', marginRight: '16px'}}>{this.props.key_example}</div>
          <div className='pull-left' style={{width: '260px'}}>{this.props.value_example}</div>
        </div>
        <div className='clearfix'>
          <button className='btn btn-primary btn-bordered pull-right' onClick={this.onConfirm}>添加</button>
        </div>
      </div>
    )
  }
}

InputKeeper.defaultProps = {
  limit: 10,
  max_size: 500,
  default_key: [],
  key_placeholder: '',
  value_placeholder: '',
  key_example: '',
  value_example: '',
  onConfirm() {},
}

export default InputKeeper
