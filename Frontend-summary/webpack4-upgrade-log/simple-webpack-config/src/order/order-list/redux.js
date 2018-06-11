import {combineReducers} from 'redux'
import {createAction, handleActions} from 'redux-actions'

import io from '../../io'
import utils from '../../utils'

import lock from '../../components/lock'

const {standardListReducer, standardListActionCreator} = utils

// 订单列表
const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST'
const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS'
const ORDER_LIST_FAILURE = 'ORDER_LIST_FAILURE'
const order_list_action_types = [ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAILURE]
const order_list = standardListReducer(order_list_action_types)
export const getOrderList = standardListActionCreator(order_list_action_types, io.getOrderList, 'order_list')
export const reloadOrderList = () => (dispatch, getState) => {
  const {order_list} = getState()
  dispatch(getOrderList({
    params: {...order_list.params},
  }))
}

// 订单选择
const SELECT_ORDER = 'SELECT_ORDER'
const UNSELECT_ORDER = 'UNSELECT_ORDER'
const SELECT_ALL_ORDER = 'SELECT_ALL_ORDER'
const UNSELECT_ALL_ORDER = 'UNSELECT_ALL_ORDER'
const order_ids_selected = handleActions({
  [SELECT_ORDER]: (state, action) => ([...state, ...action.payload]),
  [UNSELECT_ORDER]: (state, action) => state.filter(s => s !== action.payload),
  [SELECT_ALL_ORDER]: (state, action) => action.payload || [],
  [UNSELECT_ALL_ORDER]: () => [],
  [ORDER_LIST_SUCCESS]: () => [],
}, [])
export const unselectOrder = createAction(UNSELECT_ORDER)
export const selectOrder = createAction(SELECT_ORDER)
export const selectAllOrder = createAction(SELECT_ALL_ORDER)
export const unselectAllOrder = createAction(UNSELECT_ALL_ORDER)

// 订单导出
const EXPORT_ORDER_REQUEST = 'EXPORT_ORDER_REQUEST'
const EXPORT_ORDER_SUCCESS = 'EXPORT_ORDER_SUCCESS'
const EXPORT_ORDER_FAILURE = 'EXPORT_ORDER_FAILURE'
const order_exporting = handleActions({
  [EXPORT_ORDER_REQUEST]: () => true,
  [EXPORT_ORDER_SUCCESS]: () => false,
  [EXPORT_ORDER_FAILURE]: () => false,
}, false)
export const exportOrder = (locking, params) => (dispatch, getState) => {
  const {order_ids_selected, order_exporting} = getState()
  if (order_exporting) return

  const req = {...params}
  if (order_ids_selected.length > 0) {
    req.orderitem_ids = order_ids_selected
  }

  const unlock = lock(locking)
  dispatch(createAction(EXPORT_ORDER_REQUEST)())
  io.exportOrderList(req)
    .then((res) => {
      unlock()
      dispatch(createAction(EXPORT_ORDER_SUCCESS)())
      window.location.href = res.data.download_url
    })
    .catch((err) => {
      unlock()
      dispatch(createAction(EXPORT_ORDER_FAILURE)())
      utils.fail(err)
    })
}

export default combineReducers({
  order_list,
  order_ids_selected,
  order_exporting,
})
