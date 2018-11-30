import React, {PureComponent} from 'react'
import _ from 'lodash'

import config from '../../config'

import modal from '../../components/modal'

import LookupShelf from './lookup-shelf'

const types = config.getEnums('shelf_type')

class ProductShelfEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      list: props.value,
    }

    this.renderType = this.renderType.bind(this)
    this.remove = this.remove.bind(this)
  }

  remove(id) {
    let list = this.state.list
    list = _.filter(list, x => x.id !== id)
    this.setState({
      list,
    })
    this.props.onChange(list)
  }

  showLookup(shelf_type, excluded) {
    modal({
      component: LookupShelf,
      args: {
        shelf_type,
        excluded,
        onChange: (item) => {
          let list = this.state.list
          list = [...item, ...list]
          this.setState({
            list,
          })
          this.props.onChange(list)
        },
      },
      title: '选择货架',
    })
  }

  renderType(type) {
    const arr = _.filter(this.state.list, x => x.shelf_type === type.id)
    const arr_ids = _.map(arr, x => x.id)

    return (
      <div className='shelf-editor'>
        <div className='shelf-editor__label'>{type.name}</div>
        <div className='tags-editor shelf-editor__body'>
          {arr.map(item => (
            <div key={item.id} className='tags-editor__item value'>
              <span>{item.name}</span>
              <i className='iconpepe-close' onClick={() => this.remove(item.id)} />
            </div>
          ))}
          <div className='tags-editor__item label'>
            <div className='inner' onClick={() => this.showLookup(type.id, arr_ids)}>
              <i className='iconpepe-add' />
              <span>{type.name}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {types.map(this.renderType)}
      </div>
    )
  }
}

ProductShelfEditor.defaultProps = {
  value: [],
  onChange() {},
}

export default ProductShelfEditor
