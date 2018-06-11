import React, {PureComponent} from 'react'
import _ from 'lodash'

function convertToItems(defaultTags, tags) {
  tags = tags || {}
  return _.map(defaultTags, item => ({...item, value: tags[item.key] || '', show: false}))
}

class ProductTagsEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      items: convertToItems(props.defaultTags, props.tags),
      value: '',
    }

    this.remove = this.remove.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.accept = this.accept.bind(this)
    this.notify = this.notify.bind(this)
  }

  remove(key) {
    const newItems = _.map(this.state.items, item => {
      if (item.key === key) {
        item.value = ''
      }

      return item
    })

    this.setState({
      items: newItems,
    })

    this.notify(newItems)
  }

  show(key) {
    const newItems = _.map(this.state.items, item => {
      if (item.key === key) {
        item.show = true
      } else {
        item.show = false
      }

      return item
    })

    this.setState({
      items: newItems,
    })
  }

  hide(key) {
    const newItems = _.map(this.state.items, item => {
      if (item.key === key) {
        item.show = false
      }

      return item
    })

    this.setState({
      items: newItems,
    })
  }

  accept(key) {
    if (!this.state.value) return

    const newItems = _.map(this.state.items, item => {
      if (item.key === key) {
        item.value = this.state.value
      }

      item.show = false

      return item
    })

    this.setState({
      items: newItems,
      value: '',
    })

    this.notify(newItems)
  }

  notify(newItems) {
    let tags = null
    _.each(newItems, item => {
      if (item.value != null && item.value.length > 0) {
        tags = tags || {}
        tags[item.key] = item.value
      }
    })
    this.props.onChange(tags)
  }

  onInputChange(e) {
    this.setState({
      value: e.target.value,
    })
  }

  renderItem(item) {
    if (item.value) {
      return (
        <div className='tags-editor__item value' key={item.key}>
          <span>{item.value}</span>
          <i className='iconpepe-close' onClick={() => this.remove(item.key)} />
        </div>
      )
    }

    return (
      <div className='tags-editor__item label' key={item.key}>
        <div className='inner' onClick={() => this.show(item.key)}>
          <i className='iconpepe-add' />
          <span>{item.label}</span>
        </div>

        {item.show && (<div className='popup'>
          <div className='form-inline'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='建议 4 个字内'
                className='form-control'
                style={{width: '194px'}}
                value={this.state.value}
                onChange={this.onInputChange}
              />
            </div>
            <div className='btn-group'>
              <button
                className='btn btn-primary btn-bordered'
                onClick={(e) => { e.preventDefault(); this.accept(item.key) }}
              >
                确定
              </button>
            </div>
            <a href='#' onClick={(e) => { e.preventDefault(); this.hide(item.key) }}>
              <i className='iconpepe-close' />
            </a>
          </div>
          <div className='popup__arraw' />
        </div>)}
      </div>
    )
  }

  render() {
    return (
      <div className='tags-editor'>
        {this.state.items.map(item => this.renderItem(item))}
      </div>
    )
  }
}

ProductTagsEditor.defaultProps = {
  defaultTags: [
    {
      key: 'price',
      label: '价格标签',
    },
    {
      key: 'special',
      label: '特殊标签',
    },
    {
      key: 'activity',
      label: '活动标签',
    },
  ],
  tags: {},
  onChange() {
  },
}

export default ProductTagsEditor
