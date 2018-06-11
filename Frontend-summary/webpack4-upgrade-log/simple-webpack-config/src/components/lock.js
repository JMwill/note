import React, {PureComponent} from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import $ from 'jquery'

export class Loading extends PureComponent {
  componentDidMount() {
    if ($(this.props.el).hasClass('js-wrap')) {
      $(this.loader_node).addClass('fixed')
    }
  }
  render() {
    return (
      <div className='lock'>
        <div className='loader' ref={(node) => { this.loader_node = node }} />
        <div className='mask' />
      </div>
    )
  }
}

export default function lock(el = '.js-wrap') {
  const dom = document.createElement('div')

  function unlock() {
    setTimeout(() => {
      unmountComponentAtNode(dom)
      $(dom).remove()
      $(el).removeClass('relative')
    }, 100)
  }

  render(<Loading el={el} />, dom)

  $(el).first().addClass('relative').append(dom)

  return unlock
}
