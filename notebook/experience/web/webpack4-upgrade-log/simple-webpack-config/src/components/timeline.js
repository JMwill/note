import React, {PureComponent} from 'react'
import Empty from './empty'

function TimelineItem({
  title,
  date,
  content,
  active,
}) {
  return (
    <li className={active ? 'active' : ''}>
      <i className='time-line__dot' />
      <div className='time-line__hd'>
        {title}
        <span className='time-line__date'>{date}</span>
      </div>
      <div className='time-line__bd'>
        {content}
      </div>
    </li>
  )
}

class Timeline extends PureComponent {
  render() {
    const {items} = this.props
    if (items.length === 0) return (<Empty />)
    return (
      <div className='time-line'>
        <ul>
          {items.map((item, idx) => <TimelineItem active={idx === 0} key={idx} {...item} />)}
        </ul>
      </div>
    )
  }
}

Timeline.defaultProps = {
  items: [],
}

export default Timeline
