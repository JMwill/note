import React from 'react'
import {Link} from 'react-router-dom'

export default ({logoTxt, avatar, logoutUrl}) => (
  <div>
    <div className='header'>
      <Link to='/'>
        <div className='logo'>
          <span className='logo__img' />
          <span className='logo__text'>{logoTxt}</span>
        </div>
      </Link>
      <div className='header__notice hidden'>
        <span className='notice__tag' />
        <div className='notice__time' />
      </div>
      <div className={'header__item account dropdown'}>
        <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
          <img src={avatar} alt='avatar' />
          <span className='caret' />
        </a>
        <ul className='dropdown-menu'>
          <li><a href={logoutUrl}>注销</a></li>
        </ul>
      </div>
    </div>
    <div className='header-placeholder' />
  </div>
)
