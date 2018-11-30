import React from 'react'
import {Provider} from 'react-redux'

import config from '../../config'
import {configStore} from '../../utils'

import BtnCreate from '../../components/btn-create'
import FuncIcon from '../../components/func-icon'

import reducers from './redux'
import LogisticsListContainer from './list-container'
import LogisticsActionContainer from './action-container'

export default () => {
  return (
    <Provider store={configStore(reducers)} >
      <div className='wrap js-wrap logistics-list'>
        <LogisticsActionContainer />
        <div className='list-header clearfix'>
          <h1>
            运费模版
            <FuncIcon iconClass='iconpepe-question-sign' link={config.getDoc('logistics')} />
          </h1>
          <div className='pull-right'>
            <BtnCreate to='/inventory/logistics/create/' label='新增运费模版' />
          </div>
        </div>
        <LogisticsListContainer />
      </div>
    </Provider>
  )
}
