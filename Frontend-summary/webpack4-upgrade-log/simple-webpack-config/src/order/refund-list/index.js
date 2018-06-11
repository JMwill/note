import React from 'react'
import {Provider} from 'react-redux'

import {configStore} from '../../utils'

import RefundListActionContainer from './refund-list-action-container'
import RefundListContainer from './refund-list-container'
import reducers from './redux'

export default () => {
  return (
    <Provider store={configStore(reducers)} >
      <div className='wrap js-wrap'>
        <RefundListActionContainer />
        <div className='list-header clearfix no-btn'>
          <h1>售后</h1>
        </div>
        <RefundListContainer />
      </div>
    </Provider>
  )
}
