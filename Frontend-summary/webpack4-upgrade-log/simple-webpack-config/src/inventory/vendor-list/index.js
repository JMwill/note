import React from 'react'
import {Provider} from 'react-redux'

import BtnCreate from '../../components/btn-create'
import config from '../../config'

import reducers from './redux'
import ListContainer from './list-container'
import ActionContainer from './action-container'
import {configStore} from '../../utils'
import FuncIcon from '../../components/func-icon'

export default () => {
  return (
    <Provider store={configStore(reducers)} >
      <div className='wrap js-wrap'>
        <div className='list-header clearfix'>
          <ActionContainer />
          <h1>
            品牌
            <FuncIcon iconClass='iconpepe-question-sign' link={config.getDoc('vendor')} />
          </h1>
          <div className='pull-right'>
            <BtnCreate to='/inventory/vendor/create/' label='新增品牌' />
          </div>
        </div>
        <ListContainer />
      </div>
    </Provider>
  )
}
