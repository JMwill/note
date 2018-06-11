import React from 'react'
import Header from './header'
import Nav from './nav'

export default ({children, sidebar, header}) => (
  <div>
    <Header {...header} />
    <Nav menu={sidebar} />
    <div className='site-body'>
      {children}
    </div>
  </div>
)
