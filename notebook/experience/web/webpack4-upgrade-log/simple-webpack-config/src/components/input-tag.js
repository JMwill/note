import _ from 'lodash'
import React, {PureComponent} from 'react'

class InputTag extends PureComponent {
  constructor(props) {
    super(props)

    var defaultTags = props.value.length > 0 ? props.value.split(' ') : []

    this.state = {
      tags: defaultTags,
      value: '',
    }

    this.onEnter = this.onEnter.bind(this)
  }

  onEnter(e) {
    if (e.key === 'Enter') {
      var newTags = this.state.tags
      if (_.indexOf(newTags, this.state.value) === -1) {
        newTags.push(this.state.value)
      }
      this.props.onChange(newTags.join(' '))
      this.setState({
        tags: [...newTags],
        value: '',
      })
    }
  }

  render() {
    return (
      <label className='input-tag'>
        {this.state.tags.map(e => (
          <span
            className='input-tag__item btn btn-sm btn-primary'
            key={e}
            onClick={() => { this.setState({tags: _.filter(this.state.tags, x => x !== e)}) }}
          >
            <span>{e}</span>
            <i className='iconpepe-close' />
          </span>
        ))}
        <input
          className='input-tag__input'
          type='text'
          onChange={(e) => { this.setState({value: e.target.value}) }}
          onKeyPress={this.onEnter}
          value={this.state.value}
        />
      </label>
    )
  }
}

InputTag.defaultProps = {
  value: '',
  onChange() {},
}

export default InputTag
