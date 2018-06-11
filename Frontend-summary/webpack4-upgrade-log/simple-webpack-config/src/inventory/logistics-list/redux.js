import _ from 'lodash'
import {combineReducers} from 'redux'
import {createAction, handleActions} from 'redux-actions'

import utils from '../../utils'
import io from '../../io'
import confirm from '../../components/confirm'
import lock from '../../components/lock'

const {standardListReducer, standardListActionCreator} = utils

// 运费模版列表
const LOGISTICS_LIST_REQUEST = 'LOGISTICS_LIST_REQUEST'
const LOGISTICS_LIST_SUCCESS = 'LOGISTICS_LIST_SUCCESS'
const LOGISTICS_LIST_FAILURE = 'LOGISTICS_LIST_FAILURE'
const logistics_list_action_types = [LOGISTICS_LIST_REQUEST, LOGISTICS_LIST_SUCCESS, LOGISTICS_LIST_FAILURE]
const logistics_list = standardListReducer(logistics_list_action_types)
export const getLogisticsList = standardListActionCreator(
  logistics_list_action_types,
  io.getLogisticsList,
  'logistics_list'
)
export const reloadLogisticsList = () => (dispatch, getState) => {
  const {logistics_list} = getState()
  dispatch(getLogisticsList({
    params: {...logistics_list.params},
  }))
}

// 运费模版删除
const UPDATE_LOGISTICS_STATUS_REQUEST = 'UPDATE_LOGISTICS_STATUS_REQUEST'
const UPDATE_LOGISTICS_STATUS_SUCCESS = 'UPDATE_LOGISTICS_STATUS_SUCCESS'
const UPDATE_LOGISTICS_STATUS_FAILURE = 'UPDATE_LOGISTICS_STATUS_FAILURE'
const logistics_status_updating = handleActions({
  [UPDATE_LOGISTICS_STATUS_REQUEST]: (state, action) => ([...state, action.payload]),
  [UPDATE_LOGISTICS_STATUS_SUCCESS]: (state, action) => state.filter(id => id !== action.payload),
  [UPDATE_LOGISTICS_STATUS_FAILURE]: (state, action) => state.filter(id => id !== action.payload),
  [LOGISTICS_LIST_SUCCESS]: () => [],
}, [])
const logistics_status_dirty = handleActions({
  [UPDATE_LOGISTICS_STATUS_SUCCESS]: (state, action) => ([...state, action.payload]),
  [LOGISTICS_LIST_SUCCESS]: () => [],
}, [])

export const updateLogisticsStatus = (id, status, text, locking) => (dispatch, getState) => {
  const {logistics_status_updating} = getState()

  if (_.includes(logistics_status_updating, id)) return

  confirm({
    message: `确定要${text}吗？`,
    ok() {
      const unlock = lock(locking)
      dispatch(createAction(UPDATE_LOGISTICS_STATUS_REQUEST)(id))

      io.updateLogistics(id, {id, status})
        .then((res) => {
          unlock()
          dispatch(createAction(UPDATE_LOGISTICS_STATUS_SUCCESS)(id))
          if (getState().logistics_status_updating.length === 0) {
            dispatch(reloadLogisticsList())
          }
        })
        .catch((err) => {
          unlock()
          dispatch(createAction(UPDATE_LOGISTICS_STATUS_FAILURE)(id))
          utils.fail(err)
        })
    },
  })
}

export default combineReducers({
  logistics_list,
  logistics_status_updating,
  logistics_status_dirty,
})
