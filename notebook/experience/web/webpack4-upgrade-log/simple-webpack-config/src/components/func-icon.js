import React, {PureComponent} from 'react'
import {assign} from 'lodash'

export default class FuncIcon extends PureComponent {
  render() {
    const {
      link,
      iconClass,
      style = {},
      isBlank = true,
      clickHandler = () => {},
      mouseEnterHandler = () => {},
      mouseLeaveHandler = () => {},
    } = this.props

    let className = `glyphicon ${iconClass}`
    let assignedStyle = assign({
      cursor: 'pointer',
      textDecoration: 'none',
    }, style)

    return (
      link
        ? <a
          style={assignedStyle}
          className={className}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          href={link}
          target={isBlank ? '_blank' : '_self'} />

        : <i
          style={assignedStyle}
          className={className}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler} />
    )
  }
}
