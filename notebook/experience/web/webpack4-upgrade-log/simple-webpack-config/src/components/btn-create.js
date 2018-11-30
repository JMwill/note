import React from 'react'
import {Link} from 'react-router-dom'

export default ({label, to}) => (
  <Link className='btn btn-primary icon-action' to={to}>
    <span className='icon'>
      <i className='iconpepe-add' />
    </span>
    {label}
  </Link>
)
