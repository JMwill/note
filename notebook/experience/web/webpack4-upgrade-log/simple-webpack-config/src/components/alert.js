import React from 'react'
import modal from './modal'

function withAlert({message, ok = function() { }, label = '知道了'}) {
  return function({close}) {
    return (
      <div className='pepe-modal-table'>
        <div className='bd'>{message}</div>
        <div className='ft'>
          <button
            className='btn btn-primary'
            onClick={() => {
              ok()
              close()
            }}
          >
            {label}
          </button>
        </div>
      </div>
    )
  }
}

export default function alert(props) {
  if (props == null) return

  if (typeof props === 'string') {
    props = {
      message: props,
    }
  } else if (!props.message || !typeof props.message === 'string') {
    props.message = JSON.stringify(props, null, 2)
  }

  return modal({
    component: withAlert(props),
    header: false,
    size: 'sm',
  })
}
