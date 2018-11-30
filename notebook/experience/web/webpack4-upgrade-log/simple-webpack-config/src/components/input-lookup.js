import React, {PureComponent} from 'react'
import Lookup from './lookup'
import modal from './modal'

class InputLookup extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }

    this.remove = this.remove.bind(this)
    this.showLookup = this.showLookup.bind(this)
  }

  remove() {
    this.setState({
      value: null,
    })
    this.props.onChange(null)
  }

  showLookup() {
    const type = this.props.type

    const mapping = {
      'SHELF': '货架',
      'VENDOR': '品牌商',
      'SUPPLIER': '供应商',
      'SHIPPING_RATE_SCHEDULE': '运费模版',
    }

    modal({
      component: Lookup,
      args: {
        type,
        onChange: (id, name, item) => {
          const value = {
            id,
            name,
          }
          this.setState({value})
          this.props.onChange(value, item)
        },
      },
      title: '选择' + mapping[type],
    })
  }

  render() {
    const canRemove = this.state.value != null
    let label
    if (canRemove) {
      label = this.state.value.name
    } else {
      label = this.props.placeholder
    }

    return (
      <div className='input-lookup'>
        <input
          className='form-control input-lookup__control'
          type='text'
          value={label}
          onClick={this.showLookup}
          style={canRemove ? {backgroundColor: '#fff'} : {backgroundColor: '#fff', color: '#d8d8d8'}}
          readOnly
        />
        {canRemove && (
          <span className='input-lookup__btn' onClick={this.remove}>
            <i className='iconpepe-remove' />
          </span>
        )}
      </div>
    )
  }
}

InputLookup.defaultProps = {
  type: 'SHELF',
  placeholder: '不限',
  value: null,
  onChange() {},
}

export default InputLookup
