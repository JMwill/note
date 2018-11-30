import _ from 'lodash'
import React, {PureComponent} from 'react'

import InputKeeper from '../../components/input-keeper'
import strategy from '../../components/input-keeper/strategy'
import storage from '../../components/input-keeper/storage'

class ProductAttrEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: props.items || [],
      limit: props.limit || 1000,
    }

    this.remove = this.remove.bind(this)
    this.add = this.add.bind(this)

    this.strategy = strategy(props.name, {
      storage,
      limit: props.limit,
      max_size: props.max_size,
      default_key: props.default_key,
    })
  }

  remove(e, key) {
    e.preventDefault()
    let found = _.find(this.state.items, x => x.key === key)
    let newItems = this.state.items.filter(item => item.key !== key)
    this.setState({
      items: newItems,
    })
    this.props.onChange && this.props.onChange(newItems)

    if (found) {
      this.strategy.remove(found.key, found.value)
    }
  }

  add(obj) {
    const key = obj.key
    const value = obj.value
    let newItems = this.state.items
    if (key.length > 0 && value.length > 0) {
      newItems = newItems.filter(item => item.key !== key)
      newItems.push({key: key, value: value})
      this.setState({
        items: newItems,
      })
    }

    this.props.onChange && this.props.onChange(newItems)
  }

  prev(item) {
    let newItems = this.state.items
    let foundIndex = _.findIndex(newItems, x => x.key === item.key)
    let prevIndex = foundIndex - 1
    if (foundIndex === 0) {
      prevIndex = newItems.length - 1
    }

    let tmp = newItems[foundIndex]
    newItems[foundIndex] = newItems[prevIndex]
    newItems[prevIndex] = tmp

    this.setState({
      items: newItems,
    })
    this.props.onChange && this.props.onChange(newItems)
  }

  next(item) {
    let newItems = this.state.items
    let foundIndex = _.findIndex(newItems, x => x.key === item.key)
    let nextIndex = foundIndex + 1
    if (foundIndex === newItems.length - 1) {
      nextIndex = 0
    }

    let tmp = newItems[foundIndex]
    newItems[foundIndex] = newItems[nextIndex]
    newItems[nextIndex] = tmp

    this.setState({
      items: newItems,
    })
    this.props.onChange && this.props.onChange(newItems)
  }

  renderTable() {
    if (this.state.items.length === 0) return null

    return (
      <table className='table table-bordered'>
        <thead>
          <tr><th>排序</th><th>{this.props.key_placeholder}</th><th>{this.props.value_placeholder}</th><th>操作</th></tr>
        </thead>
        <tbody>
          {this.state.items.map(item => (
            <tr key={item.key}>
              <td>
                <div className='arraw'>
                  <i style={{color: '#c5c6d3'}} className='caret reverse' onClick={() => this.prev(item)} />
                  <i style={{color: '#c5c6d3'}} className='caret' onClick={() => this.next(item)} />
                </div>
              </td>
              <td>{item.key}</td>
              <td>{item.value}</td>
              <td>
                <a style={{color: '#ee4d6b'}} onClick={(e) => this.remove(e, item.key)} href='#'>删除</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  renderAction() {
    if (this.state.items.length >= this.state.limit) {
      return null
    }
    return (
      <InputKeeper
        {...this.props}
        strategy={this.strategy}
        onConfirm={this.add}
      />
    )
  }

  render() {
    return (
      <div className='product-attr-editor'>
        {this.renderTable()}
        {this.renderAction()}
      </div>
    )
  }
}

ProductAttrEditor.defaultProps = {
  limit: 10,
  max_size: 500,
  default_key: [],
  key_placeholder: '',
  value_placeholder: '',
  key_example: '',
  value_example: '',
  onChange() {},
}

export default ProductAttrEditor
