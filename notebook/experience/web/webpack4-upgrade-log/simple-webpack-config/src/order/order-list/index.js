import React from 'react'
import {Provider} from 'react-redux'

import {configStore} from '../../utils'

import reducers from './redux'
import ActionContainer from './action-container'
import ListContainer from './list-container'

export default () => {
  return (
    <Provider store={configStore(reducers)} >
      <div className='wrap js-wrap'>
        <ActionContainer />
        <div className='list-header clearfix no-btn'>
          <h1>订单</h1>
        </div>
        <ListContainer />
      </div>
    </Provider>
  )
}
