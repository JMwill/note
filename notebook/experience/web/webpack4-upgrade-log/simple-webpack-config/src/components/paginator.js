import React, {PureComponent} from 'react'
import _ from 'lodash'
import InputInteger from './input-integer'

class Paginator extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      transferNum: 1,
    }

    this.transfer = this.transfer.bind(this)
  }

  transfer(e) {
    e.preventDefault()
    this.props.go((this.state.transferNum - 1) * this.props.limit)
  }

  render() {
    const {
      className,
      display,
      go,
      limit,
      offset,
      size,
      total_count,
    } = this.props

    if (limit >= total_count) {
      return null
    }

    let wrapClassName = 'pagination ' + className
    if (size) {
      wrapClassName += ' pagination-' + size
    }

    const canPrev = offset >= limit
    const goPrev = (e) => {
      e.preventDefault()
      if (!canPrev) return
      go(offset - limit)
    }
    let prevClass = 'btn btn-default prev'
    if (!canPrev) {
      prevClass += ' disabled'
    }
    const prevPart = (
      <li>
        <button
          onClick={goPrev}
          className={prevClass}
          style={{marginLeft: 0}}
        >
          {size === 'sm'
            ? (<i className='glyphicon glyphicon-menu-left' />)
            : (<span>上一页</span>)}
        </button>
      </li>
    )

    const canNext = offset + limit < total_count
    const goNext = (e) => {
      e.preventDefault()
      if (!canNext) return
      go(offset + limit)
    }
    let nextClass = 'btn btn-default next'
    if (!canNext) {
      nextClass += ' disabled'
    }
    const nextPart = (
      <li>
        <button
          onClick={goNext}
          className={nextClass}
        >
          {size === 'sm'
            ? (<i className='glyphicon glyphicon-menu-right' />)
            : (<span>下一页</span>)}
        </button>
      </li>
    )

    let numPart = null
    const current = Math.floor(offset / limit) + 1
    const totalPage = Math.floor((total_count - 1) / limit) + 1
    let start = 1
    let end = totalPage + 1

    if (totalPage > display) {
      const middle = Math.floor(display / 2) + 1
      if (current <= middle) {
        end = display + 1
      } else if (current > totalPage - middle) {
        start = totalPage - display + 1
      } else {
        start = current - middle + 1
        end = current + middle
      }
    }

    numPart = _.range(start, end).map(n => (
      <li key={n} className={current === n ? 'active' : ''}>
        <a href='#' onClick={(e) => { e.preventDefault(); go((n - 1) * limit) }}>
          <span>{n}</span>
        </a>
      </li>
    ))

    const indicator = <span className='indicator'>第 {current}/{totalPage} 页</span>

    const transferGate = (
      <form className='transfer-gate' onSubmit={this.transfer}>
        跳至
        <InputInteger
          value={this.state.transferNum}
          pred={v => (v > 0 && v <= totalPage)}
          onChange={v => this.setState({transferNum: v})}
        />
        页
      </form>
    )

    return (
      <div className='clearfix' style={{marginTop: '24px'}}>
        <ul className={wrapClassName} style={{margin: 0}}>
          {prevPart}
          {size !== 'sm' && numPart}
          {nextPart}
          {indicator}
          {transferGate}
        </ul>
      </div>
    )
  }
}

Paginator.defaultProps = {
  className: 'pull-right',
  total_count: 0,
  limit: 20,
  offset: 0,
  display: 7,
  size: '',
  go() {},
}

export default Paginator
