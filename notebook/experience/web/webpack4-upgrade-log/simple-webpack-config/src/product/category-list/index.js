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
      <div className='wrap js-wrap shelf-list'>
        <ActionContainer />
        <div className='list-header clearfix'>
          <h1>
            分类
            <FuncIcon iconClass='iconpepe-question-sign' link={config.getDoc('product')} />
          </h1>
          <div className='pull-right'>
            <BtnCreate to='/product/category/create/' label='新增分类' />
          </div>
        </div>
        <ListContainer />
      </div>
    </Provider>
  )
}
