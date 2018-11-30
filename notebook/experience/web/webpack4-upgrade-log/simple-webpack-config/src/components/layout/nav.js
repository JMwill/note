import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import classnames from 'classnames'

export default withRouter(({menu = [], history, match}) => {
  return (
    <div className='site-nav'>
      <div className='site-nav-wrap scrollbar-small'>
        <div className='menu-box'>
          {menu.map(({name, submenu}, i) =>
            <dl className='menu' key={i}>
              <dt className='menu__title'>
                {name}
              </dt>
              {submenu.map(({name, path, icon, match}, i) =>
                <dd
                  key={i}
                  className={classnames({
                    'menu__item': true,
                    'first': i === 0,
                    'selected': match(history.location),
                  })}
                >
                  <div className='menu__item-inner'>
                    <i className={`menu__icon ${icon}`} />
                    <Link to={path}>{name}</Link>
                  </div>
                </dd>
              )}
            </dl>
          )}
        </div>
      </div>
    </div>
  )
})
