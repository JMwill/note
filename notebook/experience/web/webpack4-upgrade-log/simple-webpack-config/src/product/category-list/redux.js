import _ from 'lodash'
import {combineReducers} from 'redux'
import {createAction, handleActions} from 'redux-actions'

import utils from '../../utils'
import io from '../../io'

import confirm from '../../components/confirm'
import lock from '../../components/lock'

const {standardListReducer, standardListActionCreator} = utils

// 货架列表
const CATEGORY_REQUEST = 'CATEGORY_REQUEST'
const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS'
const CATEGORY_FAILURE = 'CATEGORY_FAILURE'
const category_list_action_types = [CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_FAILURE]
const category_list = standardListReducer(category_list_action_types)
export const getCategoryList =
  standardListActionCreator(category_list_action_types, io.getCategoryList, 'category_list')
export const reloadCategoryList = () => (dispatch, getState) => {
  const {category_list} = getState()
  dispatch(getCategoryList({
    params: {...category_list.params},
  }))
}

// 货架优先级
const CHANGE_PRIORITY = 'CHANGE_PRIORITY'

const category_priorities = handleActions({
  [CHANGE_PRIORITY]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      resource_uri: action.payload.resource_uri,
      priority: action.payload.value,
    },
  }),
}, {})

export const changePriority = createAction(CHANGE_PRIORITY)
export const updateCategoryPriority = () => (dispatch, getState) => {
  const {category_priorities} = getState()

  if (_.keys(category_priorities).length === 0) return

  const unlock = lock()
  io.updateCategoryFields({objects: _.values(category_priorities)})
    .then(() => {
      unlock()
      dispatch(reloadCategoryList())
    })
    .catch((err) => {
      unlock()
      utils.fail(err)
      dispatch(reloadCategoryList())
    })
}

// 货架批量启用、禁用、删除
const UPDATE_CATEGORY_STATUS_REQUEST = 'UPDATE_CATEGORY_STATUS_REQUEST'
const UPDATE_CATEGORY_STATUS_SUCCESS = 'UPDATE_CATEGORY_STATUS_SUCCESS'
const UPDATE_CATEGORY_STATUS_FAILURE = 'UPDATE_CATEGORY_STATUS_FAILURE'
const category_status_updating = handleActions({
  [UPDATE_CATEGORY_STATUS_REQUEST]: (state, action) => ([...state, action.payload]),
  [UPDATE_CATEGORY_STATUS_SUCCESS]: (state, action) => state.filter(id => id !== action.payload),
  [UPDATE_CATEGORY_STATUS_FAILURE]: (state, action) => state.filter(id => id !== action.payload),
  [CATEGORY_SUCCESS]: () => [],
}, [])
const category_status_dirty = handleActions({
  [UPDATE_CATEGORY_STATUS_SUCCESS]: (state, action) => ([...state, action.payload]),
  [CATEGORY_SUCCESS]: () => [],
}, [])

export const updateCategoryStatus = (id, resource_uri, status, text, locking) => (dispatch, getState) => {
  const {category_status_updating} = getState()

  if (_.includes(category_status_updating, id)) return

  confirm({
    title: `${text}货架`,
    message: `确定要${text}吗？`,
    ok() {
      const unlock = lock(locking)
      dispatch(createAction(UPDATE_CATEGORY_STATUS_REQUEST)(id))

      io.updateCategoryFields({
        objects: [
          {
            resource_uri,
            status,
          },
        ],
      })
        .then((res) => {
          unlock()
          dispatch(createAction(UPDATE_CATEGORY_STATUS_SUCCESS)(id))
          if (getState().category_status_updating.length === 0) {
            dispatch(reloadCategoryList())
          }
        })
        .catch((err) => {
          unlock()
          utils.fail(err)
          dispatch(createAction(UPDATE_CATEGORY_STATUS_FAILURE)(id))
          if (getState().category_status_updating.length === 0) {
            dispatch(reloadCategoryList())
          }
        })
    },
  })
}

export default combineReducers({
  category_list,
  category_status_updating,
  category_status_dirty,
  category_priorities,
})
