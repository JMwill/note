import React, {PureComponent} from 'react'
import FuncIcon from './func-icon'

class TopNav extends PureComponent {
  render() {
    return (
      <div className='top-nav'>
        <ul className='nav nav-tabs'>
          {this.props.items.map(item => (
            <li role='presentation' className={item.active && 'active'}>
              <a href={item.url}>
                {item.title}
                {
                  item.iconConfig
                    ? <FuncIcon {...item.iconConfig} />
                    : null
                }
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default TopNav
