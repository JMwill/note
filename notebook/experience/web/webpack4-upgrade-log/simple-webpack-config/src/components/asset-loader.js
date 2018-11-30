import React from 'react'
import Loadable from 'react-loadable'
import utils from '../utils'

const Loading = (props) => {
  window.Pace && window.Pace.restart()
  // TODO
  if (props.error) {
    return null
  } else if (props.pastDelay) {
    return null
  } else {
    return null
  }
}

export default (loader) => Loadable({
  loader,
  loading: Loading
})
