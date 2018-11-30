import React from 'react'
import {Provider} from 'react-redux'
import {Link} from 'react-router-dom'

import {configStore} from '../../utils'
import ActionContainer from './action-container'
import ListContainer from './list-container'
import reducers from './redux'
import config from '../../config'
import FuncIcon from '../../components/func-icon'

export default () => {
  return (
    <Provider store={configStore(reducers)} >
      <div className='wrap js-wrap'>
        <ActionContainer />
        <div className='list-header clearfix'>
          <h1>
            商品
            <FuncIcon iconClass='iconpepe-question-sign' link={config.getDoc('product')} />
          </h1>
          <div className='pull-right'>
            <Link className='btn btn-primary icon-action' to='/product/create/'>
              <span className='icon'>
                <i className='iconpepe-add' />
              </span>
              新增商品
            </Link>
          </div>
        </div>
        <ListContainer />
      </div>
    </Provider>
  )
}
