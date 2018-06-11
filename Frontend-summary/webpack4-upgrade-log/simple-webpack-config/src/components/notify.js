import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import $ from 'jquery'
import _ from 'lodash'

let $notify = null
let queue = []
let timer = null
let id = 0

function Notification({
  close,
  message,
}) {
  return (
    <div className='notification-item'>
      <div className='notification-item__content'>
        <div className='notification-item__message'>{message}</div>
      </div>
      <i className='notification-item__close' onClick={close}>x</i>
    </div>
  )
}

export default function notify(message, cb = function() {}, autoclose = true, delay = 1000) {
  if ($notify == null) {
    $notify = $('<div id="#__notify" class="notification"></div>')
    $notify.appendTo('body')
  }

  if (autoclose && timer == null) {
    timer = setInterval(function() {
      if (queue.length > 0) {
        const current = queue.shift()
        current.action()
      } else {
        clearInterval(timer)
        timer = null
      }
    }, delay)
  }

  let $dom = $('<div></div>')
  $notify.append($dom)
  const closer = {
    id: id++,
    action(key) {
      const found = _.findIndex(queue, c => c.id === key)

      if (found > -1) {
        queue.splice(found, 1)
      }

      if (queue.length === 0) {
        cb()
      }

      setTimeout(() => {
        if ($dom === null) return
        unmountComponentAtNode($dom[0])
        $dom.remove()
        $dom = null
      }, 50)
    },
  }

  render(<Notification message={message} close={() => { closer.action(closer.id) }} />, $dom[0])
  queue.push(closer)
}
