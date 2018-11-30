import _ from 'lodash'
import {combineReducers} from 'redux'
import {createAction, handleActions} from 'redux-actions'

import io from '../../io'
import utils from '../../utils'

import confirm from '../../components/confirm'
import lock from '../../components/lock'

const {standardListReducer, standardListActionCreator} = utils

// 货架列表
const SHELF_LIST_REQUEST = 'SHELF_LIST_REQUEST'
const SHELF_LIST_SUCCESS = 'SHELF_LIST_SUCCESS'
const SHELF_LIST_FAILURE = 'SHELF_LIST_FAILURE'
const shelf_list_action_types = [SHELF_LIST_REQUEST, SHELF_LIST_SUCCESS, SHELF_LIST_FAILURE]
const shelf_list = standardListReducer(shelf_list_action_types)
export const getShelfList = standardListActionCreator(shelf_list_action_types, io.getShelfList, 'shelf_list')

// 商品列表
const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
const PRODUCT_LIST_FAILURE = 'PRODUCT_LIST_FAILURE'
const product_list_action_types = [PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILURE]
const product_list = standardListReducer(product_list_action_types)
export const getProductList = standardListActionCreator(product_list_action_types, io.getProductList, 'product_list')
export const reloadProductList = () => (dispatch, getState) => {
  const {product_list} = getState()
  dispatch(getProductList({
    params: {...product_list.params},
  }))
}

// 商品选择
const CHANGE_PRIORITY = 'CHANGE_PRIORITY'
const SELECT_PRODUCT = 'SELECT_PRODUCT'
const UNSELECT_PRODUCT = 'UNSELECT_PRODUCT'
const SELECT_ALL_PRODUCT = 'SELECT_ALL_PRODUCT'
const UNSELECT_ALL_PRODUCT = 'UNSELECT_ALL_PRODUCT'
const product_ids_selected = handleActions({
  [SELECT_PRODUCT]: (state, action) => ([...state, action.payload]),
  [UNSELECT_PRODUCT]: (state, action) => (state.filter(id => id !== action.payload)),
  [SELECT_ALL_PRODUCT]: (state, action) => action.payload || [],
  [UNSELECT_ALL_PRODUCT]: () => [],
  [PRODUCT_LIST_SUCCESS]: () => [],
}, [])
const product_priorities = handleActions({
  [CHANGE_PRIORITY]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      id: action.payload.id,
      priority: action.payload.value,
    },
  }),
}, {})
export const unselectProduct = createAction(UNSELECT_PRODUCT)
export const selectProduct = createAction(SELECT_PRODUCT)
export const changePriority = createAction(CHANGE_PRIORITY)
export const selectAllProduct = createAction(SELECT_ALL_PRODUCT)
export const unselectAllProduct = createAction(UNSELECT_ALL_PRODUCT)
export const updateProductPriority = () => (dispatch, getState) => {
  const {product_priorities} = getState()

  if (_.keys(product_priorities).length === 0) return

  const unlock = lock()
  io.updateProductFields({objects: _.values(product_priorities)})
    .then(() => {
      unlock()
      dispatch(reloadProductList())
    })
    .catch((err) => {
      unlock()
      utils.fail(err)
      dispatch(reloadProductList())
    })
}

// 商品导出
const EXPORT_PRODUCT_REQUEST = 'EXPORT_PRODUCT_REQUEST'
const EXPORT_PRODUCT_SUCCESS = 'EXPORT_PRODUCT_SUCCESS'
const EXPORT_PRODUCT_FAILURE = 'EXPORT_PRODUCT_FAILURE'
const product_exporting = handleActions({
  [EXPORT_PRODUCT_REQUEST]: () => true,
  [EXPORT_PRODUCT_SUCCESS]: () => false,
  [EXPORT_PRODUCT_FAILURE]: () => false,
}, false)
export const exportProduct = (locking, params) => (dispatch, getState) => {
  const {product_ids_selected, product_exporting} = getState()
  if (product_exporting) return

  const unlock = lock(locking)
  dispatch(createAction(EXPORT_PRODUCT_REQUEST)())

  const req = {...params}
  if (product_ids_selected.length > 0) {
    req.product_ids = product_ids_selected
  }

  io.exportProductList(req)
    .then((res) => {
      unlock()
      dispatch(createAction(EXPORT_PRODUCT_SUCCESS)())
      window.location.href = res.data.download_url
    })
    .catch((err) => {
      unlock()
      dispatch(createAction(EXPORT_PRODUCT_FAILURE)())
      utils.fail(err)
    })
}

// 商品上架、商品下架
const UPDATE_PRODUCT_STATUS_REQUEST = 'UPDATE_PRODUCT_STATUS_REQUEST'
const UPDATE_PRODUCT_STATUS_SUCCESS = 'UPDATE_PRODUCT_STATUS_SUCCESS'
const UPDATE_PRODUCT_STATUS_FAILURE = 'UPDATE_PRODUCT_STATUS_FAILURE'
const product_status_updating = handleActions({
  [UPDATE_PRODUCT_STATUS_REQUEST]: (state, action) => ([...state, action.payload]),
  [UPDATE_PRODUCT_STATUS_SUCCESS]: (state, action) => state.filter(id => id !== action.payload),
  [UPDATE_PRODUCT_STATUS_FAILURE]: (state, action) => state.filter(id => id !== action.payload),
  [PRODUCT_LIST_REQUEST]: () => [],
}, [])
const product_status_dirty = handleActions({
  [UPDATE_PRODUCT_STATUS_SUCCESS]: (state, action) => ([...state, action.payload]),
  [PRODUCT_LIST_SUCCESS]: () => [],
}, [])

export const updateProductStatus = (id, status, text, locking) => (dispatch, getState) => {
  const {product_status_updating} = getState()

  if (_.includes(product_status_updating, id)) return

  confirm({
    title: `${text}商品`,
    message: `是否确认${text}此商品？`,
    ok() {
      const unlock = lock(locking)
      dispatch(createAction(UPDATE_PRODUCT_STATUS_REQUEST)(id))

      io.updateProductStatus(id, {status})
        .then(() => {
          unlock()
          dispatch(createAction(UPDATE_PRODUCT_STATUS_SUCCESS)(id))
          if (getState().product_status_updating.length === 0) {
            dispatch(reloadProductList())
          }
        })
        .catch((err) => {
          unlock()
          utils.fail(err)
          if (getState().product_status_updating.length === 0) {
            dispatch(reloadProductList())
          }
        })
    },
  })
}

// 单一数据源
export default combineReducers({
  shelf_list,
  product_priorities,
  product_list,
  product_ids_selected,
  product_exporting,
  product_status_updating,
  product_status_dirty,
})
