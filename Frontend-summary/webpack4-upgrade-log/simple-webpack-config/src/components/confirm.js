import React from 'react'
import modal from './modal'

/**
 * 弹出确认窗
 * @param  {[type]} options.message  消息
 * @param  {[type]} options.ok      确认的回调函数
 * @param  {String} okLabel         确认按钮标签
 * @param  {[type]} cancel          取消的回调函数
 * @param  {String} cancelLabel     取消按钮标签
 * @return {[type]}                 销毁函数
 */
function withConfirm({
  message,
  ok = function() { },
  okLabel = '确定',
  cancel = function() {},
  cancelLabel = '取消',
}) {
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
            {okLabel}
          </button>
          <button
            className='btn btn-default'
            onClick={() => {
              cancel()
              close()
            }}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    )
  }
}

export default function confirm(props) {
  return modal({
    component: withConfirm(props),
    header: (props.title != null),
    title: props.title,
    size: 'sm',
  })
}
