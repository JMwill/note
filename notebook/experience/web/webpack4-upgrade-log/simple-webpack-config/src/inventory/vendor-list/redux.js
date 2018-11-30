import _ from 'lodash'
import {combineReducers} from 'redux'
import {createAction, handleActions} from 'redux-actions'

import confirm from '../../components/confirm'
import lock from '../../components/lock'
import io from '../../io'
import utils from '../../utils'

const {standardListReducer, standardListActionCreator} = utils

// 品牌商列表
const VENDOR_LIST_REQUEST = 'VENDOR_LIST_REQUEST'
const VENDOR_LIST_SUCCESS = 'VENDOR_LIST_SUCCESS'
const VENDOR_LIST_FAILURE = 'VENDOR_LIST_FAILURE'
const vendor_list_action_types = [VENDOR_LIST_REQUEST, VENDOR_LIST_SUCCESS, VENDOR_LIST_FAILURE]
const vendor_list = standardListReducer(vendor_list_action_types)
export const getVendorList = standardListActionCreator(vendor_list_action_types, io.getVendorList, 'vendor_list')
export const reloadVendorList = () => (dispatch, getState) => {
  const {vendor_list} = getState()
  dispatch(getVendorList({
    params: {...vendor_list.params},
  }))
}

// 品牌商批量删除
const UPDATE_VENDOR_STATUS_REQUEST = 'UPDATE_VENDOR_STATUS_REQUEST'
const UPDATE_VENDOR_STATUS_SUCCESS = 'UPDATE_VENDOR_STATUS_SUCCESS'
const UPDATE_VENDOR_STATUS_FAILURE = 'UPDATE_VENDOR_STATUS_FAILURE'
const vendor_status_updating = handleActions({
  [UPDATE_VENDOR_STATUS_REQUEST]: (state, action) => ([...state, action.payload]),
  [UPDATE_VENDOR_STATUS_SUCCESS]: (state, action) => state.filter(id => id !== action.payload),
  [UPDATE_VENDOR_STATUS_FAILURE]: (state, action) => state.filter(id => id !== action.payload),
  [VENDOR_LIST_SUCCESS]: () => [],
}, [])
const vendor_status_dirty = handleActions({
  [UPDATE_VENDOR_STATUS_SUCCESS]: (state, action) => ([...state, action.payload]),
  [VENDOR_LIST_SUCCESS]: () => [],
}, [])

export const updateVendorStatus = (id, status, text, locking) => (dispatch, getState) => {
  const {vendor_status_updating} = getState()

  if (_.includes(vendor_status_updating, id)) return

  confirm({
    message: `确定要${text}吗？`,
    ok() {
      const unlock = lock(locking)
      dispatch(createAction(UPDATE_VENDOR_STATUS_REQUEST)(id))

      io.updateVendorField(id, {status})
        .then(() => {
          unlock()
          dispatch(createAction(UPDATE_VENDOR_STATUS_SUCCESS)(id))
          if (getState().vendor_status_updating.length === 0) {
            dispatch(reloadVendorList())
          }
        })
        .catch((err) => {
          unlock()
          utils.fail(err)
          dispatch(createAction(UPDATE_VENDOR_STATUS_FAILURE)(id))
          if (getState().vendor_status_updating.length === 0) {
            dispatch(reloadVendorList())
          }
        })
    },
  })
}

export default combineReducers({
  vendor_list,
  vendor_status_updating,
  vendor_status_dirty,
})
