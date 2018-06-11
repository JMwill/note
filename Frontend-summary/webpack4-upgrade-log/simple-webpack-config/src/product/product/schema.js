import _ from 'lodash/fp'
import React, {PureComponent} from 'react'

import config from '../../config'

const limit = 4
let globalID = 1

const toState = props => {
  const field = _.map(item => ({
    id: globalID++,
    ...item,
  }))(props.value)
  const entries = _.reduce((accum, item) => {
    accum[item.id] = item
    return accum
  }, {})(field)
  const ids = _.map(_.prop('id'))(field)
  return {
    entries,
    ids,
  }
}

const toValue = state =>
  _.map(id => ({...state.entries[id]}))(state.ids)

const reducer = (state, action) => {
  if (action.type === 'REMOVE') {
    const ids = _.filter(id => id !== action.id)(state.ids)
    const entries = state.entries
    delete entries[action.id]
    return {
      ids,
      entries,
    }
  }
  if (action.type === 'ADD') {
    const id = globalID++
    const ids = [...state.ids, id]
    const entries = {
      ...state.entries,
      [id]: {
        display_name: '',
        required: false,
        format: action.format,
      },
    }
    return {
      ids,
      entries,
    }
  }
  if (action.type === 'UPDATE') {
    const entries = state.entries
    entries[action.id] = {
      ...entries[action.id],
      [action.key]: action.value,
    }

    return {
      ids: [...state.ids],
      entries,
    }
  }
  return state
}

const dispatch = (that, action) => {
  that.setState(
    (prevState) => reducer(that.state, action),
    () => {
      that.props.onChange(toValue(that.state))
    }
  )
}

const enums = config.getEnums('field_format')

class Schema extends PureComponent {
  constructor(props) {
    super(props)

    this.state = toState(props)

    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
  }

  add(e) {
    e.preventDefault()
    dispatch(this, {
      type: 'ADD',
      format: enums[0].id,
    })
  }

  remove(id) {
    return (e) => {
      e.preventDefault()
      dispatch(this, {
        type: 'REMOVE',
        id,
      })
    }
  }

  update(id, key) {
    return (e) => {
      let value = e.target.value
      if (key === 'required') {
        value = !this.state.entries[id].required
      }
      dispatch(this, {
        type: 'UPDATE',
        id,
        key,
        value,
      })
    }
  }

  render() {
    const formatSelect = _.map(item => (
      <option key={item.id} value={item.id}>{item.name}</option>
    ))(enums)
    const list = _.map(id => (
      <div key={id} className='clearfix' style={{marginBottom: '24px'}} >
        <input
          type='text'
          className='form-control pull-left'
          placeholder='请输入留言名称'
          value={this.state.entries[id].display_name}
          onChange={this.update(id, 'display_name')}
        />
        <select
          value={this.state.entries[id].format}
          className='form-control pull-left'
          onChange={this.update(id, 'format')}
          style={{width: '172px', marginLeft: '16px'}}
        >
          {formatSelect}
        </select>
        <label className='pull-left' style={{lineHeight: '44px', margin: '0 16px 0'}}>
          <input
            type='checkbox'
            checked={this.state.entries[id].required}
            onChange={this.update(id, 'required')}
          />
          <span style={{marginLeft: '12px'}}>必填</span>
        </label>
        <a
          href='#'
          className='pull-left'
          style={{lineHeight: '44px', marginLeft: '16px', color: '#ee4d6b'}}
          onClick={this.remove(id)}
        >
          删除
        </a>
      </div>
    ))(this.state.ids)

    const canAdd = this.state.ids.length < limit

    return (
      <div>
        <div>
          {list}
        </div>
        {canAdd && (
          <div>
            <a
              href='#'
              className='btn btn-primary btn-bordered icon-action'
              onClick={this.add}
            >
              <i className='iconpepe-plus' />
              添加要求留言
            </a>
            <span style={{marginLeft: '12px'}} className='tips'>最高仅支持添加 4 个要求留言</span>
          </div>
        )}
      </div>
    )
  }
}

Schema.defaultProps = {
  value: [],
  onChange() {},
}

export default Schema
