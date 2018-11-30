import React from 'react'
import {Provider} from 'react-redux'

import config from '../../config'
import {configStore} from '../../utils'
import BtnCreate from '../../components/btn-create'
import FuncIcon from '../../components/func-icon'

import reducers from './redux'
import ListContainer from './list-container'
import ActionContainer from './action-container'

export default () => {
  return (
    <Provider store={configStore(reducers)} >
      <div className='wrap js-wrap'>
        <div className='list-header clearfix'>
          <ActionContainer />
          <h1>
            供应商
            <FuncIcon iconClass='iconpepe-question-sign' link={config.getDoc('supplier')} />
          </h1>
          <div className='pull-right'>
            <BtnCreate to='/inventory/supplier/create/' label='新增供应商' />
          </div>
        </div>
        <ListContainer />
      </div>
    </Provider>
  )
}
