import _ from 'lodash'
import {combineReducers} from 'redux'
import {createAction, handleActions} from 'redux-actions'

import io from '../../io'
import {standardListReducer, standardListActionCreator, compact, fail} from '../../utils'

import lock from '../../components/lock'

// 售后列表
const REFUND_LIST_REQUEST = 'REFUND_LIST_REQUEST'
const REFUND_LIST_SUCCESS = 'REFUND_LIST_SUCCESS'
const REFUND_LIST_FAILURE = 'REFUND_LIST_FAILURE'
const refund_list_action_types = [REFUND_LIST_REQUEST, REFUND_LIST_SUCCESS, REFUND_LIST_FAILURE]
const refund_list = standardListReducer(refund_list_action_types)
export const getRefundList = standardListActionCreator(refund_list_action_types, io.getRefundList, 'refund_list')
export const reloadRefundList = () => (dispatch, getState) => {
  const {refund_list} = getState()
  dispatch(getRefundList({
    params: {...refund_list.params},
  }))
}

// 售后选择
const SELECT_REFUND = 'SELECT_REFUND'
const UNSELECT_REFUND = 'UNSELECT_REFUND'
const SELECT_ALL_REFUND = 'SELECT_ALL_REFUND'
const UNSELECT_ALL_REFUND = 'UNSELECT_ALL_REFUND'
const refund_ids_selected = handleActions({
  [SELECT_REFUND]: (state, action) => ([...state, action.payload]),
  [UNSELECT_REFUND]: (state, action) => (state.filter(id => id !== action.payload)),
  [SELECT_ALL_REFUND]: (state, action) => action.payload || [],
  [UNSELECT_ALL_REFUND]: () => [],
  [REFUND_LIST_SUCCESS]: () => [],
}, [])
export const unselectRefund = createAction(UNSELECT_REFUND)
export const selectRefund = createAction(SELECT_REFUND)
export const selectAllRefund = createAction(SELECT_ALL_REFUND)
export const unselectAllRefund = createAction(UNSELECT_ALL_REFUND)

// 售后导出
const EXPORT_REFUND_REQUEST = 'EXPORT_REFUND_REQUEST'
const EXPORT_REFUND_SUCCESS = 'EXPORT_REFUND_SUCCESS'
const EXPORT_REFUND_FAILURE = 'EXPORT_REFUND_FAILURE'
const refund_exporting = handleActions({
  [EXPORT_REFUND_REQUEST]: () => true,
  [EXPORT_REFUND_SUCCESS]: () => false,
  [EXPORT_REFUND_FAILURE]: () => false,
}, false)
export const exportRefund = (locking, params) => (dispatch, getState) => {
  const {refund_ids_selected, refund_exporting} = getState()
  if (refund_exporting) return

  const req = {...params}
  if (refund_ids_selected.length > 0) {
    req.refund_ids = refund_ids_selected
  }

  const unlock = lock(locking)
  dispatch(createAction(EXPORT_REFUND_REQUEST)())
  io.exportRefundList(req)
    .then((res) => {
      unlock()
      dispatch(createAction(EXPORT_REFUND_SUCCESS)())
      window.location.href = res.data.download_url
    })
    .catch((err) => {
      unlock()
      dispatch(createAction(EXPORT_REFUND_FAILURE)())

      fail(err)
    })
}

// 售后通过、驳回、退款
const UPDATE_REFUND_STATUS_REQUEST = 'UPDATE_REFUND_STATUS_REQUEST'
const UPDATE_REFUND_STATUS_SUCCESS = 'UPDATE_REFUND_STATUS_SUCCESS'
const UPDATE_REFUND_STATUS_FAILURE = 'UPDATE_REFUND_STATUS_FAILURE'
const refund_status_updating = handleActions({
  [UPDATE_REFUND_STATUS_REQUEST]: (state, action) => ([...state, action.payload]),
  [UPDATE_REFUND_STATUS_SUCCESS]: (state, action) => state.filter(id => id !== action.payload),
  [UPDATE_REFUND_STATUS_FAILURE]: (state, action) => state.filter(id => id !== action.payload),
  [REFUND_LIST_SUCCESS]: () => [],
}, [])
const refund_status_dirty = handleActions({
  [UPDATE_REFUND_STATUS_SUCCESS]: (state, action) => ([...state, action.payload]),
  [REFUND_LIST_SUCCESS]: () => [],
}, [])

export const updateRefundStatus = (id, status, content, locking) => (dispatch, getState) => {
  const {refund_status_updating} = getState()

  if (_.includes(refund_status_updating, id)) return
  const unlock = lock(locking)
  dispatch(createAction(UPDATE_REFUND_STATUS_REQUEST)(id))

  const params = compact({status, content})
  io.updateRefundStatus(id, params)
    .then((res) => {
      unlock()
      dispatch(createAction(UPDATE_REFUND_STATUS_SUCCESS)(id))
      if (getState().refund_status_updating.length === 0) {
        dispatch(reloadRefundList())
      }
    })
    .catch((err) => {
      unlock()
      dispatch(createAction(UPDATE_REFUND_STATUS_FAILURE)(id))
      if (getState().refund_status_updating.length === 0) {
        dispatch(reloadRefundList())
      }

      fail(err)
    })
}

export default combineReducers({
  refund_list,
  refund_ids_selected,
  refund_exporting,
  refund_status_updating,
  refund_status_dirty,
})
