import React from 'react'

export default function Empty({message = '暂无数据', style = {}}) {
  return (
    <div className='empty' style={style}>
      <i className='empty__icon' />
      <h4 className='m-t-20'>{message}</h4>
    </div>
  )
}
