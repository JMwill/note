import _ from 'lodash'
import {combineReducers} from 'redux'
import {createAction, handleActions} from 'redux-actions'

import utils from '../../utils'
import io from '../../io'
import confirm from '../../components/confirm'
import lock from '../../components/lock'

const {standardListReducer, standardListActionCreator} = utils

// 供应商商列表
const SUPPLIER_LIST_REQUEST = 'SUPPLIER_LIST_REQUEST'
const SUPPLIER_LIST_SUCCESS = 'SUPPLIER_LIST_SUCCESS'
const SUPPLIER_LIST_FAILURE = 'SUPPLIER_LIST_FAILURE'
const supplier_list_action_types = [SUPPLIER_LIST_REQUEST, SUPPLIER_LIST_SUCCESS, SUPPLIER_LIST_FAILURE]
const supplier_list = standardListReducer(supplier_list_action_types)
export const getSupplierList = standardListActionCreator(
  supplier_list_action_types,
  io.getSupplierList,
  'supplier_list'
)
export const reloadSupplierList = () => (dispatch, getState) => {
  const {supplier_list} = getState()
  dispatch(getSupplierList({
    params: {...supplier_list.params},
  }))
}

// 供应商商批量删除
const UPDATE_SUPPLIER_STATUS_REQUEST = 'UPDATE_SUPPLIER_STATUS_REQUEST'
const UPDATE_SUPPLIER_STATUS_SUCCESS = 'UPDATE_SUPPLIER_STATUS_SUCCESS'
const UPDATE_SUPPLIER_STATUS_FAILURE = 'UPDATE_SUPPLIER_STATUS_FAILURE'
const supplier_status_updating = handleActions({
  [UPDATE_SUPPLIER_STATUS_REQUEST]: (state, action) => ([...state, action.payload]),
  [UPDATE_SUPPLIER_STATUS_SUCCESS]: (state, action) => state.filter(id => id !== action.payload),
  [UPDATE_SUPPLIER_STATUS_FAILURE]: (state, action) => state.filter(id => id !== action.payload),
  [SUPPLIER_LIST_SUCCESS]: () => [],
}, [])
const supplier_status_dirty = handleActions({
  [UPDATE_SUPPLIER_STATUS_SUCCESS]: (state, action) => ([...state, action.payload]),
  [SUPPLIER_LIST_SUCCESS]: () => [],
}, [])

export const updateSupplierStatus = (id, status, text, locking) => (dispatch, getState) => {
  const {supplier_status_updating} = getState()

  if (_.includes(supplier_status_updating, id)) return

  confirm({
    message: `确定要${text}吗？`,
    ok() {
      const unlock = lock(locking)
      dispatch(createAction(UPDATE_SUPPLIER_STATUS_REQUEST)(id))

      io.updateSupplierField(id, {status})
        .then((res) => {
          unlock()
          dispatch(createAction(UPDATE_SUPPLIER_STATUS_SUCCESS)(id))
          if (getState().supplier_status_updating.length === 0) {
            dispatch(reloadSupplierList())
          }
        })
        .catch((err) => {
          unlock()
          dispatch(createAction(UPDATE_SUPPLIER_STATUS_FAILURE)(id))
          utils.fail(err)
        })
    },
  })
}

export default combineReducers({
  supplier_list,
  supplier_status_updating,
  supplier_status_dirty,
})
